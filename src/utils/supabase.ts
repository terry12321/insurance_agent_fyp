import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const apiKey = process.env.NEXT_PUBLIC_API_KEY;
export const supabase = createClient(
    "https://ivxonmjfqaxpzevtrzjm.supabase.co",
    `${apiKey}`
);
export interface UserFileUrlType {
    id?: number;
    path: string;
    name?: string;
}

export const getFiles = async (client: SupabaseClient<any, "public", any>) => {
    return await client.storage.from("files").list("public/");
};
