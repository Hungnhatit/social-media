import { PiMinusCircleFill } from 'react-icons/pi';
import { FaBookmark } from 'react-icons/fa';
import { MdCancelPresentation, MdDelete, MdEdit } from 'react-icons/md';
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { EditPost } from '../redux/postSlice';

const menuData = [
  { icon: <AiFillPlusCircle size={20} />, name: 'Interest' },
  { icon: <PiMinusCircleFill size={20} />, name: 'Not interest' },
  { icon: <MdCancelPresentation size={20} />, name: 'Hide post' },
  { icon: <FaBookmark size={20} />, name: 'Save post' },
];

const ownPostMenu = [
  { icon: <MdEdit size={20} />, name: 'Edit post' },
  { icon: <MdDelete size={20} />, name: 'Delete post' }
]

const PostMenuOption = ({ userId, postUserId }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className='w-52 absolute bg-white rounded-md shadow-2xl right-0 p-2'>
        <ul className=''>
          {menuData.map((item) => (
            <li key={item.name} className='flex items-center px-3 py-2 rounded-md hover:bg-[#F2F2F2]'>
              <span className='pr-2'>
                {item.icon}
              </span>
              {item.name}
            </li>
          ))}
          {userId === postUserId &&
            <li
              className='flex items-center px-3 py-2 rounded-md hover:bg-[#F2F2F2]'
              onClick={() => dispatch(EditPost(true))}
            >
              <span className='pr-2'>
                <MdEdit size={20} />
              </span>
              Edit post
            </li>

          }
        </ul>
      </div>
    </>
  )
}

export default PostMenuOption;