import { prisma } from "@/lib/prisma";
import { LobbyHeader } from "./_components/lobby-header";

const LobbyPage = async ({ params }: { params: { gameId: string } }) => {
    const playerCount = await prisma.player.count({
        where: {
            gameId: params.gameId,
        }
    })

    return (
        <div className="h-screen max-w-6xl mx-auto flex flex-col gap-2">
            <LobbyHeader playerCount={playerCount}/>
        </div>
    );
};

export default LobbyPage;