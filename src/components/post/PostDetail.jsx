import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getPost } from '../../utils';
import { IoClose } from 'react-icons/io5';
import moment from 'moment';
import { useModal } from '../../context/ModalContext';

const PostDetail = ({ postId }) => {
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

  const { isOpen, selectedPost, openModal, closeModal } = useModal();

  console.log(isOpen)

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

            <div className='flex mb-2'>
              <img src={selectedPost?.userId?.profileUrl} alt="" className='w-10 h-10 mr-3' />

              <div className='flex flex-col'>
                <p className='font-bold'>{selectedPost?.userId?.firstName} {selectedPost?.userId?.lastName}</p>
                <span className='text-[13px]'>{moment(selectedPost?.createdAt ?? "2024-8-31").fromNow()}</span>
              </div>
            </div>


            {selectedPost?.description}
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