import {useTranslation} from 'react-i18next';

export const OrderDetailsWorkhub = ({order, onClose, onManageOrder}) => {
  const {t} = useTranslation();
  const {products, orderDate, status, totalPrice, orderId} = order;
  console.log(totalPrice);

  return (
    <>
      <div className="flex w-[800px] flex-col space-y-4 rounded border-1 border-[#000000] bg-[#101211] text-white">
        <section className="m-0 flex w-full flex-row items-center space-x-8 border-b border-gray-700 px-6 py-4">
          <h2>
            {t('orders.id')} {orderId}
          </h2>
          <h3>
            {t('orders.date')} {new Date(orderDate).toLocaleDateString('fi-FI')}
          </h3>
          <div className="ml-auto flex flex-row items-center space-x-1.5">
            <h3>{t('orders.status')}</h3>
            <h3
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
              {status}
            </h3>
          </div>
        </section>

        <div className="flex w-full flex-row space-x-4">
          <section className="flex w-1/3 flex-col space-y-4 border-r border-gray-700 px-6 py-4">
            <h3 className="font-bold underline underline-offset-4">
              {t('orders.personal-info')}
            </h3>
            <p>{`${t('orders.address')}: ${order.address ?? t('orders.undefined')}`}</p>
          </section>
          <section className="flex flex-1 flex-col space-y-1 px-6 py-4">
            <ul className="m-0">
              <li className="grid grid-cols-[1fr_auto] items-start space-y-1 gap-x-4 font-bold">
                <h3 className="underline underline-offset-4">
                  {t('orders.your-products')}
                </h3>
                <h3 className="underline underline-offset-4">
                  {t('orders.price-per-product')}
                </h3>
              </li>
              {products.map((product, index) => (
                <li
                  key={index}
                  className="mb-3 grid grid-cols-[1fr_auto] items-start gap-x-4"
                >
                  <div>{`${product.name} (${product.quantity})`}</div>
                  <div>{`${product.quantity * product.price}€`}</div>
                  <div className="col-span-2 font-light italic">
                    {product.description}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <section className="mt-4 flex w-full justify-center space-x-3 pr-4">
        <button
          onClick={onManageOrder}
          className="inline-block cursor-pointer border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
        >
          {t('orders.manage')}
        </button>
        <button
          onClick={onClose}
          className="inline-block cursor-pointer border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
        >
          {t('orders.close')}
        </button>
      </section>
    </>
  );
};

export default OrderDetailsWorkhub;
