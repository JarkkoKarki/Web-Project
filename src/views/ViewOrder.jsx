import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';
import {OrderHistory} from '../components/orders/OrderHistory';
import {useTranslation} from 'react-i18next';

const ViewOrder = () => {
  const {t} = useTranslation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sessionId = localStorage.getItem('sessionId');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!sessionId) {
        setError('Session ID is missing from the URL. Please check the link.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        console.log('Session ID from URL:', sessionId);

        const res = await fetchData(
          `http://10.120.32.87/app/api/orders/myorders/en`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('API Response:', res);
        console.log(sessionId);

        // Find the specific order by sessionId
        const matchedOrder = res.find((order) => order.sessionId === sessionId);

        if (!matchedOrder) {
          setError('Order not found for the given session ID.');
        } else {
          setOrder(matchedOrder);
        }
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [sessionId]);

  if (loading)
    return <div className="p-4 text-white">{t('payment.pay-loading')}</div>;

  if (error)
    return (
      <div className="p-4 text-red-500">
        {t('payment.pay-error-view')}
        {error}
      </div>
    );

  if (!order)
    return <div className="p-4 text-red-500">{t('payment.order-nfound')}</div>;

  return (
    <>
      <div className="flex h-2/3 min-h-screen flex-col items-center justify-center bg-[#0f1110] p-4 text-center">
        <h2 className="mb-4 text-xl font-bold">{t('payment.your-order')}</h2>
        <p>
          <strong>{t('payment.order-id')}</strong> {order.orderId}
        </p>
        <p>
          <strong>{t('payment.session')}</strong> {sessionId}
        </p>
        <p>
          <strong>{t('payment.status')}</strong> {order.status}
        </p>

        <h3 className="mt-4 font-semibold">{t('payment.items')}</h3>
        <ul className="list-disc pl-6">
          {order.products.map((product, i) => (
            <li key={i}>
              {product.name} — ${product.price} × {product.quantity}
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center align-top">
          <OrderHistory />
        </div>
      </div>
    </>
  );
};

export default ViewOrder;
