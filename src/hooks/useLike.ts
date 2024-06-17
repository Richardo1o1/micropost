import { useCallback, useMemo } from "react";

import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import toast from "react-hot-toast";
import axios from "axios";
import usePosts from "./usePosts";
import useLikeUserList from "./useLikeUserList";

const useLike = ( postId : string ) => {
  const { data: currentUser  } = useCurrentUser();
  
  const { mutate: mutateFetchedPost } = usePosts( postId );
  const { data: likelist,mutate: mutateFetchedLikelist } = useLikeUserList( postId );
  
  //TODO
  //const { data: posts,mutate: mutateFetchedPosts } = usePosts( currentUser?.id );

  const loginModel = useLoginModal();

  const hasLikes = useMemo(() => {
  const list = likelist?.map( (item: { likedId: any; }) => item.likedId) || [];

    //console.log('haslikes', list.includes(currentUser?.id), postId , currentUser?.id );
    return list.includes(currentUser?.id);
  },[ likelist,currentUser ]);

  const toggleLike = useCallback(async () => {
    if(!currentUser){
      return loginModel.onOpen();
    }

    try{
      let request;

      if (hasLikes) {
        request = () => axios.delete('/api/like', { data: { postId }});
      } else{
        request = () => axios.post('/api/like', { postId });
      }

      await request();

      mutateFetchedPost();
      mutateFetchedLikelist();
      //mutateFetchedPosts();

      toast.success('Success');
      
    } catch(error){
      toast.error('Something went wrong useLike');
    }

  },[
    loginModel,
    currentUser,
    postId,
    hasLikes,
    mutateFetchedPost,
    mutateFetchedLikelist,
  ]);

  return {
    hasLikes,
    toggleLike
  }
}

export default useLike;