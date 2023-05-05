import { BEinstance } from "src/utils/axios";
import { useUserStore } from "src/stores/UserStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserProfile } from "src/interfaces/UserProfile";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserProfileSchema } from "src/schemas/UserProfileSchema";
import { Button, Upload, UploadFile, UploadProps } from "antd";
import { Upload as UploadIcon } from "tabler-icons-react";
import { ImageUpload } from "src/components/home/AddClientModal";
import { deleteAllTempFiles, supabase } from "src/utils/supabase";
import toast from "react-hot-toast";
export const handleDelete = async (path: string) => {
    return await supabase.storage.from("files").remove([`${path}`]);
};

export default function Profile() {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [file, setFile] = useState<ImageUpload | null>(null);
    const { userProfile } = useUserStore((state) => state.user);
    const setUserProfile = useUserStore((state) => state.setUserProfile);

    const {
        register,
        setValue,
        handleSubmit,
        reset,
        getValues,
        formState: { errors, isValid },
    } = useForm<UserProfile>({
        mode: "onBlur",
        resolver: yupResolver(UserProfileSchema),
    });

    const getUserProfile = async () => {
        if (userProfile) {
            if (userProfile.imageUrl) {
                setValue("imageUrl", userProfile.imageUrl, {
                    shouldValidate: true,
                });
            } else {
                setValue("imageUrl", "/images/default-profile.png", {
                    shouldValidate: true,
                });
            }
            setValue("firstName", userProfile.firstName, {
                shouldValidate: true,
            });
            setValue("lastName", userProfile.lastName, {
                shouldValidate: true,
            });
            setValue("email", userProfile.email, { shouldValidate: true });
        }
    };
    const handleChange: UploadProps["onChange"] = async ({
        file,
        fileList,
    }) => {
        setFileList(fileList);
    };

    const handleCustomUpload = async (RcCustomRequestOptions: any) => {
        await deleteAllTempFiles();
        // Delete files if they exist in the first place
        if (file !== null) {
            const urlSplit = file.url.split("/");
            const path = `${urlSplit[urlSplit.length - 2]}/${
                urlSplit[urlSplit.length - 1]
            }`;
            const { data, error } = await supabase.storage
                .from("files")
                .remove([`${path}`]);
            if (error) {
                console.log(error);
            }
        }
        if (RcCustomRequestOptions.file) {
            const file = RcCustomRequestOptions.file;
            const body = await supabase.storage
                .from("files")
                .upload(`temppicture/${file.name}`, file);
            if (body.data && body.data !== undefined) {
                const url = await supabase.storage
                    .from("files")
                    .getPublicUrl(body.data.path);
                setValue("imageUrl", url.data.publicUrl, {
                    shouldValidate: true,
                });
                setFile({ url: url.data.publicUrl, fileName: file.name });
            }
        }
    };

    const handleOnSubmit = async (profileData: UserProfile) => {
        const urlSplit = profileData.imageUrl.split("/");
        const tempPath = `${urlSplit[urlSplit.length - 2]}/${
            urlSplit[urlSplit.length - 1]
        }`;
        const picPath = `userpicture/${urlSplit[urlSplit.length - 1]}`;
        await supabase.storage
            .from("files")
            .copy(tempPath, picPath)
            .then(async (value) => {
                // get supabase url
                const url = await supabase.storage
                    .from("files")
                    .getPublicUrl(picPath);
                profileData.imageUrl = url.data.publicUrl;

                // after getting url push it to database
                await BEinstance.put("/users/update-profile", profileData).then(
                    async (value) => {
                        if (value.data) {
                            toast.success(value.data);
                            setUserProfile(profileData);
                        }
                    }
                );
            })
            .catch((error) => {
                //most likely resource already exists so we can ignore the error
                console.log(error);
            });
    };

    useEffect(() => {
        getUserProfile();
    }, []);
    return (
        <form
            className="flex flex-col gap-10 w-5/6 py-24 text-black"
            onSubmit={handleSubmit((data) => handleOnSubmit(data))}
        >
            <span className="text-left text-4xl font-medium">My Profile</span>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center gap-4">
                    <img
                        width={150}
                        height={150}
                        className="rounded-full"
                        src={getValues("imageUrl")}
                    />
                    <Upload
                        customRequest={handleCustomUpload}
                        {...{
                            name: "profileImage",
                        }}
                        fileList={fileList}
                        maxCount={1}
                        onChange={handleChange}
                        showUploadList={false}
                    >
                        <Button className="flex gap-2 top-0 left-0">
                            <UploadIcon size={20} /> Click to Upload
                        </Button>
                    </Upload>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2 w-6/12">
                        <label>First Name:</label>
                        <input
                            {...register("firstName")}
                            onChange={(e) => {
                                setValue("firstName", e.target.value);
                            }}
                            className="bg-[#E9E9E9] rounded-md outline-none py-2 px-4"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-5/12">
                        <label>Last Name:</label>
                        <input
                            {...register("lastName")}
                            onChange={(e) => {
                                setValue("lastName", e.target.value);
                            }}
                            className="bg-[#E9E9E9] rounded-md outline-none py-2 px-4"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Email:</label>
                    <input
                        {...register("email")}
                        onChange={(e) => {
                            setValue("email", e.target.value);
                        }}
                        className="bg-[#E9E9E9] rounded-md outline-none py-2 px-4"
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className="mt-10 rounded-xl bg-[#424760] text-white px-4 py-2 w-3/12"
                    type="submit"
                >
                    save
                </button>
            </div>
        </form>
    );
}
