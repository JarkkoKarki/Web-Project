import React, {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const deleteContactMessage = async (id) => {
  try {
    const response = await fetch(`http://10.120.32.87/app/api/contact/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      return true;
    } else {
      alert(result.message || 'Failed to delete message');
      return false;
    }
  } catch (error) {
    console.error('Error deleting message:', error);
    alert('Failed to delete message');
    return false;
  }
};

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchData('http://10.120.32.87/app/api/contact/');
        console.log('Fetched data:', data);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching contact messages:', error.message);
      }
    };

    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      console.error('ID is undefined');
      return;
    }
    const success = await deleteContactMessage(id);
    if (success) {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

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
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => {
              console.log(msg);
              return (
                <tr
                  key={msg.contact_id || index}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-2">{msg.email}</td>
                  <td className="p-2">{msg.title}</td>
                  <td className="p-2">{msg.description}</td>
                  <td className="p-2">
                    {new Date(msg.created_at).toLocaleString()}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => {
                        console.log('Deleting message with id:', msg.id);
                        handleDelete(msg.id);
                      }}
                      className="rounded bg-red-600 px-4 py-1 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactMessages;
