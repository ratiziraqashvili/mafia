import { headers } from "next/headers"
import { auth } from "./auth/auth";

export const getCurrentUser = async () => {
    const requestHeaders = headers();

    const plainHeader: Record<string, string> = {};
    (await requestHeaders).forEach((value, key) => {
        plainHeader[key] = value;
    })

    const session = await auth.api.getSession({
        headers: plainHeader
    })

    return session?.user ?? null;
}