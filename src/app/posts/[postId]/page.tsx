'use client'

import { ClipLoader } from "react-spinners";

import Header from "@/components/Page/Header";
import PostItem from "@/components/posts/PostItem";
import MPform from "@/components/Page/MPform";
import CommentFeed from "@/components/posts/CommentFeed";
import usePost from "@/hooks/usePost";

const PostView = ({ params }: { params: { postId: string } }) => {
  const  postId  = params.postId

  const { data: fetchedPost, isLoading } = usePost(postId as string);

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
      <PostItem data={fetchedPost} />
      <MPform
        postId={postId as string} 
        isComment
        placeholder="Post your reply"
      />
      <CommentFeed comments={fetchedPost.comments} />
    </>
  )
}

export default PostView;