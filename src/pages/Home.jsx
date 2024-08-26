import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CustomButton, FriendCard, ProfileCard, TopBar } from "../components";
import { requests, suggest } from "../assets/data";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsPersonFillAdd } from "react-icons/bs";

export default function Home() {
  const { user } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);

  return (
    <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
      <TopBar></TopBar>

      <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
        {/* Left */}
        <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
          <ProfileCard user={user}></ProfileCard>
          <FriendCard friends={user?.friends}></FriendCard>
        </div>


        {/* Center */}
        <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto">

        </div>



        {/* Right */}
        <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
          {/* Friend Request */}
          <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5 ">
            <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
              <span className="">Friends Request</span>
              <span>{friendRequest?.length}</span>
            </div>

            <div className="w-full flex flex-col gap-4 pt-4">
              {friendRequest?.map(({ _id, requestFrom: from }) => (
                //Request item
                <div key={_id} className="">
                  <Link
                    to={"/profile/" + from._id}
                    className="w-full flex gap-4 items-center cursor-pointer mb-2"
                  >
                    <img
                      src={from?.profileUrl ?? NoProfile}
                      alt={from?.firstName}
                      className="w-10 h-10 object-contain rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-ascent-1">
                        {from?.firstName} {from?.lastName}
                      </p>
                      <span className="text-sm text-ascent-2">
                        {from?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>

                  {/* Request action */}
                  <div className="flex gap-1">
                    <CustomButton
                      title='Accept'
                      containerStyles='w-1/2 justify-center bg-[#0444a4] text-sm text-white px-1.5 py-1.5 rounded-2xl'
                    ></CustomButton>
                    <CustomButton
                      title='Delete'
                      containerStyles='w-1/2 justify-center border border-[#666] text-sm text-ascent-1 px-1.5 py-1.5 rounded-2xl'
                    ></CustomButton>
                  </div>



                </div>
              ))}
            </div>

          </div>





          {/* Suggested Friend */}
          <div>
            <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
              <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
                <span>Suggestion</span>
              </div>
              <div className="w-full flex flex-col gap-4 pt-4">
                {suggestedFriends?.map((friend) => (
                  <div className="flex items-center justify-between" key={friend._id}>
                    <Link
                      to={'/profile/' + friend?._id}
                      key={friend?._id}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={friend?.profileUrl ?? NoProfile}
                        alt={friend?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {friend?.firstName} {friend?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {friend?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <button className="bg-[#0444a430] text-sm text-white p-1 rounded" onClick={() => { }}>
                  <BsPersonFillAdd size={20} className="text-[#0f52b6]"></BsPersonFillAdd>
                      </button>
                    </div>


                  </div>
                ))}
              </div>


            </div>





          </div>








        </div>







      </div>
    </div>
  )
}