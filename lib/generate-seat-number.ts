import { prisma } from "./prisma";

export const generateSeatNumber = async (gameId: string) => {
    const MAX_SEATS = 12;

    const takenSeats = await prisma.player.findMany({
        where: {
            gameId
        },
        select: {
            seatNumber: true
        }
    })

    const taken = new Set(takenSeats.map((seat) => seat.seatNumber))

    const availableSeats = [];

    for (let i = 1; i <= MAX_SEATS; i++) {
        if (!taken.has(i)) {
            availableSeats.push(i)
        }
    }

    if (availableSeats.length === 0) {
        throw new Error("No available seats")
    }

    return availableSeats[Math.floor(Math.random() * availableSeats.length)]
}