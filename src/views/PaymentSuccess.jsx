import {useEffect} from 'react';

const PaymentSuccess = () => {
  useEffect(() => {
    // show success message, etc.
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
    </div>
  );
};

export default PaymentSuccess;
