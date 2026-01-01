"use client";

import { useEffect, useState } from "react";
import { JoinGameModal } from "../modals/join-game-modal";
import { CreateGameModal } from "../modals/create-game-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
        <JoinGameModal />
        <CreateGameModal />
        </>
    )
}