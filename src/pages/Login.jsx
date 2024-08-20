import React, { useState } from "react";
import { TbSocial } from "react-icons/tb";
import { CustomButton, Loading, TextInput } from "../components";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BgImage } from "../assets";
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";

const Login = () => {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm(
    { mode: "onChange" }
  );

  const onSubmit = async (data) => {

  }

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl">
        {/* LEFT */}
        <div className="w-1/2 lg:w=1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center justify-center mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <TbSocial></TbSocial>
            </div>
            <span className="text-2xl font-semibold">OpenSpace</span>
          </div>

          <p className="text-ascent-1 text-base text-center font-semibold">
            Login to your account
          </p>
          <span className="text-sm mt-2 text-ascent-2 text-center">Welcome back</span>

          {/* Form điền thông tin đăng nhập */}
          <form className="py-8 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Username, phone or email"
              type="email"
              register={
                register("email", {
                  required: "Email address is required"
                })}
              styles='w-full rounded-lg'
              labelStyle="ml-2"
              error={errors.email ? errors.email.message : ""}
            ></TextInput>

            <TextInput
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
              register={
                register("password", {
                  required: "Password is required"
                })
              }
              styles='w-full rounded-lg'
              labelStyle="ml-2"
              error={errors.password ? errors.password.message : ""}
            ></TextInput>

            {
              errMsg?.message && (
                <span
                  className={`text-sm ${errMsg?.status == 'failed' ? "text-[#f64949fe]" : "text-[#2ba150fe]"} mt-0.5`}
                >
                  {errMsg.message}
                </span>
              )
            }

            {isSubmitted ? <Loading /> : <CustomButton
              type='submit'
              containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outlined-none`}
              title="Login"
            />}
          </form>
          <Link to="/reset-password" className="text-sm text-center py-5 text-blue font-semibold">Forgot Password?</Link>

          <p className="text-ascent-2 text-sm text-center">Don't have an account?
            <Link to="/reset-password" className="text-sm text-right text-blue font-semibold"> Create an account</Link>
          </p>

        </div>

        {/* RIGHT */}
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue">
          <div className="relative w-full flex items-center justify-center">
            <img
              src={BgImage}
              alt="background-image"
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover" />

            <div className="absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full">
              <BsShare size={14}></BsShare>
              <span className="text-xs font-medium">Share</span>
            </div>

            <div className="absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full">
              <ImConnection></ImConnection>
              <span className="text-xs font-medium">Connect</span>
            </div>

            <div className="absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full">
              <AiOutlineInteraction></AiOutlineInteraction>
              <span className="text-xs font-medium">Interact</span>
            </div>


          </div>

          <div className="mt-16 text-center">
            <p className="text-white text-base">Connect with friends & have fun momment</p>
            <span className="text-sm text-white/80">Share memories with friend and the world</span>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Login;