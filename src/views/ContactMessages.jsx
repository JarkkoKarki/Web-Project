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
      <h2 className="mb-4 text-2xl font-bold">
        {t('contactMessages.submitted-messages')}
      </h2>
      {messages.length === 0 ? (
        <p>{t('contactMessages.no-messages-found')}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">{t('contactMessages.email')}</th>
              <th className="p-2">{t('contactMessages.title')}</th>
              <th className="p-2">{t('contactMessages.description')}</th>
              <th className="p-2">{t('contactMessages.date')}</th>
              <th className="p-2">{t('contactMessages.action')}</th>
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
                      {t('contactMessages.delete')}
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
