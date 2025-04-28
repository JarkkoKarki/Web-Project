import React from 'react';

const WorkHubMenuRow = ({ item, onClick }) => {
  return (
    <tr
      onClick={() => onClick(item)}
      className="cursor-pointer hover:bg-[#2a2c2b] hover:border-yellow-500 hover:border-2 transition-all"
    >
      <td className="px-6 py-3">{item.name}</td>
      <td className="px-6 py-3">{item.description}</td>
      <td className="px-6 py-3">{item.price}</td>
    </tr>
  );
};

export default WorkHubMenuRow;
