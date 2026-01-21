import { CurrentLobbyPlayers } from "@/types"
import { LobbyPlayerCard } from "./lobby-player-card"

interface LobbyPlayersProps {
    players: CurrentLobbyPlayers;
    isReady: boolean;
}

export const LobbyPlayers = ({ players, isReady }: LobbyPlayersProps) => {
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            {/* <LobbyPlayerCard profilePicture={players.} username={players.username} /> */}
        </div>
    )
}