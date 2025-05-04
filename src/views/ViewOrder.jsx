import {useSearchParams} from 'react-router'; // Correct import
import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData'; // Assuming fetchData is in the utils folder
import {url} from '../utils/variables';
const ViewOrder = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetchData(
          `${url}/orders/${localStorage.getItem('user_id')}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setOrder(res);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [sessionId]);

  if (loading) return <div className="p-4 text-white">Loading order...</div>;

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  if (!order) return <div className="p-4 text-red-500">Order not found.</div>;

  return (
    <div className="p-4 text-white">
      <h2 className="mb-4 text-xl font-bold">Your Order</h2>
      <p>
        <strong>Order ID:</strong> {order.id}
      </p>
      <p>
        <strong>Session:</strong> {sessionId}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <h3 className="mt-4 font-semibold">Items:</h3>
      <ul className="list-disc pl-6">
        {order.items.map((item, i) => (
          <li key={i}>
            {item.name} — ${item.price} × {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewOrder;
