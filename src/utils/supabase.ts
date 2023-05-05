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
    return await client.storage.from("files").list("userpicture/");
};

export const deleteAllTempFiles = async () => {
    await supabase.storage
        .from("files")
        .list(`temppicture`)
        .then(async (value) => {
            if (value.data && value.data.length > 0) {
                const filesToRemove = value.data.map(
                    (x) => `temppicture/${x.name}`
                );
                await supabase.storage.from("files").remove(filesToRemove);
            }
        });
};
