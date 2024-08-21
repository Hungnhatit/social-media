import React from "react";
import { useSelector } from "react-redux";
import { ProfileCard, TopBar } from "../components";


export default function Home() {
  const { user } = useSelector((state) => state.user);


  return (
    <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
      <TopBar></TopBar>

      <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
        {/* Left */}
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
          <ProfileCard user={user}>
            
          </ProfileCard>
        </div>




        {/* Center */}
        <div></div>



        {/* Right */}
        <div></div>
      </div>
    </div>
  )
}