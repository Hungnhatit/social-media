import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Dropdown = ({
  isOpen, toggleDropdown, menuItems, position, handleEvent
}) => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className={`absolute inline-block text-left ${position}`}>
      {isOpen && (
        <div
          className="mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
        >
          <div className="py-1" role="none">
            {menuItems.map((item, index) => (
              <a
                onClick={item?.handleEvent ?? ""}
                key={index}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-bgColor"
                role="menuitem"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>

  )
}

export default Dropdown