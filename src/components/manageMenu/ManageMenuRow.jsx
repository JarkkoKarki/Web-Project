import React from 'react';
import i18n from 'i18next';

const ManageMenuRow = ({item, onClick}) => {
  const lang = i18n.language;
  return (
    <tr
      onClick={() => onClick(item)}
      className="cursor-pointer transition-all hover:border-2 hover:border-yellow-500 hover:bg-[#2a2c2b]"
    >
      <td className="px-6 py-3">{item[`name_${lang}`]}</td>
      <td className="px-6 py-3">{item[`desc_${lang}`]}</td>
      <td className="px-6 py-3">{item.price}</td>
    </tr>
  );
};

export default ManageMenuRow;
