import React, { useEffect, useState } from 'react'
import { RiMessage3Line } from "react-icons/ri";
import { IoClose } from 'react-icons/io5';
import moment from 'moment';
import { useModal } from '../../context/ModalContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaRegMessage } from 'react-icons/fa6';
import { fetchPosts, likePost } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';

const PostDetail = ({ postId }) => {
  const { user, edit } = useSelector((state) => state.user);
  const { isOpen, selectedPost, openModal, closeModal } = useModal();
  // get post id from url
  // const { id } = useParams();
  // const [post, setPost] = useState(null);
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const res = await getPost(id || postId);
  //     setPost(res.data);
  //   }
  //   fetchPost();
  // }, [id]);
  const dispatch = useDispatch();

  const handleLike = async (uri) => {
    await likePost({ uri: uri, token: user?.token });
    await fetchPosts(user?.token, dispatch);
  }

  return (
    <div className='flex mx-auto min-h-screen items-center justify-center w-10/12'>
      <div className='fixed inset-0 transition-opacity'>
        <div className='absolute inset-0 bg-[#000] opacity-70'></div>
      </div>

      <div className='relative items-center z-10 px-4 py-5 bg-white justify-center'>
        <div className='flex'>
          <div className='w-1/3'>
            <img
              src={selectedPost?.image}
              alt=""
              className='w-full' />
          </div>

          {/* post content */}
          <div className='w-2/3 px-8 py-2'>
            <div className='border-b border-[#dedcdc] pb-2 mb-2'>
              <div className='flex mb-2'>
                <img src={selectedPost?.userId?.profileUrl} alt="" className='w-10 h-10 mr-3' />
                <div className='flex flex-col'>
                  <p className='font-bold'>{selectedPost?.userId?.firstName} {selectedPost?.userId?.lastName}</p>
                  <span className='text-[13px]'>{moment(selectedPost?.createdAt ?? "2024-8-31").fromNow()}</span>
                </div>
              </div>
              {selectedPost?.description}
            </div>

            {/* post detail action */}
            <div className=''>
              <div className='flex items-center'>
                <div
                  onClick={() => handleLike('/posts/like/' + postId?._id)}>
                  {postId?.likes.includes(user?._id)
                    ? (<FaHeart size={18} color='red' className='cursor-pointer mr-2' />)
                    : (<FaRegHeart size={18} className='cursor-pointer mr-2' />)}
                </div>

                <RiMessage3Line size={20} className='cursor-pointer mr-2' />
              </div>

              <div className='text-[15px]'>
                {postId?.likes.includes(user?._id)
                  ? (
                    <span>You and {postId?.likes.length - 1} others</span>
                  )
                  : (<span>{postId?.likes.length} likes</span>)
                }
              </div>



            </div>


          </div>
        </div>

        {/*handle close modal */}
        <button
          className='absolute top-[8px] right-[8px]'
          onClick={closeModal}>
          <IoClose size={32} />
        </button>
      </div>
    </div>
  )
}

export default PostDetail