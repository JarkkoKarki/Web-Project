import {useTranslation} from 'react-i18next';
import {useProductInfo} from '../hooks/orderHooks';

export const OrderRow = ({item, index, onClick}) => {
  const {t} = useTranslation();
  const {products, orderDate, status, totalPrice} = item;

  const isToday =
    new Date(orderDate).toLocaleDateString('fi-FI') ===
    new Date().toLocaleDateString('fi-FI');

  const formattedDate = new Date(orderDate).toLocaleDateString('fi-FI', {
    month: '2-digit',
    day: '2-digit',
  });

  const formattedTime = new Date(orderDate)
    .toLocaleTimeString('fi-FI', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(/\./g, ':');

  const {mostExpensiveProduct, totalQuantity} = useProductInfo(products);

  return (
    <div
      className="mb-6 flex w-full flex-col flex-wrap items-center justify-center space-y-4 rounded border-1 border-[#000000] bg-[#101211] text-wrap text-white hover:bg-[#1c1e24] md:w-[800px]"
      onClick={onClick}
      title={t('orders.show-more')}
    >
      <div className="flex w-full cursor-pointer flex-row items-center text-sm md:text-[18px]">
        <section className="w-[60px] border-r-2 border-black p-4 text-center">
          <h2>{index + 1 + '.'}</h2>
        </section>
        <section className="flex w-[100px] flex-row items-start justify-start">
          <h3 className="px-4">{isToday ? formattedTime : formattedDate}</h3>
        </section>
        <section className="flex flex-col items-center md:px-8">
          <ul className="w-full text-wrap">
            {totalQuantity > 1 ? (
              <li>{`${mostExpensiveProduct.name}...`}</li>
            ) : (
              <li>{`${mostExpensiveProduct.name}`}</li>
            )}
          </ul>
        </section>
        <section className="ml-auto flex flex-col items-center px-2">
          <div className="flex flex-row items-center space-x-1.5">
            <h3>{t('orders.total')}</h3>
            <h3>{totalPrice}€</h3>
          </div>
          <div className="flex flex-row items-center space-x-1.5">
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
      </div>
    </div>
  );
};
