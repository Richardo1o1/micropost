'use client'

import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useRegisterModal from "@/hooks/useRegisterModal";
import Avatar from "./Avatar";
import MPbutton from "./MPbutton";
import usePosts from "@/hooks/usePosts";
import useLoginModal from "@/hooks/useLoginModal";

interface FromProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
const MPform:React.FC<FromProps> = ({
  placeholder,
  isComment,
  postId
}) => {
  const registModel = useRegisterModal();
  const loginModel = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try{
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}`
                            : `/api/posts`;

      await axios.post(url , { body });
      
      toast.success('Tweet created');

      setBody('');
      mutatePosts();
    } catch(error) {
      toast.error('Something went wrong');

    } finally {
      setIsLoading(false);
    }
  },[body , isComment, postId, mutatePosts]); 

  return(
    <div className="border-b-[1px] border-neutral-800 px-5 py-2"> 
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none
                mt-3
                w-full
                bg-black
                ring-0
                outline-none
                text-[20px]
                placeholder-neutral-500
                text-white
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0
                transition
                peer-focus:opacity-100
                h-[1px]
                w-full
                border-neutral-800
              "
            />
            <div className="mt-4 flex flex-row justify-end">
              <MPbutton
                label="Post"
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
      <div className="py-8">
        <h1 className="
          text-white
          text-2xl
          mb-4
          font-bold
        ">Welcome to Twitter</h1>
        <div className="flex flex-row item-center justify-center gap-4">
          <MPbutton label="Login" onClick={loginModel.onOpen} />
          <MPbutton label="Register" onClick={registModel.onOpen} secondary />
        </div>
      </div> 
    )}
    </div> 
  );
}

export default MPform;