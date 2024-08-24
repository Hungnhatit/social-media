import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { NoProfile } from '../assets';
import { LiaEditSolid } from 'react-icons/lia';
import moment from 'moment';
import { UpdateProfile } from '../redux/userSlice';
import { BsBriefcase, BsFacebook, BsInstagram, BsPersonFillAdd } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { FaThreads } from 'react-icons/fa6';

const ProfileCard = ({ user }) => {
  const { user: data, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4'>
        <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
          <Link to={'/profile/' + user?._id}
            className='flex gap-2'>
            <img
              src={user?.profileUrl ?? NoProfile}
              alt={user?.email}
              className='w-14 h-14 object-cover rounded-full '
            />
            <div className='flex flex-col justify-center'>
              <p className='text-lg font-medium text-ascent-2'>
                {user?.firstName} {user?.lastName}
              </p>
              <span className='text-ascent-2'>
                {user?.profession ?? "No Profession"}
              </span>
            </div>
          </Link>

          <div className=''>
            {user?._id === data?._id ? (<LiaEditSolid
              size={22}
              className='text-blue cursor-pointer'
              onClick={() => dispatch(UpdateProfile(true))}
            ></LiaEditSolid>) : (
              <button
                className='bg-[#0444a430] text-sm text-white p-1 rounded'
                onClick={() => { }}
              >
                <BsPersonFillAdd size={20} className='text-[#0f52b6]'></BsPersonFillAdd>
              </button>
            )}
          </div>

        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <div className='flex gap-2 items-center text-ascent-1'>
            <CiLocationOn className='text-xl text-ascent-1'></CiLocationOn>
            <span>{user?.location ?? "Add a location"}</span>
          </div>

          <div className="flex gap-2 items-center text-ascent-1">
            <BsBriefcase className="text-xl text-ascent-1"></BsBriefcase>
            <span>{user?.profession ?? "Add a profession"}</span>
          </div>
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
          <p className='text-xl text-ascent-1 font-semibold'>
            {user?.friends?.length} Friends
          </p>

          <div className='flex items-center justify-between'>
            <span className='text-ascent-2'>Who viewed your profile?</span>
            <span className='text-ascent-1 text-lg'>{user?.views?.length}</span>
          </div>

          <span className='text-base text-blue'>
            {user?.verified ? "Verified Account" : "Not Verified"}
          </span>

          <div className='flex items-center justify-between'>
            <span className="text-ascent-2">Joined</span>
            <span className="text-ascent-1 text-base">
              {moment(user?.createdAt).fromNow()}
            </span>
          </div>
        </div>

        {/*-----------< Liên kết mạng xã hội >-----------*/}
        <div className='w-full flex flex-col gap-2 py-4 pb-6'>
          <p className='text-ascent-1 text-lg font-semibold'>Social Profile</p>
          <div className='flex gap-2 items-center text-ascent-2'>
            <BsFacebook className='text-xl text-ascent-1'></BsFacebook>
            <span>Facebook</span>
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <BsInstagram className='text-xl text-ascent-1'>
            </BsInstagram>
            <span>Instagram</span>
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <FaThreads className='text-xl text-ascent-1'>
            </FaThreads>
            <span>Thread</span>
          </div>
        </div>



      </div>
    </div>
  )
}

export default ProfileCard