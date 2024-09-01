import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { NoProfile } from '../assets';
import moment from 'moment';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { GoCommentDiscussion, GoShareAndroid } from 'react-icons/go';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FcLike } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { Loading, TextInput } from '../components';
import { FaCircleArrowUp } from 'react-icons/fa6';
import { postComments } from '../assets/data';

// Comment form
const CommentForm = ({ user, id, replyAt, getComments }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors } } = useForm({
      mode: "onChange"
    });

  const onSubmit = async (data) => { };

  return (
    <form
      className='w-full border-b border-[#66666645]'
      onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full flex items-center gap-2 py-4'>
        <img
          src={user?.profileUrl ?? NoProfile}
          alt="User Image"
          className='w-10 h-10 rounded-full object-cover'
        />
        <TextInput
          name="comment"
          styles="w-full rounded-full py-3"
          placeholder={replyAt ? `Reply @${replyAt}` : "Write a comment..."}
          register={register("comment", {
            required: "Comment can not be empty",
          })}
          error={errors.comment ? errors.comment.message : ""}
        >
        </TextInput>
        <div className='flex items-center '>
          {loading ? (
            <Loading />
          ) : (
            <FaCircleArrowUp className='cursor-pointer' size={28} color="#0766FF" />
          )}
        </div>
      </div>

      {errMsg?.message && (
        <span
          role='alert'
          className={`text-sm ${errMsg?.status === "failed"
            ? "text-[#f64949fe]"
            : "text-[#2ba150fe]"
            } mt-0.5`}
        >
          {errMsg?.message}
        </span>
      )}
    </form>
  )
};

// Reply card
const ReplyCard = ({ reply, user, handleLike }) => {
  return (
    <div className='w-full py-3'>
      <div className=' flex gap-3 items-center mb-1'>
        <Link to={"/profile/" + reply?.userid?._id}>
          <img
            src={reply?.userId?.profileUrl ?? NoProfile}
            alt={reply?.userId?.firstName}
            className='w-10 h-10 rounded-full object-cover'
          />
        </Link>

        <div className=''>
          <Link to={"/profile/" + reply?.userId?._id}>
            <p className='font-medium text-base text-ascent-1'>
              {reply?.userId?.firstName} {reply?.userId?.lastName}
            </p>
          </Link>
          <span className='text-ascent-2 text-sm'>
            {moment(reply?.createdAt ?? "2023-05-10").fromNow()}
          </span>
        </div>
      </div>

      <div className='ml-12'>
        <p className='text-ascent-2'>{reply?.comment}</p>
        <div className='mt-2 flex gap-6'>
          <p
            className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'
            onClick={handleLike}
          >
            {reply?.likes?.includes(user?._id) ? (
              <BiSolidLike size={20} color="blue"></BiSolidLike>
            ) : (
              <BiLike size={20}></BiLike>
            )}
            {reply?.likes?.length} Likes
          </p>
        </div>
      </div>


    </div>
  )
}


// ----------<  Post Container  >----------
const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);

  const getComments = async () => {
    setReplyComments(0);
    setComments(postComments);
    setLoading(false);
  }

  const handleLike = async () => {

  }

  console.log(comments);

  return (
    <div className='mb-2 bg-primary p-4 shadown-sm border-b border-[#cccccc] rounded-lg'>
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
                <BiSolidLike size={20} color="#0766FF" className='' />
                <FcLike size={20} />
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

          ></p>

        </div>

        {/* Action */}
        <div className='mt-4 flex justify-between items-center px-3 py-4 text-ascent-2 text-base border-t border-[#66666645]'>
          <div className='flex items-center cursor-pointer'>
            <BiSolidLike size={20} color="#0766FF" className='mr-2' />
            <span>Liked</span>
          </div>

          <p
            className='flex gap-2 items-center text-base cursor-pointer'
            onClick={() => {
              setShowComments(showComments === post._id ? null : post._id);
              getComments(post?._id);
            }}>
            <GoCommentDiscussion size={20} />
            {post?.comments?.length} comments
          </p>

          <p className='flex gap-2 items-center text-base cursor-pointer'>
            <GoShareAndroid />
            <span>Share</span>
          </p>

          {user?._id === post?.userId?._id && (
            <div
              className='flex items-center cursor-pointer'
              onClick={() => deletePost(post?._id)}
            >
              <MdOutlineDeleteOutline size={20} />
              <span>Delete</span>
            </div>
          )}
        </div>
      </div>

      {/* Comment Section */}
      {
        showComments === post?._id && (
          <div className='w-full mt-4 border-t border-[#66666645] pt-4'>
            <CommentForm
              user={user}
              id={post?._id}
              getComments={() => getComments(post?._id)}
            />

            {loading ?
              (<Loading />) : comments?.length > 0 ? (
                comments?.map((comment) => (
                  //  Comment Container
                  <div className='w-full py-2' key={comment?._id}>
                    <div className='flex gap-3 items-center mb-1'>
                      <Link to={"/profile/" + comment?.userId?._id}>
                        <img
                          src={comment?.userId?.profileUrl ?? NoProfile}
                          alt={comment?.userId?.firstName}
                          className="h-10 w-10 roundeful object-cover"
                        />
                      </Link>
                      <div className=''>
                        <Link to={"/profile/" + comment?.userId?._id}>
                          <p className='font-medium text-base text-ascent'>
                            {comment?.userId?.firstName} {comment?.userId?.lastName}
                          </p>
                        </Link>
                        <span className='text-ascent-2 text-sm'>
                          {moment(comment?.createdAt ?? "2024-9-01").fromNow()}
                        </span>
                      </div>
                    </div>

                    <div className='ml-12'>
                      <p className='text-ascent-2'>{comment?.comment}</p>

                      <div className='flex mt-2 gap-6'>
                        <p className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'>
                          {""}
                          {comment?.likes.includes(user?._id) ? (
                            <BiSolidLike size={20} color="blue"></BiSolidLike>
                          ) : (<BiSolidLike size={20}></BiSolidLike>)}
                          {comments?.likes?.length}Likes
                        </p>
                        <span
                          className='text-blue cursor-pointer'
                          onClick={() => setReplyComments(comment?._id)}>
                          Reply
                        </span>
                      </div>

                      {replyComments === comment?._id && (
                        <CommentForm
                          user={user}
                          id={comment?._id}
                          replyAt={comment?.from}
                          getComments={() => getComments(post?._id)}
                        />
                      )}

                    </div>

                    {/* Reply comments */}
                    <div className='py-2 px-8 mt-6'>
                      {comment?.replies.length > 0 && (
                        <p
                          className='text-base text-ascent-2 cursor-pointer'
                          onClick={() => {
                            setShowReply(
                              showReply === comment?.replies?._id
                                ? 0
                                : comment?.replies?._id
                            )
                          }}
                        >
                          View more comments
                        </p>
                      )}

                      {showReply === comment?.replies._id && (
                        comment?.replies?.map((reply) => (
                          <ReplyCard
                            reply={reply}
                            user={user}
                            key={reply?._id}
                            handleLike={() =>
                              "/posts/like-comment/"
                              + comment?._id
                              + "/"
                              + reply?._id
                            }
                          ></ReplyCard>
                        ))
                      )}
                    </div>




                  </div>
                ))
              ) : (
                <span className='flex text-sm py-4 text-ascent-2 text-center'>
                  No comments yet. Be the first to comment.
                </span>
              )}
          </div>

        )}



    </div>
  )
}

export default PostCard