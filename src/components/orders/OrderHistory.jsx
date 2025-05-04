import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useOrders} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';
import {OrderRow} from './OrderRow';
import OrderDetails from './OrderDetails';

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

  console.log('orders: ', orders);

  return (
    <div className="flex flex-col items-center justify-center bg-[#0d0f0e] p-4 text-white">
      <h2 className="mb-4 text-2xl font-bold">{t('orders.title')}</h2>
      {selectedOrder ? (
        <OrderDetails order={selectedOrder} user={user} onClose={handleClose} />
      ) : (
        displayedOrders.map((order, index) => (
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
