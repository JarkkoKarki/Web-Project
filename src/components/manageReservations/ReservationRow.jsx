import React from 'react';

const ReservationRow = ({item, onClick}) => {
  return (
    <tr
      onClick={() => onClick(item)}
      className="cursor-pointer transition-all hover:border-2 hover:border-yellow-500 hover:bg-[#2a2c2b]"
    >
      <td className="px-6 py-3">{item.table_id}</td>
      <td className="px-6 py-3">{item.people_count}</td>
      <td className="px-6 py-3">{item.reservation_date}</td>
      <td className="px-6 py-3">{item.reservation_time}</td>
    </tr>
  );
};

export default ReservationRow;
