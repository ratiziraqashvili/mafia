import { LobbyHeader } from "./_components/lobby-header";
import { LoadingIndicator } from "./_components/loading-indicator";
import { getPlayerCount } from "@/lib/player-count";
import { isCurrentUserHost } from "@/lib/is-host";
import { getCurrentUser } from "@/lib/current-user";
import { LobbyPlayers } from "./_components/lobby-players";
import { getCurrentPlayers } from "@/lib/game/get-current-players";
import { prisma } from "@/lib/db/prisma";
import { LobbySettings } from "./_components/lobby-settings";

const LobbyPage = async ({ params }: { params: { gameId: string } }) => {
  const currentUser = await getCurrentUser();
  const gameId = (await params).gameId;
  const game = await prisma.gameSession.findFirst({
    where: {
      id: gameId,
    },
    select: {
      hostId: true,
      mode: true,
      visibility: true,
      sessionName: true,
    },
  });
  const playerCount = await getPlayerCount(gameId);
  const isHost = await isCurrentUserHost(currentUser?.id!, gameId);
  const currentPlayers = await getCurrentPlayers(gameId);
  const currentPlayersIds = [...currentPlayers.map(p => p.userId)]

  if (!game) {
    throw new Error("This game does not exist")
  }

  if (!currentPlayersIds.includes(currentUser!.id)) {
    throw new Error("You are not allowed to access this page")
  }

  return (
    <div className="h-screen max-w-6xl mx-auto flex flex-col gap-8 lg:px-2 px-5">
      <LobbyHeader gameId={gameId} isHost={isHost} playerCount={playerCount} />
      <LoadingIndicator playerCount={playerCount} />
      <LobbyPlayers
        hostId={game?.hostId}
        isHost={isHost}
        players={currentPlayers}
        isReady={false}
      />
      <LobbySettings
        mode={game?.mode!}
        visibility={game?.visibility!}
        sessionName={game?.sessionName!}
      />
    </div>
  );
};

export default LobbyPage;
