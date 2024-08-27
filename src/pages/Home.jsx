import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CustomButton, FriendCard, ProfileCard, TextInput, TopBar } from "../components";
import { requests, suggest } from "../assets/data";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsPersonFillAdd } from "react-icons/bs";
import { useForm } from "react-hook-form";

export default function Home() {
  const { user } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState(requests);
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null)
  const handlePostSubmit = async (data) => {

  }

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
        <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
          <form onSubmit={handlePostSubmit(handlePostSubmit)} className="bg-primary px-4 rounded-lg">
            <div className="w-full flex items-center gap-4 py-4 border-b border-[#66666645]">
              <img
                src={user?.profileUrl ?? NoProfile}
                alt="User Image"
                className="w-14 h-14 rounded-full object-cover"
              />
              <TextInput
                styles="w-full rounded-full py-5"
                placeholder="What's on your mind..."
                name='description'
                register={register("description", {
                  required: "You have to write something on your post!"
                })}
                error={errors.description ? errors.description.message : ""}
              ></TextInput>
            </div>
            {errMsg?.message && (
              <span
                role="alert"
                className={`text-sm ${errMsg?.status === "failed"
                  ? "text-[#f64949fe]"
                  : "text-[#2ba150fe]"
                  } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            <div className="flex items-center justify-between py-4">
              <label
                htmlFor="imgUpload"
                className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
              >
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="imgUpload"
                data-max-size='5120'
                accept="jpg, png, jpeg"
              />
            </div>

          </form>





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