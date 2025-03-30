import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    if (!prisma) {
      console.error("Prisma client is not initialized");
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 }
      );
    }

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

    return NextResponse.json({ success: true, data: players });
  } catch (error) {
    console.error("Error fetching players:", error);
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        { error: "Database connection error" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
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