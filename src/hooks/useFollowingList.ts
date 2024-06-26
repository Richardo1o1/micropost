import useSWR from 'swr';

import fetcher from '../libs/fetcher';

const useFollowingList = (userId?:string) => {
    const url = `/api/follow/?userId=${userId}`
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

export default useFollowingList;