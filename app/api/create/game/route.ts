import { auth } from "@/lib/auth";
import { generateGameCode } from "@/lib/generate-game-code";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        }); 

        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { sessionName, mode, visibility } = await req.json();

        if (!sessionName || !mode || !visibility) {
            return new NextResponse("Bad Request", { status: 400 })
        }

        let gameCode: string;
        let exists: boolean;

        do {
            gameCode = generateGameCode();
            exists = !!(await prisma.gameSession.findUnique({
                where: {
                    gameCode,
                }
            }))
        } while (exists);

        const gameSession = await prisma.gameSession.create({
            data: {
                gameCode,
                sessionName,
                mode,
                visibility,
                hostId: session.user.id,
                players: {
                    create: {
                        userId: session.user.id,
                        isHost: true,
                        seatNumber: 1
                    }
                }
            }
        })

        return new NextResponse(JSON.stringify({ gameId: gameSession.id, gameCode: gameSession.gameCode }), { status: 201 })
        
    } catch (error) {
        console.error("error in server [API_CREATE_GAME]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}