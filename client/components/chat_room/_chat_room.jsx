import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../utils/auth_context';
import { ApiContext } from '../../utils/api_context';
import { io } from 'socket.io-client';
import { Button } from '../common/button';

export const ChatRoom = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [contents, setContents] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [authToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const { id } = useParams();

  useEffect(async () => {
    const { user } = await api.get('/users/me');
    setUser(user);
    const { chatRoom } = await api.get(`/chat_rooms/${id}`);
    setChatRoom(chatRoom);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (chatRoom) {
      const socket = io({
        auth: {
          token: authToken,
        },
        query: {
          chatRoomId: chatRoom.id,
        },
      });
      setSocket(socket);
      socket.on('message', (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [chatRoom]);

  if (loading) return 'Loading...';

  const sendMessage = () => {
    socket.emit('message', {
      contents,
      userName: `${user.firstName} ${user.lastName}`,
    });
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <h3>{message.userName}</h3>
            {message.contents}
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={contents} onChange={(e) => setContents(e.target.value)} />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};
