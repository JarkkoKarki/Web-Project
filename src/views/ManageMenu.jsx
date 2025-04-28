import AddMenuForm from '../components/forms/AddMenuForm.jsx';
import useMenu from '../components/hooks/menuHooks.js';
import WorkHubMenuRow from '../components/WorkHubMenuRow.jsx';
import {useTranslation} from 'react-i18next';
import ModifyMenuForm from '../components/forms/ModifyMenuForm.jsx';
import {useState} from 'react';


const ManageMenu = () => {
  const { fullMenuArray } = useMenu();
  const [selectedItem, setSelectedItem] = useState(null);
  const {t} = useTranslation();

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <div>
        <AddMenuForm />
        <h1 className="text-3xl font-semibold text-yellow-500 mb-4 text-center">
          Modify or Delete Menu Items
        </h1>
        {selectedItem ? (
          <ModifyMenuForm item={selectedItem} setSelectedItem={setSelectedItem} />
        ) : (
          <>
        <table className="min-w-full table-auto border border-[#2a2c2b]">
          <thead>
          <tr>
            <th className="px-6 py-3 text-left text-lg border-b-2 border-yellow-500">{t('manageMenu.menu-item-name')}</th>
            <th className="px-6 py-3 text-left text-lg border-b-2 border-yellow-500">{t('manageMenu.menu-item-description')}</th>
            <th className="px-6 py-3 text-left text-lg border-b-2 border-yellow-500">{t('manageMenu.menu-item-price')}</th>
          </tr>
          </thead>
          <tbody>
          {fullMenuArray.map((item) => (
            <WorkHubMenuRow
              key={item.id}
              item={item}
              onClick={handleClick}
            />
          ))}
          </tbody>
        </table>
          </>
          )}
      </div>
    </>
  );
};

export default ManageMenu;
