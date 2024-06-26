'use client'

import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) =>{
  const { data: posts = []} = usePosts( userId ) ;
  
  //console.log("PostFeed data:", posts,userId);

  return (
    <>
      {posts.map((post: Record<string, any >) => (
        <PostItem 
          key = {post.id} 
          data = {post} 
        />
      ))}
    </>
   );
  }
export default PostFeed;