import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Prisma } from "@prisma/client";

export async function GET() {
  console.log("GET /api/players - Start");
  try {
    if (!prisma) {
      console.error("GET /api/players - Prisma client is not initialized");
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 }
      );
    }

    console.log("GET /api/players - Fetching players from database");
    const players = await prisma.player.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    console.log("GET /api/players - Found players:", players.length);

    return new NextResponse(JSON.stringify({ success: true, data: players }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("GET /api/players - Error:", error);
    
    if (error instanceof Prisma.PrismaClientInitializationError) {
      console.error("GET /api/players - Database initialization error");
      return new NextResponse(
        JSON.stringify({ error: "Database connection error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("GET /api/players - Known Prisma error:", error.code);
      return new NextResponse(
        JSON.stringify({ error: `Database error: ${error.code}` }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch players" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!prisma) {
      console.error("Prisma client is not initialized");
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to add a player" },
        { status: 401 }
      );
    }

    const data = await request.json();

    // Validate required fields
    if (!data.gameMode || !data.minRank || !data.maxRank || !data.ageRange) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const player = await prisma.player.create({
      data: {
        gameMode: data.gameMode,
        lobbyCode: data.lobbyCode || "",
        minRank: data.minRank,
        maxRank: data.maxRank,
        currentRank: data.minRank,
        ageRange: data.ageRange,
        lookingFor: data.lookingFor || 1,
        username: session.user.name || "Anonymous",
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: player });
  } catch (error) {
    console.error("Error creating player:", error);
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create player" },
      { status: 500 }
    );
  }
} 