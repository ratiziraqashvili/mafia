"use client"

import { CurrentLobbyPlayers } from "@/types";
import { LobbyPlayerCard } from "./lobby-player-card";

interface LobbyPlayersProps {
  players: CurrentLobbyPlayers;
  isReady: boolean;
  isHost: boolean;
  hostId: string | undefined;
}

export const LobbyPlayers = ({
  players,
  isReady,
  isHost,
  hostId,
}: LobbyPlayersProps) => {


  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 ">
      {players.map((player) => {
        if (player.userId == hostId) {
          isHost = true;
        } else isHost = false;

        return (
          <LobbyPlayerCard
            isReady={isReady}
            isHost={isHost}
            key={player.id}
            username={player.user.username}
            profilePicture={player.user.image}
          />
        );
      })}
    </div>
  );
};
