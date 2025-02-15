import React from 'react'
import { useModal } from '../context/ModalContext';
import PostDetail from './post/PostDetail';

const ModalWrapper = () => {
  const { isOpen, selectedPost, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 top-0 w-full h-full">
      <PostDetail postId={selectedPost} />
    </div>
  )
}

export default ModalWrapper