import { prisma } from "./db/prisma";

export const getPlayerCount = async (gameId: string) => {
    const playerCount = await prisma.player.count({
        where: {
            gameId
        }
    })

    return playerCount
}