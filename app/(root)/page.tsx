import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";

export default async function Home() {
  const result = await fetchPosts(1, 30)

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.map((idx) => {
          return (
            <ThreadCard 
              id={idx.id}
              text={idx.text}
              author={idx.author}
              community={idx.community}
              createdAt={idx.createdAt}            
            />
        )})}
      </section>
    </>
  );
}
