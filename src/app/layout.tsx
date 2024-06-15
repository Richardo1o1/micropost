import './globals.css'
import { Toaster } from 'react-hot-toast';

import Sidebar from "@/components/Layout/Sidebar";
import FollowBar from '@/components/Layout/FollowBar';
import LoginModal from '@/components/Modals/LoginModal';
import RegisterModal from '@/components/Modals/RegisterModal';
import AuthProvider from '@/components/Context/AuthProvider';
import EditModal from '@/components/Modals/EditModal';


export const metadata = {
  title: 'Micropost',
  description: 'Record your minds',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster />
          <EditModal />
          <LoginModal />
          <RegisterModal />
          <div className="h-screen bg-black">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 h-full">
                    <Sidebar />
                    <div className="
                      col-span-3
                      lg:col-span-2
                      border-x-[1px]
                      border-neutral-800
                    ">
                      <main>{children}</main>
                    </div> 
                    <FollowBar />
                </div>  
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}