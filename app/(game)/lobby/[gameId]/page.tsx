import { prisma } from "@/lib/db/prisma";
import { LobbyHeader } from "./_components/lobby-header";
import { LoadingIndicator } from "./_components/loading-indicator";
import { getPlayerCount } from "@/lib/player-count";
import { auth } from "@/lib/auth/auth";
import { isCurrentUserHost } from "@/lib/is-host";
import { headers } from "next/headers";
import { getCurrentUser } from "@/lib/get-current-user";

const LobbyPage = async ({ params }: { params: { gameId: string } }) => {
  const currentUser = await getCurrentUser()

  const gameId = (await params).gameId;
  const playerCount = await getPlayerCount(gameId);
  const isHost = await isCurrentUserHost(currentUser?.id!, gameId);

  return (
    <div className="h-screen max-w-6xl mx-auto flex flex-col gap-8 px-2">
      <LobbyHeader isHost={isHost} playerCount={playerCount} />
      <LoadingIndicator playerCount={playerCount} />
    </div>
  );
};

export default LobbyPage;
