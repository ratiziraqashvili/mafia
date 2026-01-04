import { auth } from "@/lib/auth";
import { generateSeatNumber } from "@/lib/generate-seat-number";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });

    if (!session?.user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

     const body = await req.json();
     const { gameId } = body;

    if (!gameId) {
        return new NextResponse("Bad request", {
            status: 400,
        })
    }

    const gameSession = await prisma.gameSession.findUnique({
        where: {
            id: gameId
        }
    })

    if (!gameSession) {
        return new NextResponse("Game not found", {
            status: 404
        })
    }

    if (gameSession.status !== "LOBBY") {
        return new NextResponse("Game is already started", {
            status: 400
        })
    }

    const existingPlayer = await prisma.player.findUnique({
        where: {
            userId_gameId: {
                userId: session.user.id,
                gameId,
            }
        }
    })

    if (existingPlayer) {
        return NextResponse.json(
            { gameId },
            { status: 200 }
        )
    }

    const playerCount = await prisma.player.count({
        where: {
            gameId,
        }
    })

    if (playerCount >= 12) {
        return new NextResponse("Game is full", {
            status: 400,
        })
    }

    const seatNumber = await generateSeatNumber(gameId)

    await prisma.player.create({
        data: {
            userId: session.user.id,
            gameId,
            seatNumber,
        }
    })

    return NextResponse.json(
        { gameId },
        { status: 201 }
    )
    
  } catch (error) {
    console.log("[API_GAME_JOIN]", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }   
}