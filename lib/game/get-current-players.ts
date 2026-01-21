import { prisma } from "../db/prisma"

export const getCurrentPlayers = async (gameId: string) => {
    const players = await prisma.player.findMany({
        where: {
            gameId
        },
        include: {
            user: {
                select: {
                    username: true,
                    image: true,        
                }
            }
        }
    })

    return players;
}