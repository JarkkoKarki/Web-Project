import {useState} from 'react';
import {fetchData} from '../../utils/fetchData';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    try {
      await fetchData('', {
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
    <div className="mx-auto mt-20 max-w-md rounded-lg bg-gray-100 p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold text-black">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-semibold text-black">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            type="email"
            className="w-full rounded-lg border border-gray-300 p-3 text-black"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-semibold text-black">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Subject"
            className="w-full rounded-lg border border-gray-300 p-3 text-black"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-semibold text-black">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Message"
            rows="5"
            className="w-full rounded-lg border border-gray-300 p-3 text-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-yellow-500 p-3 font-bold text-black hover:bg-yellow-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
