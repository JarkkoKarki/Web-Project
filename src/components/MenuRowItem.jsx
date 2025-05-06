import {toUpper} from 'lodash';
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useShoppingCart} from '../contexts/ShoppingCartContext';
import {useUserContext} from './hooks/contextHooks';

const MenuItem = ({item}) => {
  const {t} = useTranslation();
  const {addItemToCart} = useShoppingCart();
  const {user} = useUserContext();

  const handleAddToCart = () => {
    if (addItemToCart) {
      addItemToCart(item);
      toast.success(`${item.name} ${t('menuPage.add-to-cart-prompt')}`, {
        position: 'top-left',
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="menu-item flex items-center justify-between rounded-md border-b-1 border-b-gray-800 bg-[#1c1e24] p-4">
      <div className="flex h-full w-1/2 flex-col flex-wrap justify-between">
        <h4 className="text-lg font-bold text-white">{toUpper(item.name)}</h4>
        <p className="mt-2 text-sm text-gray-400">{item.description}</p>
        <div className="flex items-center space-x-2 py-2">
          <p className="text-sm font-medium">{t('menuPage.diets')}</p>
          <p className="text-sm text-gray-400">
            {Array.isArray(item.diets) ? item.diets.join(', ') : item.diets}
          </p>
        </div>
        <p className="mt-auto font-bold text-yellow-400">${item.price}</p>
      </div>
      <div className="ml-4 flex flex-col items-center md:flex-row">
        <img
          className="h-20 w-20 rounded-md object-cover"
          src={item.src}
          alt={item.name}
        />

        {addItemToCart && user && location.pathname !== '/' ? (
          <button
            className="mt-2 w-full cursor-pointer self-center rounded bg-yellow-400 px-2 py-1 text-sm text-black hover:bg-emerald-600 md:ml-4 md:w-auto"
            onClick={handleAddToCart}
          >
            {t('menuPage.add-to-cart')}
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default MenuItem;
