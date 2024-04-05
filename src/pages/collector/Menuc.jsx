// Menu.jsx
import React, { useState } from 'react';
import Modalc from './Modalc';
const Menuc = ({ onNerset }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    onNerset(); // Call the provided callback function
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <Modalc isModalOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Menuc;
