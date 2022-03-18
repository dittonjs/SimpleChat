import { useState, useEffect } from 'react';
import { AuthContext } from '../../utils/auth_context';
import { io } from 'socket.io-client';

export const ChatRoom = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [authToken] = useContext(AuthContext);
  const { id } = useParams();

  useEffect(async () => {
    const { user } = await api.get('/users/me');
    setUser(user);
    const { chatRoom } = await api.get(`/chat_rooms/${id}`);
    setChatRoom(chatRoom);
  }, []);

  useEffect(() => {
    if (chatRoom) {

    }
  }, [chatRoom]);
  return 'Hello, world!';
};
