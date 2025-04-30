import React from 'react';

const WorkHubMenuRow = ({item, onClick}) => {
  return (
    <tr
      onClick={() => onClick(item)}
      className="cursor-pointer transition-all hover:border-2 hover:border-yellow-500 hover:bg-[#2a2c2b]"
    >
      <td className="px-6 py-3">{item.name}</td>
      <td className="px-6 py-3">{item.description}</td>
      <td className="px-6 py-3">{item.price}</td>
    </tr>
  );
};

export default WorkHubMenuRow;
