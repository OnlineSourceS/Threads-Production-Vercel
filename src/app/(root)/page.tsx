import ThreadsContainer from "@/components/ThreadsContainer";

import ReelCard from "@/components/cards/ReelCard";
import ThreadCard from "@/components/cards/ThreadCard/ThreadCard";
import ReelsContainer from "@/components/containers/ReelsContainer";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { IUserSchema } from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { WhatsOnYourMind } from "./WhatsOnYourMind";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const mongoUser: IUserSchema | null = await fetchUser(user?.id);

  if (!mongoUser?.["onboarded"]) return redirect("/onboarding");
  const { threads, isNextPage, totalThreadsCount } = JSON.parse(
    JSON.stringify(await fetchThreads(Number(1)))
  );

  return (
    <div className="my-8 px-2 overflow-hidden ">
      {/* <UserButton afterSignOutUrl="/" /> */}
      {/* <h1 className="">e<SignedIn>SignnedIn Material</SignedIn> i</h1> */}

      <ReelsContainer>
        <ReelCard />
        <ReelCard />
      </ReelsContainer>
      {/* <h1 className="text-2xl font-semibold mt-7">Threads</h1> */}
      <WhatsOnYourMind user={mongoUser} />
      <div className="w-full">
        {/* server-side component  */}
        <ThreadsContainer
          isNextPage={isNextPage}
          totalThreadsCount={totalThreadsCount}
          threads={threads}
          mongoUser={mongoUser}
          page={1}
        >
          {""}
        </ThreadsContainer>
      </div>
    </div>
  );
}
// NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZGV2b3RlZC1mb3gtNTYuY2xlcmsuYWNjb3VudHMuZGV2JA
// CLERK_SECRET_KEY=sk_test_zqPqWVIPj9wgdhsr7F4bXppvN2npMATdVrv2nMDqA6

// NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
// NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
// NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
// NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
