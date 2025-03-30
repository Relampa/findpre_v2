import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

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
    return NextResponse.json(players);
  } catch (error) {
    console.error("Oyuncular yüklenirken hata:", error);
    return NextResponse.json(
      { error: "Oyuncular yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Oturum açmanız gerekiyor" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const player = await prisma.player.create({
      data: {
        username: session.user.name || "Anonim",
        gameMode: data.gameMode,
        lobbyCode: data.lobbyCode,
        minRank: data.minRank,
        maxRank: data.maxRank,
        currentRank: data.minRank,
        ageRange: data.ageRange,
        lookingFor: data.lookingFor,
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

    return NextResponse.json(player);
  } catch (error) {
    console.error("Oyuncu eklenirken hata:", error);
    return NextResponse.json(
      { error: "Oyuncu eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 