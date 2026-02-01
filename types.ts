import { Player } from "./generated/prisma/client";

export type CurrentLobbyPlayers = ({
    user: {
        username: string | null,
        image: string | null,
    }
} & Player)[]

export type LobbyPlayer = {
    userId: string;
    socketId: string;
    ready: boolean;
}

export type AllReadyPlayers = {
    userId: string;
    ready: boolean;
}[];