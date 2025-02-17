import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPost(null);
  }

  return (
    <ModalContext.Provider value={{ isOpen, selectedPost, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

// export useModal hook
export const useModal = () => useContext(ModalContext);

// export default ModalContext