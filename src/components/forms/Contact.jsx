import {useState} from 'react';
import {fetchData} from '../../utils/fetchData';
import {useTranslation} from 'react-i18next';
import {url} from '../../utils/variables';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {t} = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');

    try {
      await fetchData(url + '/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId, email, title, description}),
      });
      alert('Message sent!');
      setEmail('');
      setTitle('');
      setDescription('');
    } catch (error) {
      alert('Failed to send message: ' + error.message);
    }
  };
  return (
    <div className="mb-10 flex w-4/5 items-center justify-center">
      <div className="mt-20 flex w-full flex-col items-center justify-center rounded-md border border-gray-300 bg-[#0d0f0e] p-4 shadow-md md:w-1/3">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          {t('contact.contact')}
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4 px-6">
          <div>
            <label className="mb-1 block font-semibold text-white">
              {t('contact.your-e')}
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('contact.your-e')}
              type="email"
              className="w-full rounded-lg border border-gray-300 p-3 text-white"
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-white">
              {t('contact.title')}
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('contact.subject')}
              className="w-full rounded-lg border border-gray-300 p-3 text-white"
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-white">
              {t('contact.desc')}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('contact.message')}
              rows="5"
              className="w-full rounded-lg border border-gray-300 p-3 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-500 p-3 font-bold text-white hover:bg-yellow-600"
          >
            {t('contact.send')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
