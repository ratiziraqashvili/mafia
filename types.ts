import { Player } from "./generated/prisma/client";

export type CurrentLobbyPlayers = ({
    user: {
        username: string | null,
        image: string | null,
    }
} & Player)[]