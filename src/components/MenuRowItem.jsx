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

  console.log(item, ' source');

  return (
    <div className="menu-item flex items-center justify-between rounded-md border-b-1 border-b-gray-800 bg-gray-900 p-4">
      <div className="flex h-full flex-col justify-between">
        <h4 className="text-lg font-bold text-white">{toUpper(item.name)}</h4>
        <p className="mt-2 text-sm text-gray-400">{item.description}</p>
        <p className="mt-auto font-bold text-yellow-400">${item.price}</p>
      </div>
      <img
        className="ml-4 h-20 w-20 rounded-md object-cover"
        src={item.src}
        alt={item.name}
      />

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
