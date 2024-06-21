import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import toast from "react-hot-toast";
import axios from "axios";
import useFollowlist from "./useFollowingList";

const useFollow = ( userId:string ) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser( userId );
  const { data: followlist,mutate: mutateFetchedFollowerlist } = useFollowlist( userId );
  
  const loginModel = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = followlist?.map( (item: { followingId: any; }) => item.followingId) || [];

    //console.log('followlistLength',list, followlist,userId,currentUser.id);
    if (!currentUser){
      return false;
    } 
    else {
      return list.includes(currentUser.id);
    } 
  },[ followlist,currentUser ]);

  const toggleFollow = useCallback(async () => {
    if(!currentUser){
      return loginModel.onOpen();
    }

    try{
      let request;

      if (isFollowing) {
        request = () => axios.delete('/api/follow', { data: { userId }});
      } else{
        request = () => axios.post('/api/follow', { userId });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();
      mutateFetchedFollowerlist();

      toast.success('Success');
      
    } catch(error){
      toast.error('Something went wrong useFollow');
    }

  },[loginModel,currentUser,userId,isFollowing,mutateCurrentUser,mutateFetchedUser,mutateFetchedFollowerlist]);

  return {
    isFollowing,
    toggleFollow
  }
}

export default useFollow;