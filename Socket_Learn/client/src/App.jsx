import React, { useEffect, useState } from 'react';
import socket from './socket'; // import shared socket

const App = () => {
  const [socketId, setSocketId] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');

  const joinRoom = () => {
    if (room.trim() !== '') {
      socket.emit('join-room', room);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== '' && room.trim() !== '') {
      socket.emit('message', { message, room });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected:', socket.id);
      setSocketId(socket.id);
    });

    socket.on('receive-message', (data) => {
      console.log('Received:', data);
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup
    return () => {
      socket.off('receive-message');
      socket.off('connect');
    };
  }, []);

  return (
    <div className="p-3 bg-dark text-white" style={{ minHeight: '100vh' }}>
      <h3>Your Socket ID: {socketId}</h3>

      <input
        className="form-control mt-2"
        placeholder="Room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={joinRoom}>
        Join Room
      </button>

      <input
        className="form-control mt-3"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn btn-success mt-2" onClick={sendMessage}>
        Send Message
      </button>

      <h4 className="mt-4">Messages</h4>
      <div className="border p-2 bg-secondary">
        {messages.map((m, i) => (
          <div key={i} className="mb-1">
            {m}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
