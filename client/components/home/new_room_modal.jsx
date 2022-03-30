import { useState } from 'react';
import { Button } from '../common/button';

export const NewRoomModal = ({ createRoom, closeModal }) => {
  const [name, setName] = useState('');

  return (
    <>
      <div className="overlay" onClick={closeModal} />
      <div className="modal-container">
        <div className="modal">
          <span className="title">Create New Chat Room</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="button-container">
            <Button onClick={closeModal}>Close</Button>
            <Button onClick={() => createRoom(name)}>Create</Button>
          </div>
        </div>
      </div>
    </>
  );
};
