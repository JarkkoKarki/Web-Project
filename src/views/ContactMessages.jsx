import React, {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();
  const [messages, setMessages] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

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
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== id),
      );
      setSelectedMessage(null); // exit detail view after delete
    }
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  const displayedMessages = showAll ? messages : messages.slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center bg-[#0d0f0e] p-4 text-white">
      <h2 className="mb-4 text-2xl font-bold">
        {t('contactMessages.submitted-messages')}
      </h2>

      {selectedMessage ? (
        <div className="rounded-md bg-[#1a1c1b] p-4 shadow-md">
          <h3 className="text-xl font-semibold">
            {t('contactMessages.title')}: {selectedMessage.title}
          </h3>
          <p>
            {t('contactMessages.email')}: {selectedMessage.email}
          </p>
          <p>
            {t('contactMessages.description')}: {selectedMessage.description}
          </p>
          <p>
            {t('contactMessages.date')}:{' '}
            {new Date(selectedMessage.created_at).toLocaleString()}
          </p>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="bg-yellow-500 px-4 py-2 font-bold text-black"
              onClick={() => handleDelete(selectedMessage.id)}
            >
              {t('contactMessages.delete')}
            </button>
            <button
              className="bg-[#2b2e2c81] px-4 py-2 text-black"
              onClick={() => setSelectedMessage(null)}
            >
              {t('contactMessages.cancel')}
            </button>
          </div>
        </div>
      ) : (
        displayedMessages.map((msg, index) => (
          <div
            key={msg.contact_id || index}
            className="mb-4 cursor-pointer rounded-md bg-[#1a1c1b] p-4 shadow-md hover:bg-gray-700"
            onClick={() => handleMessageClick(msg)}
          >
            <p>{msg.title}</p>
            <p>{msg.email}</p>
            <p>{new Date(msg.created_at).toLocaleString()}</p>
          </div>
        ))
      )}

      {!selectedMessage && messages.length > 5 && (
        <button
          className="mt-6 inline-block cursor-pointer border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? t('contactMessages.view-less')
            : t('contactMessages.view-more')}
        </button>
      )}
    </div>
  );
};

export default ContactMessages;
