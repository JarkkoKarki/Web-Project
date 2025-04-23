import React from 'react';

const Reservation = () => {
  return (<div className="px-8 py-12">
  <h2 className="text-3xl font-bold mb-6 text-center">Book Your Table</h2>
  <form
    action="#"
    method="POST"
    className="max-w-lg mx-auto bg-[#1a1c1b] p-6 rounded-lg shadow-lg space-y-4">

    <div>
      <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
      <input
        type="date"
        id="date"
        name="date"
        className="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
        required
      />
    </div>

    <div>
      <label htmlFor="time" className="block text-sm font-medium mb-2">Time</label>
      <input
        type="time"
        id="time"
        name="time"
        className="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
        required
      />
    </div>

    <div>
      <label htmlFor="party-size" className="block text-sm font-medium mb-2"
        >Party Size</label>
      <select
        id="party-size"
        name="party-size"
        className="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
        required
      >
        <option value="1">1 Person</option>
        <option value="2">2 People</option>
        <option value="3">3 People</option>
        <option value="4">4 People</option>
        <option value="5">5 People</option>
        <option value="6">6 People</option>
        <option value="7">7 People</option>
        <option value="8">8+ People</option>
      </select>
    </div>

    <div>
      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        className="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
        placeholder="Your Name"
        required
      />
    </div>

    <div>
      <label htmlFor="phone" className="block text-sm font-medium mb-2"
        >Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        className="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
        placeholder="Your Phone Number"
        required
      />
    </div>

    <div>
      <label htmlFor="requests" className="block text-sm font-medium mb-2"
        >Special Requests</label>
      <textarea
        id="requests"
        name="requests"
        rows="3"
        className="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
        placeholder="Any special requests? (Optional)"
      ></textarea>
    </div>


    <div>
      <button
        type="submit"
        className="w-full bg-yellow-500 text-black py-2 rounded font-medium hover:bg-yellow-600 transition"
      >
        Reserve Now
      </button>
    </div>
  </form>


  <div
    id="confirmation-message"
    className="hidden mt-6 text-center text-green-500 font-medium"
  >
    Your reservation is confirmed! We look forward to seeing you.
  </div>
</div>
)
};

export default Reservation;
