'use client'

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import useLoginModal from "@/hooks/useLoginModal";
import MPmodal from "@/components/Page/MPmodal";
import useRegisterModal from "@/hooks/useRegisterModal";
import MPinput from "@/components/Page/MPinput";

const LoginModal =() =>{
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(()=>{
    if(isLoading){
      return;
    };

    loginModal.onClose();
    registerModal.onOpen();
  },[isLoading, loginModal,registerModal]);

  const onSubmit = useCallback(async ()=> {
    try{
      setIsLoading(true);

      console.log('credentials email', email,password);

      await signIn('credentials', {
        email,
        password
      });

      loginModal.onClose();
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  },[loginModal, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <MPinput 
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
        type='text'
      />
      <MPinput
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        type='password'
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>First time using Twiter?
        <span
          onClick={onToggle}
          className="
            text-white
            cursor-pointer
            hover:underline
          "
        > Creat an account</span>
      </p>
    </div>
  )
  
  return (
    <MPmodal 
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign In"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
 
export default LoginModal;