import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import { FaRegMoon, FaSun, FaUserAlt } from "react-icons/fa";
import { PiCloudSunBold } from "react-icons/pi";
import { IoNotifications } from "react-icons/io5";
import { SetTheme } from "../redux/theme";
import { UserLogout } from "../redux/userSlice";
import { fetchPosts } from "../utils";
import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown.jsx";

const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Đổi theme sáng tối
  const handleTheme = () => {
    const themeValue = theme === 'light' ? "dark" : 'light';
    dispatch(SetTheme(themeValue));
  }

  const handleSearch = async (data) => {
    await fetchPosts(user.token, dispatch, "", data);
  }

  //-------------< User dropdown menu >-------------
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);
  const menuItems = [
    { label: 'Profile', handleEvent: () => window.location.replace("/profile/" + user._id) },
    { label: 'Log out', handleEvent: () => dispatch(UserLogout()) },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  // Listen mouse click event
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="z-1 topbar w-full flex items-center justify-between py-3 md:py-3 px-10 bg-primary">
      <Link to='/' className='w-1/4 flex gap-2 items-center'>
        <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
          <TbSocial></TbSocial>
        </div>
        <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
          OpenSpace
        </span>
      </Link>

      <form
        className="hidden md:flex items-center justify-center"
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder="Search"
          styles='w-[18rem] lg:w-[38rem] rounded-l-full py-3 mt-2'
          register={register('search')}
        ></TextInput>
        <CustomButton
          title='Search'
          type='submit'
          containerStyles='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full'
        ></CustomButton>
      </form>

      {/* Icons */}
      <div className="w-1/5 flex gap-10 items-center justify-end text-ascent-1 text-sm md:text-xl ">
        <button onClick={() => handleTheme()}>{theme ? <PiCloudSunBold /> : <FaRegMoon />}</button>
        <div className="hidden lg:flex">
          <IoNotifications></IoNotifications>
        </div>
        {/* User - Dropdown menu */}
        <div
          ref={dropDownRef}
          className="hidden lg:flex cursor-pointer relative transition ease-linear"
          onClick={toggleDropdown}
        >
          <FaUserAlt></FaUserAlt>
          <Dropdown
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            menuItems={menuItems}
            position="right-0 top-6"
            handleEvent={menuItems.handleEvent}
          ></Dropdown>
        </div>

      </div>

      {/* <div>
        <CustomButton
          onClick={() => dispatch(UserLogout())}
          title='Log out'
          containerStyles='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full'
        ></CustomButton>
      </div> */}
    </div>)
}
export default TopBar