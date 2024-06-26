'use client'

import { useCallback, useState } from "react";
import axios from "axios";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import MPinput from "@/components/Page/MPinput";
import MPmodal from "@/components/Page/MPmodal";
import useUsers from "@/hooks/useUsers";


const RegisterModal =() =>{
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const { mutate: mutateUsers } = useUsers();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('');
  const [username,setUsername] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(()=>{
    if(isLoading){
      return;
    };

    registerModal.onClose();
    loginModal.onOpen();
  },[isLoading, loginModal,registerModal]);

  const onSubmit = useCallback(async ()=> {
    try{
      setIsLoading(true);

      await axios.post('/api/register', {
          email,
          password,
          username,
          name
        })
      
      mutateUsers();
      registerModal.onClose();
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  },[registerModal, email, password, username, name,mutateUsers ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <MPinput 
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <MPinput 
        placeholder="Name"
        onChange={(e)=>setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <MPinput 
        placeholder="Username"
        onChange={(e)=>setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <MPinput
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Already have an account?
        <span
          onClick={onToggle}
          className="
            text-white
            cursor-pointer
            hover:underline
          "
        > Sign in</span>
      </p>
    </div>
  );

  return (
    <MPmodal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
 
export default RegisterModal;