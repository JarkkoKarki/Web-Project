import {useTranslation} from 'react-i18next';
const PaymentCancel = () => {
  const {t} = useTranslation();
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold text-red-600">
        {t('payment.pay-cancel')}
      </h1>
      <p>{t('payment.pay-error')}</p>
    </div>
  );
};

export default PaymentCancel;
