'use client'

import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { BiCalendar } from 'react-icons/bi';

import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import MPbutton from '../Page/MPbutton';
import useEditModal from '@/hooks/useEditModal';


interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetechedUser } = useUser( userId );

  const createdAt = useMemo(() => {
    if(!fetechedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetechedUser.createdAt), 'MMMM yyyy');
  },[fetechedUser?.createdAt]);

  const editModal = useEditModal();

  return (
    <div className='border-b-[1px] border-neutral-800 pb-4'>
      <div className='flex justify-end p-2'>
        {currentUser?.id === userId ? (
          <MPbutton secondary label='Edit' onClick={ editModal.onOpen } />
        ) : (
          <MPbutton 
            onClick={()=>{}}
            label='Follow'
            secondary
          />
      )}
      </div>

      <div className='mt-8 px-4'>
        <div className='flex flex-col'>
          <p className='text-white text-2xl font-semibold'>
            {fetechedUser?.name}
          </p>
          <p className='texd-md text-neutral-500'>
            @{fetechedUser?.username}
          </p>
        </div>
        <div className='flex flex-col mt-4'>
          <div className='text-white'>
            {fetechedUser?.bio}
          </div>
          <div
            className='
              flex
              flex-row
              item-center
              gap-2
              mt-4
              text-neutral-500
            '
          >
            <BiCalendar size={24} />
            <p>
              Joined {createdAt}
            </p>
          </div>
        </div>
        <div className='flex flex-row item-center mt-4 gap-6'>
          <div className='flex flex-row item-center gap-1'>
            <p className='text-white'>
              {fetechedUser?.followingCount || 0}
            </p>
            <p className='text-neutral-500'>
              Following
            </p>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <p className='text-white'>
              {fetechedUser?.followersCount || 0}
            </p>
            <p className='text-neutral-500'>
              Followers
            </p>            
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBio;