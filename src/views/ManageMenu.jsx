import AddMenuForm from '../components/manageMenu/AddMenuForm.jsx';
import useMenu from '../components/hooks/menuHooks.js';
import ManageMenuRow from '../components/manageMenu/ManageMenuRow.jsx';
import {useTranslation} from 'react-i18next';
import ModifyMenuForm from '../components/manageMenu/ModifyMenuForm.jsx';
import {useEffect, useState} from 'react';

const ManageMenu = () => {
  const {menuArray, getMenuBothLanguages} = useMenu();
  const [selectedItem, setSelectedItem] = useState(null);
  const {t} = useTranslation();

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    getMenuBothLanguages()
  }, []);

  return (
    <>
      <div>
        <AddMenuForm onSuccess={getMenuBothLanguages} />
        <h1 className="mb-4 text-center text-3xl font-semibold text-yellow-500">
          {t('manageMenu.modify-menu-title')}
        </h1>
        {selectedItem ? (
          <ModifyMenuForm
            item={selectedItem}
            setSelectedItem={setSelectedItem}
            onSuccess={getMenuBothLanguages}
          />
        ) : (
          <div className="p-8">
            <table className="min-w-full table-auto border border-[#2a2c2b] p-8">
              <thead>
              <tr>
                <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                  {t('manageMenu.menu-td-name')}
                </th>
                <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                  {t('manageMenu.menu-td-desc')}
                </th>
                <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                  {t('manageMenu.menu-item-price')}
                </th>
              </tr>
              </thead>
              <tbody>
              {menuArray.map((item) => (
                <ManageMenuRow
                  key={item.id}
                  item={item}
                  onClick={handleClick}
                />
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageMenu;
