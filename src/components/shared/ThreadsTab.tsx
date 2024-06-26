import { fetchUserPosts } from "@/lib/actions/thread.actions";
import ThreadCard from "../cards/ThreadCard/ThreadCard";
import { ThreadFormData } from "@/lib/validations/thread";
import { IUserSchema } from "@/lib/models/user.model";

interface Props {
  mongoUser: IUserSchema;
}
async function ThreadsTab({ mongoUser }: Props) {
  const result: IUserSchema = await fetchUserPosts(mongoUser?.["_id"]);
  console.log("first", mongoUser);

  return (
    <section>
      {result.threads.map((thread, idx) => {
        const {
          _id,
          author,
          children,
          community,
          parentId,
          threadText,
          likes,
        } = JSON.parse(JSON.stringify(thread));

        return (
          <ThreadCard
            key={_id}
            author={author}
            currentUser={mongoUser}
            replies={children}
            community={community || null}
            parentId={parentId}
            likes={likes}
            threadText={threadText}
            threadId={_id}
          />
        );
      })}
    </section>
  );
}

export default ThreadsTab;
