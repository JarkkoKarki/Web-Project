import AddMenuForm from '../components/manageMenu/AddMenuForm.jsx';
import useMenu from '../components/hooks/menuHooks.js';
import ManageMenuRow from '../components/manageMenu/ManageMenuRow.jsx';
import {useTranslation} from 'react-i18next';
import ModifyMenuForm from '../components/manageMenu/ModifyMenuForm.jsx';
import {useState} from 'react';

const ManageMenu = () => {
  const {fullMenuArray, getMenu} = useMenu();
  const [selectedItem, setSelectedItem] = useState(null);
  const {t} = useTranslation();

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <div>
        <AddMenuForm onSuccess={getMenu} />
        <h1 className="mb-4 text-center text-3xl font-semibold text-yellow-500">
          Modify or Delete Menu Items
        </h1>
        {selectedItem ? (
          <ModifyMenuForm
            item={selectedItem}
            setSelectedItem={setSelectedItem}
            onSuccess={getMenu}
          />
        ) : (
          <div className="p-8">
            <table className="min-w-full table-auto border border-[#2a2c2b] p-8">
              <thead>
                <tr>
                  <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                    {t('manageMenu.menu-item-name')}
                  </th>
                  <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                    {t('manageMenu.menu-item-description')}
                  </th>
                  <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                    {t('manageMenu.menu-item-price')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {fullMenuArray.map((item) => (
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
