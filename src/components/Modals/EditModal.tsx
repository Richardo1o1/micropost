'use client'

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser"
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import MPinput from "../Page/MPinput";
import MPmodal from "../Page/MPmodal";


const EditModal = () =>{
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() =>{
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
    setUserId(currentUser?.id);
  },[currentUser]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback( async () =>{
    try{
      setIsLoading(true);

      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage,
        userId
      });
      mutateFetchedUser();

      toast.success('Updated');

      editModal.onClose();
    } catch(error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false);
    }
  },[name,username,bio,profileImage,coverImage,userId,editModal,mutateFetchedUser])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <MPinput 
        placeholder="Name"
        onChange={(e)=> setName(e.target.value)}
        value={ name }
        disabled={isLoading}
      />
      <MPinput 
        placeholder="Username"
        onChange={(e)=> setUsername(e.target.value)}
        value={ username }
        disabled={isLoading}
      />
      <MPinput 
        placeholder="Bio"
        onChange={(e)=> setBio(e.target.value)}
        value={ `${bio ? bio : ''}` } 
        disabled={isLoading}
      />
    </div>
  );

  return(
    <MPmodal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}

export default EditModal;