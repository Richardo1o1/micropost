'use client'

import { useRouter } from 'next/navigation'
import { BsFeather } from "react-icons/bs";

const SidebarLogo = () => {
    const router = useRouter();
    return(
        <div 
            onClick={()=> router.push('/')} 
            className="
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            hover:bg-sky-700
            hover:bg-opacity-10
            justify-center
            cursor-pointer
            transition
        ">
            <BsFeather size={28} color= "white" className=""/>
        </div>
    );
}

export default SidebarLogo;