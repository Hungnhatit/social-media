import { useState } from "react"
import { useForm } from "react-hook-form";
import { CustomButton, Loading, TextInput } from "../components";

export default function ResetPassword() {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => { };


  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <p className="text-ascent-1 text-lg font-semibold">Email Address</p>
        <span className="text-sm text-ascent-2">
          Enter email address used during registration
        </span>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="py-4 flex flex-col gap-5"
        >
          <TextInput
            name="email"
            placeholder='example@email.com'
            type='email'
            register={register("email", {
              required: "Email address is required!",
            })}
            styles='w-full rounded-lg'
            labelStyles='ml-2'
            error={errors.email ? errors.email.message : ""}
          >
          </TextInput>
          {
            errMsg?.message && (
              <span
                role='alert'
                className={`text-sm ${errMsg?.status === 'failed'
                  ? "text-[#f64949fe]"
                  : "text-[#f2ba150fe]"
                  } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )
          }

          {isSubmitted ?
            (<Loading />) :
            (<CustomButton
              type='submit'
              containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outlined-none`}
              title="Send"
            />)}
        </form>
      </div>
    </div>
  )

}