import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });

    if (!session?.user) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

     const body = await req.json();
     const { gameCode } = body;

    if (!gameCode) {
        return new NextResponse("Bad request", {
            status: 400,
        })
    }

    const gameSession = await prisma.gameSession.findUnique({
        where: {
            gameCode
        }
    })

    if (!gameSession) {
        return NextResponse.json(
        { message: "Game not found" },
        { status: 404 }
    )
    }

    const existingPlayer = await prisma.player.findUnique({
        where: {
            userId_gameId: {
                userId: session.user.id,
                gameId: gameSession.id,
            }
        }
    })

    if (existingPlayer) {
        return NextResponse.json(
            { gameId: gameSession.id },
            { status: 200 }
        )
    }

    const existingGame = await prisma.player.findFirst({
        where: {
            gameId: {
                not: gameSession.id,
            },
            isAlive: true
        }
    })

    if (existingGame) {
        return NextResponse.json(
            { message: "You are already in the game" },
            { status: 400 }
        )
    }

    if (gameSession.status !== "LOBBY" && !existingPlayer) {
        return NextResponse.json(
            { message: "Game is already started" },
            { status: 400 }
        )
    }

    const playerCount = await prisma.player.count({
        where: {
            gameId: gameSession.id,
        }
    })

    if (playerCount >= 12) {
        return NextResponse.json(
            { message: "Game is full" },
            { status: 400 }
        )
    }

    return NextResponse.json(
        { gameId: gameSession.id },
        { status: 201 }
    )
    
  } catch (error) {
    console.error("[API_GAME_JOIN]", error);
    return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
    )
  }   
}