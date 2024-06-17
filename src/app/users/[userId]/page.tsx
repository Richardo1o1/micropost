'use client'

import { ClipLoader } from "react-spinners"

import useUser from "@/hooks/useUser";
import UserHero from "@/components/Users/UserHero";
import Header from '@/components/Page/Header';
import UserBio from "@/components/Users/UserBio";
import PostFeed from "@/components/posts/PostFeed";

const UserView = ({ params }: { params: { userId: string } }) => {
    const { data: fetechedUser, isLoading } = useUser(params.userId);

    if (isLoading || !fetechedUser) {
      return (
        <div className="
          flex
          justify-center
          items-center
          m-5
          h-full
        ">
          <ClipLoader color="lightblue" size={90} />
        </div>
      )
    }
    
    return (
      <>
        <Header showBackArrow  label={fetechedUser?.name} />
        <UserHero userId={ params.userId as string } />
        <UserBio userId={ params.userId as string } />
        <PostFeed userId={ params.userId as string } />
      </>
    );
}

export default UserView;