'use client'

import { ClipLoader } from "react-spinners";

import usePosts from "@/hooks/useFollowingList";
import Header from "@/components/Page/Header";
import PostItem from "@/components/Page/PostItem";
import MPform from "@/components/Page/MPform";

const PostView = ({ params }: { params: { postId: string } }) => {
  const  postId  = params.postId

  const { data: fetchedPost, isLoading } = usePosts(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="
        flex
        justify-center
        items-center
        h-full
      ">
        <ClipLoader color="lightblue" size={90} />
      </div>
    )
  }

  return (
    <>
      <Header label={"Microblog-Post"} showBackArrow />
      <PostItem data={fetchedPost} userId={fetchedPost.user.id} />
      <MPform
        postId={postId as string} 
        isComment
        placeholder="Post your reply"
      />
    </>
  )
}

export default PostView;