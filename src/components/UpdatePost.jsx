import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { EditPost } from "../redux/postSlice.js";

const UpdatePost = ({ user }) => {
  const { posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const userPost = posts.filter((p) => p.userId._id === user._id);

  const handleClose = () => {
    dispatch(EditPost(false));
  }

  const onSubmit = () => {

  }

  console.log(userPost);
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
              onSubmit={() => { }}
            >


            </form>


          </div>



        </div>





      </div>
    </>
  )
}

export default UpdatePost;