import useSWR from 'swr';

import fetcher from '../libs/fetcher';

const useUser = ( userId:string ) => {
    const { 
      data, 
      error, 
      isLoading, 
      mutate 
    } = useSWR(`/api/users/${userId}`, fetcher)
    return {
      data,
      error,
      isLoading,
      mutate
    }
};

export default useUser;