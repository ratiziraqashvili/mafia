import { prisma } from "./db/prisma"

export const isCurrentUserHost = async (currentUserId: string, gameId: string) => {
    const gameSession = await prisma.gameSession.findFirst({
        where: {
            id: gameId,
            hostId: currentUserId
        }
    })

   return !!gameSession
}