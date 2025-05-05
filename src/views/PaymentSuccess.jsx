import {useSearchParams, useNavigate} from 'react-router';
import {useTranslation} from 'react-i18next';
const PaymentSuccess = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    console.log('Session ID is missing from the URL.');
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f1110] p-4 text-center">
        <h1 className="text-2xl font-bold text-green-600">
          {t('payment.pay-succ')}
        </h1>
        <p className="mt-2">{t('payment.thank-you')}</p>
        <button
          className="mx-4 mt-6 w-2xl rounded bg-yellow-500 px-4 py-2 text-sm font-semibold text-black shadow-lg transition hover:bg-yellow-600"
          onClick={() => navigate(`/order/view?session_id=${sessionId}`)}
        >
          {t('payment.view-order')}
        </button>
      </div>
    );
  }

  console.log('Session ID:', sessionId);
  localStorage.setItem('sessionId', sessionId);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f1110] p-4 text-center">
      <h1 className="text-2xl font-bold text-green-600">
        {t('payment.pay-succ')}
      </h1>
      <p className="mt-2">{t('payment.thank-you')}</p>
      <button
        className="mx-4 mt-6 w-2xl rounded bg-yellow-500 px-4 py-2 text-sm font-semibold text-black shadow-lg transition hover:bg-yellow-600"
        onClick={() => navigate(`/order/view?session_id=${sessionId}`)}
      >
        {t('payment.view-order')}
      </button>
    </div>
  );
};

export default PaymentSuccess;
