import {useLocation} from 'react-router';
import {OrderForm} from '../components/forms/OrderForm';
import {OrderedItems} from '../components/orders/OrderedItems';
import {useShoppingCart} from '../contexts/ShoppingCartContext';
import {calculateTotalPrice} from '../utils/cartUtils';

export const Checkout = () => {
  const {cartItems} = useShoppingCart();
  const location = useLocation();
  const selectedOrder = location.state?.order;

  const items = selectedOrder?.products || cartItems;
  const totalPrice = selectedOrder
    ? selectedOrder.totalPrice
    : calculateTotalPrice(cartItems);

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: "url('src/assets/images/2147772080.jpg')"}}
    >
      <div className="flex w-2/5 flex-col space-y-8 rounded-2xl bg-[#0d0f0e] p-4 text-center text-black shadow-md">
        <div className="flex flex-1 justify-center px-10">
          <OrderedItems order={{products: items, total_price: totalPrice}} />
        </div>
        <div className="flex w-full flex-1 justify-center px-10">
          <OrderForm items={items} />
        </div>
      </div>
    </div>
  );
};
