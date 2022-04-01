import { useState } from 'react';
import { Button } from '../common/button';

export const NewRoomModal = ({ createRoom, closeModal }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const save = () => {
    if (name === '') {
      setError(true);
      return;
    }
    createRoom(name);
  };

  return (
    <>
      <div className="overlay" onClick={closeModal}>
        <div className="modal-container">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <span className="title">Create New Chat Room</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="button-container">
              <Button onClick={closeModal}>Close</Button>
              <Button onClick={save}>Create</Button>
            </div>
            {error && <div>Name cannot be blank</div>}
          </div>
        </div>
      </div>
    </>
  );
};
