import useSWR from 'swr';

import fetcher from '../libs/fetcher';

const useLikeUserList = (postId:string) => {
    const url = `/api/like/?postId=${postId}`
    const { 
      data, 
      error, 
      isLoading, 
      mutate 
    } = useSWR(url, fetcher)
    return {
      data,
      error,
      isLoading,
      mutate
    }
};

export default useLikeUserList;