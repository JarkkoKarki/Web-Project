import {toUpper} from 'lodash';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuItem = ({item, addToCart}) => {
  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(item);
      toast.success(`${item.name} added to cart!`, {
        position: 'top-left',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="menu-item flex items-center justify-between border-b-1 border-b-gray-800">
      <div className="flex flex-col">
        <h4 className="text-lg font-bold">{toUpper(item.name)}</h4>
        <p className="text-sm text-gray-500">{item.description}</p>
        <p className="font-bold text-yellow-400">${item.price}</p>
      </div>
      {addToCart && (
        <button
          className="ml-4 cursor-pointer rounded bg-yellow-400 px-2 py-1 text-sm text-black hover:bg-emerald-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default MenuItem;
