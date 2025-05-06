import React, {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchData('http://10.120.32.87/app/api/contact/');
        setMessages(data);
      } catch (error) {
        console.error('Error fetching contact messages:', error.message);
      }
    };

    loadMessages();
  }, []);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Submitted Contact Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Email</th>
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{msg.email}</td>
                <td className="p-2">{msg.title}</td>
                <td className="p-2">{msg.description}</td>
                <td className="p-2">
                  {new Date(msg.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactMessages;
