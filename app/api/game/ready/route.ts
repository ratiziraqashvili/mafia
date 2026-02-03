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

        const { gameId } = await req.json();

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

        if (!existingPlayer) {
            return NextResponse.json(
                { message: "Existing player not found" },
                { status: 400 }
            )
        }

        if (gameSession.status !== "LOBBY") {
            return NextResponse.json(
                { message: "Game is already started" },
                { status: 400 }
            )
        }

        

    } catch (error) {
        console.error("error in /api/game/ready", error)
    }
}