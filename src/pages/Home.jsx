import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, EditProfile, FriendCard, Loading, PostCard, ProfileCard, TextInput, TopBar } from "../components";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { apiRequest, deletePost, fetchPosts, getUserInfo, handleFileUpload, likePost, sendFriendRequest } from "../utils";
import { requests } from "../assets/data.js";
import { UserLogin } from "../redux/userSlice.js";

export default function Home() {
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [friendRequest, setFriendRequest] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handlePostSubmit = async (data) => {
    setPosting(true);
    setErrMsg("");
    try {
      const uri = file && (await handleFileUpload(file));
      const newData = uri ? { ...data, image: uri } : data;
      const res = await apiRequest({
        url: "/posts/create-post",
        data: newData,
        token: user?.token,
        method: "POST"
      });

      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        reset({
          description: "",
        });
        setFile(null);
        setErrMsg("");
        await fetchPost();
      };
      setPosting(false);
    } catch (error) {
      console.log(error);
      setPosting(false);
    }
  }


  const fetchPost = async () => {
    await fetchPosts(user?.token, dispatch);
    setLoading(false);
  }

  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token });
    await fetchPost();
  }

  const handleDelete = async (id) => {
    await deletePost(id, user.token);
    await fetchPost();
  }

  const fetchFriendRequest = async () => {
    try {
      const res = await apiRequest({
        url: "/users/get-friend-request",
        token: user?.token,
        method: "POST"
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSuggestedFriends = async () => {
    try {
      const res = await apiRequest({
        url: "/users/suggested-friends",
        token: user?.token,
        method: "POST"
      });
      setSuggestedFriends(res?.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleFriendRequest = async (id) => {
    try {
      const res = await sendFriendRequest(user.token, id);
      await fetchSuggestedFriends();
    } catch (error) {
      console.log(error);
    }
    console.log(user.token);
  }

  const acceptRequest = async (id, status) => {
    try {
      const res = await apiRequest({
        url: "/users/accept-request",
        token: user?.token,
        method: "POST",
        data: { rid: id, status },
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getUser = async () => {
    const res = await getUserInfo(user?.token);
    const newData = { token: user?.token, ...res };
    dispatch(UserLogin(newData));
    console.log(newData);
  }



  useEffect(() => {
    setLoading(true);
    getUser();
    fetchPost();
    fetchFriendRequest();
    fetchSuggestedFriends();
  }, [])

  return (
    <>
      <div className="home w-full pb-1 bg-bgColor lg:rounded-lg h-screen overflow-auto">
        <TopBar></TopBar>

        <div className="w-full lg:px-10 flex gap-2 lg:gap-4 pt-5 pb-1 h-full">
          {/* Left */}
          <div className="hidden w-1/4  h-full md:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard user={user}></ProfileCard>
            <FriendCard friends={user?.friends} user={user}></FriendCard>
          </div>

          {/* Center */}
          <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            <form onSubmit={handleSubmit(handlePostSubmit)} className="bg-primary px-4 rounded-lg">
              <div className="w-full flex items-center gap-4 py-4 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt="User Image"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <TextInput
                  styles="w-full rounded-full"
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

              {/* Post Upload */}
              <div className="flex items-center justify-between py-4">
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="imgUpload"
                    data-max-size='5120'
                    accept="jpg, png, jpeg"
                  />
                  <BiImages></BiImages>
                  <span>Image</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:test-ascent-1 cursor-pointer"
                  htmlFor="videoUpload"
                >
                  <input
                    type="file"
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id='videoUpload'
                    accept='.mp4'
                  />
                  <BiSolidVideo></BiSolidVideo>
                  <span>Video</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="gifUpload">
                  <input
                    type="file"
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id='gifUpload'
                    accept='.gif'
                  />
                  <BsFiletypeGif></BsFiletypeGif>
                  <span>GIF</span>
                </label>

                <div>
                  {
                    posting ? (
                      <Loading />
                    ) : (
                      <CustomButton
                        type='submit'
                        title="Post"
                        containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                      ></CustomButton>
                    )
                  }
                </div>
              </div>
            </form>

            {/* Post Container */}
            {loading ? (<Loading />) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                >
                </PostCard>

              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No post available</p>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="hidden w-1/5 h-full lg:flex flex-col gap-8 overflow-y-auto">
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
                        onClick={() => acceptRequest(_id, "Accepted")}
                        containerStyles='w-1/2 justify-center bg-[#0444a4] text-sm text-white px-1.5 py-1.5 rounded-2xl'
                      ></CustomButton>
                      <CustomButton
                        title='Delete'
                        onClick={() => acceptRequest(_id, "Denied")}
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
                        <button className="bg-[#0444a430] text-sm text-white p-1 rounded" onClick={() => handleFriendRequest(friend?._id)}>
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

      {/* Edit Profile */}
      {edit &&
        <EditProfile />
      }
    </>
  )
}