import ThreadCard from "@/components/cards/ThreadCard/ThreadCard";
import PostThread from "@/components/forms/PostThread";
import ThreadReply from "@/components/forms/ThreadReply";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import connectToMongoDB from "@/lib/db/connectToMongoDB";
import UserModel, { IUserSchema } from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

async function ThreadPage(props) {
  const user = await currentUser();
  if (!user) return redirect("/");

  const mongoUser = await fetchUser(user?.id ?? "");
  console.log();
  const thread = await fetchThreadById(props.params.id);
  const {
    author,
    _id,
    threadText,
    parentId,
    community,
    likes,
    children,
    media,
  } = JSON.parse(JSON.stringify(thread));
  return (
    <>
      {/* client-side component  */}
      <ThreadCard
        key={_id}
        threadId={_id}
        author={author}
        currentUser={mongoUser}
        replies={children}
        community={community || null}
        likes={likes}
        parentId={parentId}
        threadText={threadText}
        media={media}
      />

      <div className=" thread-reply-form px-6 mt-4 mb-2 text-xl ">
        <h2 className="font-bold">Reply</h2>
        {/* <PostThread userId={{ userMongoId: mongoUser?._id }} /> */}
        <ThreadReply
          threadId={_id}
          author={author}
          currentUser={mongoUser}
          replies={children}
          community={community || null}
          parentId={parentId}
          threadText={threadText}
        />
      </div>
      <div className="thread-replies">
        {children.length
          ? children.map((childThread, idx) => {
              const {
                author,
                _id,
                threadText,
                parentId,
                community,
                likes,
                children,
              } = JSON.parse(JSON.stringify(childThread));
              return (
                <ThreadCard
                  key={_id}
                  threadId={_id}
                  author={author}
                  currentUser={mongoUser}
                  parentId={parentId}
                  replies={children}
                  community={community || null}
                  likes={likes}
                  threadText={threadText}
                />
              );
            })
          : null}
      </div>
    </>
  );
}

export default ThreadPage;
