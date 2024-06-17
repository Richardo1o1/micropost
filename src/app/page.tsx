import Headers from "@/components/Page/Header";
import MPform from "@/components/Page/MPform";
import PostFeed from "@/components/posts/PostFeed";
export default function Home() {
  return (
    <>
      <Headers label="Home" showBackArrow={false} />
      <MPform placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}