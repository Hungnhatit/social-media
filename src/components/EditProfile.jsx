import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoIosCloseCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
import TextInput from './TextInput';
import { IoCloseSharp } from 'react-icons/io5';
import Loading from './Loading';
import CustomButton from './CustomButton';
import { UpdateProfile } from '../redux/userSlice';

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);

  const {
    register, handleSubmit, formState: { errors }
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user }
  });

  const onSubmit = async (data) => {

  }

  const handleClose = () => {
    dispatch(UpdateProfile(false));
  }

  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  }

  return (
    <>
      <div className='fixed z-50 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity'>
            <div className='absolute inset-0 bg-[#000] opacity-70' onClick={handleClose}>
            </div>
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
          &#8203;

          <div
            className='inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
            role="dialog"
            aria-modal="true"
            aria-labelledby='modal-headline'
          >
            {/* Edit Profile Heading */}
            <div className='flex items-center justify-between px-6 pt-5 pb-2'>
              <label
                htmlFor="name"
                className='block font-medium text-xl text-ascent-1 text-left'>
                Edit Your Profile
              </label>
              <button className='text-ascent-1 hover:opacity-35 transition' onClick={handleClose}>
                <IoCloseSharp size={28} />
              </button>
            </div>

            {/* Edit Fill Form */}
            <form
              className='px-4 pb-6 sm:px-6 flex flex-col gap-3 2xl:gap-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                name="firstName"
                label="First name"
                placeholder="First name"
                type="text"
                styles="w-full"
                register={register("firstName", {
                  required: "First Name is required",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              ></TextInput>

              <TextInput
                name="lastName"
                label="Last name"
                placeholder="Last name"
                type="text"
                styles="w-full"
                register={register("lastName", {
                  required: "Last name is required",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              ></TextInput>

              <TextInput
                name="profession"
                label="Profession"
                placeholder="Profession"
                type="text"
                styles="w-full"
                register={register("profession", {
                  required: "Profession is required",
                })}
                error={errors.profession ? errors.profession?.message : ""}
              ></TextInput>

              <TextInput
                name="location"
                label="Location"
                placeholder="Location"
                type="text"
                styles="w-full"
                register={register("location", {
                  required: "Location is required",
                })}
                error={errors.location ? errors.location?.message : ""}
              ></TextInput>

              <label
                className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                htmlFor="imgUpload">
                <input
                  type="file"
                  className=''
                  id="imgUpload"
                  onChange={(e) => handleSelect(e)}
                  accept=".jpg, .jpeg, .png"
                />
              </label>

              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                    }`}
                >
                  {errMsg?.message}
                </span>
              )}

              <div className='py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]'>
                {isSubmitting
                  ? (<Loading />)
                  : (
                    <CustomButton
                      type="submit"
                      containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                      title="Submit"
                    >
                    </CustomButton>)}
              </div>



            </form>


          </div>



        </div>





      </div>
    </>
  )
}

export default EditProfile