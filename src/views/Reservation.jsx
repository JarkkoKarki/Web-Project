import React from 'react';

const Reservation = () => {
  return <div className="px-8 py-12">
  <h2 class="text-3xl font-bold mb-6 text-center">Book Your Table</h2>
  <form
    action="#"
    method="POST"
    class="max-w-lg mx-auto bg-[#1a1c1b] p-6 rounded-lg shadow-lg space-y-4">

    <div>
      <label for="date" class="block text-sm font-medium mb-2">Date</label>
      <input
        type="date"
        id="date"
        name="date"
        class="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
        required
      />
    </div>

    <div>
      <label for="time" class="block text-sm font-medium mb-2">Time</label>
      <input
        type="time"
        id="time"
        name="time"
        class="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
        required
      />
    </div>

    <div>
      <label for="party-size" class="block text-sm font-medium mb-2"
        >Party Size</label>
      <select
        id="party-size"
        name="party-size"
        class="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
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
      <label for="name" class="block text-sm font-medium mb-2">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        class="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
        placeholder="Your Name"
        required
      />
    </div>

    <div>
      <label for="phone" class="block text-sm font-medium mb-2"
        >Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        class="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
        placeholder="Your Phone Number"
        required
      />
    </div>

    <div>
      <label for="requests" class="block text-sm font-medium mb-2"
        >Special Requests</label>
      <textarea
        id="requests"
        name="requests"
        rows="3"
        class="w-full p-2 rounded bg-[#0d0f0e] border border-gray-700 text-white"
        placeholder="Any special requests? (Optional)"
      ></textarea>
    </div>


    <div>
      <button
        type="submit"
        class="w-full bg-yellow-500 text-black py-2 rounded font-medium hover:bg-yellow-600 transition"
      >
        Reserve Now
      </button>
    </div>
  </form>


  <div
    id="confirmation-message"
    class="hidden mt-6 text-center text-green-500 font-medium"
  >
    Your reservation is confirmed! We look forward to seeing you.
  </div>
</div>;
};

export default Reservation;
