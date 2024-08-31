import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { NoProfile } from '../assets';
import moment from 'moment';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { GoCommentDiscussion, GoShareAndroid } from 'react-icons/go';
import { MdOutlineDeleteOutline } from 'react-icons/md';


const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState([]);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const getComments = async () => {

  }

  return (
    <div className='mb-2 bg-primary p-4 shadown-sm border-b border-[#cccccc]'>
      <div className="flex gap-3 items-center mb-2">
        <Link to={"/profile/" + post?.userId?._id}>
          <img
            src={post?.userId?.profileUrl ?? NoProfile}
            alt={post?.userId?.firstName}
            className='w-14 h-14 object-cover rounded-full'
          />
        </Link>

        <div className='w-full flex justify-between'>
          <div className=''>
            <Link to={"/profile/" + post?.userId?._id}>
              <p className="font-medium text-lg text-ascent-1">
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
            </Link>
            <span className='text-ascent-1'>{post?.userId?.location}</span>
          </div>

          <span className='text-ascent-2'>
            {moment(post?.createdAt ?? "2024-8-31").fromNow()}
          </span>
        </div>
      </div>

      <div>
        {/* Content */}
        <p className="text-ascent-2">
          {showAll === post?._id
            ? post?.description
            : post?.description.slice(0, 300)}

          {post?.description?.length > 301 &&
            (showAll === post?._id
              ? (
                <span
                  className='text-blue ml-2 font-medium cursor-pointer'
                  onClick={() => setShowAll(0)}>Show less</span>
              )
              : (<span
                className='text-blue ml-2 font-medium cursor-pointer'
                onClick={() => setShowAll(post?._id)}>See more</span>)
            )}
        </p>

        {/* Post images */}
        {
          post?.image && (
            <img
              src={post?.image}
              alt="post image"
              className="w-full mt-2 rounded-lg"
            />
          )
        }
      </div>

      <div className='mt-4 px-3 py-4 text-ascent-2 text-base border-t border-[#66666645]'>
        {/* Reaction Overview */}
        <div className=''>
          <p className='flex gap-1 items-center text-base cursor-pointer'>
            {post?.likes?.includes(user?._id) ? (
              <div className='flex items-center'>
                <BiSolidLike size={20} color="#0766FF" className='mr-2' />
                <span>You and</span>
              </div>
            ) : (
              <BiLike size={20} />
            )}
            {post?.likes.length}
            {post?.likes?.includes(user?._id)
              ? (<span>others</span>)
              : (<span>likes</span>)
            }
          </p>

          <p className='flex gap-2 items-center text-base cursor-pointer'
            onClick={() => {
              setShowComments(showComments === post?._id ? null : post?._id);
              getComments(post?._id);
            }}
          ></p>

        </div>

        {/* Reaction Action */}
        <div className='mt-4 flex justify-between items-center px-3 py-4 text-ascent-2 text-base border-t border-[#66666645]'>
          <div className='flex items-center cursor-pointer'>
            <BiSolidLike size={20} color="#0766FF" className='mr-2' />
            <span>Liked</span>
          </div>


          <p className='flex gap-2 items-center text-base cursor-pointer'>
            <GoCommentDiscussion />
            {post?.comments?.length} comments
          </p>

          <p className='flex gap-2 items-center text-base cursor-pointer'>
            <GoShareAndroid />
            <span>Share</span>
          </p>

          {user?._id === post?.userId?._id && (
            <div
              className='flex items-center'
              onClick={() => deletePost(post?._id)}
            >
              <MdOutlineDeleteOutline size={20} />
              <span>Delete</span>
            </div>
          )}


        </div>



      </div>




    </div>
  )
}

export default PostCard