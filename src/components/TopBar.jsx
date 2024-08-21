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

  }



  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary">
      <Link to='/' className='flex gap-2 items-center'>
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
          styles='w-[18rem] lg:w-[38rem] rounded-l-full py-3'
          register={register('search')}
        ></TextInput>
        <CustomButton
          title='Search'
          type='submit'
          containerStyles='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full'
        ></CustomButton>
      </form>

      {/* Icons */}
      <div className="flex gap-4 items-center text-ascent-1 text-sm md:text-xl ">
        <button onClick={() => handleTheme()}>{theme ? <PiCloudSunBold /> : <FaRegMoon />}</button>
        <div className="hidden lg:flex">
          <IoNotifications></IoNotifications>
        </div>
        <div className="hidden lg:flex">
          <FaUserAlt></FaUserAlt>
        </div>
      </div>

      <div>
        <CustomButton
          onClick={() => dispatch(UserLogout())}
          title='Log out'
          containerStyles='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full'
        ></CustomButton>
      </div>





    </div>)
}
export default TopBar