import {useSearchParams, useNavigate} from 'react-router';
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  {
    console.log(sessionId);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f1110] p-4 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-2">Thank you for your purchase.</p>
      <button
        className="mx-4 mt-6 w-2xl rounded bg-yellow-500 px-4 py-2 text-sm font-semibold text-black shadow-lg transition hover:bg-yellow-600"
        onClick={() => navigate(`/order/view?session_id=${sessionId}`)}
      >
        View Order
      </button>
    </div>
  );
};

export default PaymentSuccess;
