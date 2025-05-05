import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useOrders} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';
import {OrderRow} from './OrderRow';
import OrderDetails from './OrderDetails';
import i18n from 'i18next';
import {useNavigate} from 'react-router';

export const OrderHistory = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const {getOrdersByUserId} = useOrders();
  const navigate = useNavigate();

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

  const orderAgain = (order) => {
    const formattedProducts = order.products.map((product) => ({
      id: product.product_id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      categories: product.categories || [],
      diets: product.diets || [],
      src: product.src || '',
    }));

    navigate('/checkout', {
      state: {order: {...order, products: formattedProducts}},
    });
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    console.log('effect user:', user);
    if (user) {
      fetchOrders();
    }
  }, [user?.id, i18n.language]);

  const displayedOrders = showAll
    ? orders.slice().reverse()
    : orders.slice().reverse().slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center bg-[#0d0f0e] p-4 text-white">
      <h2 className="mb-4 text-2xl font-bold">{t('orders.title')}</h2>
      {selectedOrder ? (
        <OrderDetails
          order={selectedOrder}
          user={user}
          orderAgain={() => orderAgain(selectedOrder)}
          onClose={handleClose}
        />
      ) : (
        <div
          className={`w-full ${
            orders.length > 10 ? 'max-h-[500px] overflow-y-auto' : ''
          }`}
        >
          {displayedOrders.map((order, index) => (
            <div key={index}>
              {index === 0 && (
                <h3 className="self-start pl-1">{t('orders.latest-order')}</h3>
              )}
              <OrderRow
                item={order}
                index={index}
                onClick={() => handleOrderClick(order)}
              />
            </div>
          ))}
        </div>
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
