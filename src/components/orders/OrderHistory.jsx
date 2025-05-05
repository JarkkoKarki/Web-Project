import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useOrders} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';
import {OrderRow} from './OrderRow';
import OrderDetails from './OrderDetails';
import {url} from '../../utils/variables';

export const OrderHistory = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const {getOrdersByUserId} = useOrders();

  const [orders, setOrders] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getOrdersByUserId();
      setOrders(fetchedOrders);
      console.log('Orders:', fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  // Taken from ShoppingCartElement
  // We shall see if this is the best place for this function
  // could probably made into a hook
  // or moved to the apiHooks
  const orderAgain = async (order) => {
    try {
      console.log(user, ' user');
      if (!user || !user.id || !user.username || !user.address) {
        alert('User information is incomplete');
        return;
      }

      const payload = {
        products: order.products.map((product) => ({
          id: product.product_id,
          quantity: product.quantity,
        })),
        user: {
          user_id: user.id,
          username: user.username,
          address: user.address,
        },
      };

      console.log('payload:', payload);

      const response = await fetch(url + '/payment/create-checkout-session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        throw new Error('Payment session creation failed');
      }

      const data = await response.json();
      console.log('Stripe Response Data:', data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned.');
      }
    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    console.log('effect user:', user);
    if (user) {
      fetchOrders();
    }
  }, [user?.id]);

  const displayedOrders = showAll ? orders : orders.slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center bg-[#0d0f0e] p-4 text-white">
      <h2 className="mb-4 text-2xl font-bold">{t('orders.title')}</h2>
      <h3 className="self-start pl-1">{t('orders.latest-order')}</h3>
      {selectedOrder ? (
        <OrderDetails
          order={selectedOrder}
          user={user}
          orderAgain={() => orderAgain(selectedOrder)}
          onClose={handleClose}
        />
      ) : (
        displayedOrders
          .slice()
          .reverse()
          .map((order, index) => (
            <OrderRow
              key={index}
              item={order}
              index={index}
              onClick={() => handleOrderClick(order)}
            />
          ))
      )}
      {!selectedOrder && orders.length > 5 && (
        <button
          className="mt-6 inline-block cursor-pointer border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? t('orders.view-less') : t('orders.view-more')}
        </button>
      )}
    </div>
  );
};
