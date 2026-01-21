import { LobbyHeader } from "./_components/lobby-header";
import { LoadingIndicator } from "./_components/loading-indicator";
import { getPlayerCount } from "@/lib/player-count";
import { isCurrentUserHost } from "@/lib/is-host";
import { getCurrentUser } from "@/lib/get-current-user";
import { LobbyPlayers } from "./_components/lobby-players";
import { getCurrentPlayers } from "@/lib/game/get-current-players";

const LobbyPage = async ({ params }: { params: { gameId: string } }) => {
  const currentUser = await getCurrentUser()
  const gameId = (await params).gameId;
  const playerCount = await getPlayerCount(gameId);
  const isHost = await isCurrentUserHost(currentUser?.id!, gameId);
  const currentPlayers = await getCurrentPlayers(gameId);

  return (
    <div className="h-screen max-w-6xl mx-auto flex flex-col gap-8 lg:px-2 px-5">
      <LobbyHeader isHost={isHost} playerCount={playerCount} />
      <LoadingIndicator playerCount={playerCount} />
      <LobbyPlayers players={currentPlayers} isReady={false} />
    </div>
  );
};

export default LobbyPage;
