import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {updateOrderStatus, useOrders} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';
import {OrderRow} from './OrderRow';
import OrderDetailsWorkhub from './OrderDetailsWorkhub';
import Modal from './Modal';

export const OrderHistoryWorkhub = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const {getOrdersByUserId, getAllOrders} = useOrders();

  const [orders, setOrders] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const closeManageModal = () => setIsManageModalOpen(false);

  const fetchOrders = async () => {
    try {
      let fetchedOrders;
      if (user?.role === 'worker' || user?.role === 'admin') {
        fetchedOrders = await getAllOrders(); // Fetch all orders for worker/admin
      } else {
        fetchedOrders = await getOrdersByUserId();
      }
      setOrders(fetchedOrders);
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

  const handleClose = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user?.id]);

  const displayedOrders = showAll ? orders : orders.slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center bg-[#0d0f0e] p-4 text-white">
      <h2 className="mb-4 text-2xl font-bold">{t('orders.title')}</h2>
      {selectedOrder ? (
        <OrderDetailsWorkhub
          order={selectedOrder}
          user={[]}
          onClose={handleClose}
          onManageOrder={() => setIsManageModalOpen(true)}
        />
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
      {isManageModalOpen && (
        <Modal isOpen={isManageModalOpen} onClose={closeManageModal}>
          <h2 className="mb-4 text-xl font-bold">Update Order Status</h2>
          <p className="mb-2">
            Update status for order #{selectedOrder?.orderId}
          </p>
          <div>
            <p>Order: </p>
            {selectedOrder?.orderId}
            <p>Status: </p>
            {selectedOrder?.status}
          </div>
          <select
            className="w-full rounded border border-gray-300 bg-[#101211] px-4 py-2 text-white"
            value={selectedOrder?.status}
            onChange={(e) =>
              setSelectedOrder({...selectedOrder, status: e.target.value})
            }
          >
            {[
              'pending',
              'confirmed',
              'preparing',
              'ready',
              'out-for-delivery',
              'completed',
              'cancelled',
            ].map((status) => (
              <option
                key={status}
                value={status}
                className={
                  status === 'pending'
                    ? 'text-yellow-500'
                    : status === 'confirmed'
                      ? 'text-green-500'
                      : status === 'preparing'
                        ? 'text-amber-800'
                        : status === 'ready'
                          ? 'text-green-200'
                          : status === 'out-for-delivery'
                            ? 'text-fuchsia-400'
                            : status === 'completed'
                              ? 'text-green-500'
                              : status === 'cancelled'
                                ? 'text-red-500'
                                : ''
                }
              >
                {status.charAt(0).toUpperCase() +
                  status.slice(1).replace(/-/g, ' ')}
              </option>
            ))}
          </select>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="border px-4 py-2 text-black"
              onClick={closeManageModal}
            >
              Cancel
            </button>
            <button
              className="bg-yellow-500 px-4 py-2 font-bold text-black"
              onClick={async () => {
                const token = localStorage.getItem('token');
                const newStatus = selectedOrder.status;

                if (!token) {
                  console.error('Missing authentication token');
                  return;
                }

                try {
                  await updateOrderStatus(
                    selectedOrder.orderId,
                    newStatus,
                    token,
                  );
                  await fetchOrders();
                  closeManageModal();
                } catch (error) {
                  console.error('Failed to update status:', error);
                }
              }}
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
