import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const apiKey = process.env.NEXT_PUBLIC_API_KEY;
export const supabase = createClient(
    "https://zqjnaztqbngpozcvewoi.supabase.co",
    `${apiKey}`
);
export interface UserFileUrl {
    path: string;
}

export interface UserFile {
    id: number;
    userId: number;
    filePath: string;
}

export const getFiles = async (client: SupabaseClient<any, "public", any>) => {
    return await client.storage.from("files").list("public/");
};
