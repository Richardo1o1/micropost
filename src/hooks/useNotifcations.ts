import useSWR from 'swr';

import fetcher from '../libs/fetcher';

const useNotifications = ( userId?:string ) => {
    const { 
      data, 
      error, 
      isLoading, 
      mutate 
    } = useSWR('/api/notifications', fetcher);
    
    return {
      data,
      error,
      isLoading,
      mutate
    }
};

export default useNotifications;