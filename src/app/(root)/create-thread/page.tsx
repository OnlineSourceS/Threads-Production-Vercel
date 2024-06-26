import PostThread from "@/components/forms/PostThread";
import connectToMongoDB from "@/lib/db/connectToMongoDB";
import UserModel from "@/lib/models/user.model";
import { parseJsonObject } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function CreateThreadPage() {
  const clerkUser = await currentUser();
  await connectToMongoDB();
  const user = await UserModel.findOne({ clerkId: clerkUser?.["id"] });

  if (!user) return redirect("/onboarding");

  return (
    <section className="pt-7 pl-4">
      <h1 className="font-bold text-2xl mb-6">Post Thread</h1>
      {/* client-side component  */}

      <PostThread userId={parseJsonObject({ userMongoId: user?._id })} />
    </section>
  );
}

export default CreateThreadPage;
