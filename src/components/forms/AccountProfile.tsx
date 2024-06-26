"use client";
import { TbLoader3 } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormData, UserValidation } from "@/lib/validations/user";
import * as z from "zod";
import Image from "next/image";
import { isBase64Image } from "@/lib/utils";
import { uploadFiles } from "@/utils/uploadthing";
import { updateUserData } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { UploadFileResponse } from "uploadthing/client";
import { toast } from "sonner";
type User = {
  id?: string;
  objectId?: string;
  username?: string;
  name?: string;
  bio?: string;
  image?: string;
};
interface Props {
  user: User;
  BtnText: string;
}

function AccountProfile({ user, BtnText }: Props) {
  const [SelectedFiles, setSelectedFiles] = useState<File[] | FileList | null>(
    null
  );
  const [IsLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    } as UserFormData,
  });

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const { username, name, bio, profile_photo: blob } = values;

    // * Check if the image is changed or not!
    const hasImageChanged = isBase64Image(blob);

    let uploadthingImageRes: UploadFileResponse[] = [];

    if (hasImageChanged) {
      setIsLoading(true);

      // * upload file to Uploadthing using api-endpoint '/imageUploader'
      uploadthingImageRes = await uploadFiles({
        endpoint: "imageUploader",
        files: SelectedFiles as File[],
      });
    } else {
      toast.error("Kindly, Upload Your Profile Image!");
      return;
    }

    await updateUserData({
      userId: user.id,
      name,
      username,
      bio,
      image: uploadthingImageRes[0]?.url,
      path: pathname,
    });

    toast.success("Successfully, Configured Your Profile!");
    setIsLoading(false);
    router.push("/");
  }
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    changeImageSrcValue: (value: string) => void
  ): void {
    event.preventDefault();
    const files: FileList | null = event.target.files;
    const file: File | undefined = files?.[0];

    if (files?.length === 0) {
      return;
    }

    // ? check if the file is image
    if (!file?.type.includes("image")) return;

    setSelectedFiles(Array.from(files || []));

    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      // * path-url of the image
      const imagePathURL = e.target?.result?.toString() || "";

      // * image URL, We Could Also Use State-Variable To Change The Src-Value
      changeImageSrcValue(imagePathURL);

      console.log({ imagePathURL });
    };
    // * reading the current-image-file as data url
    fileReader.readAsDataURL(file);
  }

  return (
    <div className="mt-12">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="profile_photo"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-5">
                    <FormLabel>
                      <Image
                        src={field.value ? field.value : "/assets/profile.svg"}
                        width={80}
                        height={80}
                        alt="profile"
                        className={`rounded-full border-2 border-gray-700 ${
                          field.value ? "" : "p-2"
                        } object-contain`}
                      />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleChange(e, field.onChange)}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>Select Your Profile Photo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      unselectable="on"
                      placeholder="Enter Your Username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter Your User Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} />
                  </FormControl>
                  <FormDescription>Enter Your Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write About Yourself" {...field} />
                  </FormControl>

                  <FormDescription>Describe yourself</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={IsLoading}
              className="w-full flex gap-1.5 items-center"
            >
              <span>{IsLoading ? "Preparing" : BtnText}</span>
              <span>
                {!IsLoading ? ">" : <TbLoader3 className="animate-spin" />}
              </span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AccountProfile;
