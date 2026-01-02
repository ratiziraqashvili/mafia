import { auth } from "@/lib/auth";
import { generateGameCode } from "@/lib/generate-game-code";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        }); 

        console.log("session ---->", session)

        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { sessionName, mode, visibility } = await req.json();

        console.log("sessionName ---->", sessionName)
        console.log("mode ---->", mode)
        console.log("visibility ---->", visibility)

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

        console.log('codeeeeeeeeeeeeeeeee', gameCode)

        const gameSession = await prisma.gameSession.create({
            data: {
                gameCode,
                sessionName,
                mode,
                visibility,
                hostId: session.user.id,
                
            }
        })

        console.log("gameSession ---->", gameSession)

        return new NextResponse(JSON.stringify(gameSession), { status: 200 })
    } catch (error) {
        console.error("error in server [API_CREATE_GAME]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}