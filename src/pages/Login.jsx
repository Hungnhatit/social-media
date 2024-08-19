import React from "react";
import { TbSocial } from "react-icons/tb";
import { TextInput } from "../components";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register, handleSubmit, formState: { errors }
  } = useForm(
    { mode: "onChange" }
  );

  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl">
        {/* LEFT */}
        <div className="w-full lg:w=1/2 h-full p-10 2xl:px-20 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <TbSocial></TbSocial>
            </div>
            <span className="text-2xl font-semibold">OpenSpace</span>
          </div>

          <p className="text-ascent-1 text-base font-semibold">
            Login to your account
          </p>
          <span className="text-sm mt-2 text-ascent-2">Welcome back</span>

          {/* Form điền thông tin đăng nhập */}
          <form className="py-8 flex flex-col gap-5">
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Username, phone or email"
              type="email"
              register={
                register("email", {
                  required: "Email address is required"
                })}
              styles='w-6/12 rounded-lg'
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
              styles='w-6/12 rounded-lg'
              labelStyle="ml-2"
              error={errors.password ? errors.password.message : ""}
            ></TextInput>

            <Link to="/reset-password">Forgot Password?</Link>
          </form>

        </div>

        {/* RIGHT */}
        <div></div>


      </div>
    </div>
  )
}

export default Login;