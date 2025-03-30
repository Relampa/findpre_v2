import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function GET() {
  try {
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

    if (!players) {
      return NextResponse.json({ error: "No players found" }, { status: 404 });
    }

    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to add a player" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const player = await prisma.player.create({
      data: {
        gameMode: data.gameMode,
        lobbyCode: data.lobbyCode,
        minRank: data.minRank,
        maxRank: data.maxRank,
        currentRank: data.minRank,
        ageRange: data.ageRange,
        lookingFor: data.lookingFor,
        username: session.user.name || "Anonymous",
        user: {
          connect: {
            id: session.user.id,
          },
        },
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

    return NextResponse.json(player);
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json(
      { error: "Failed to create player" },
      { status: 500 }
    );
  }
} 