import {useTranslation} from 'react-i18next';

export const OrderRow = ({item, index}) => {
  const {t} = useTranslation();
  const {orderId, address, products, orderDate, status, totalPrice} = item;
  const formattedDate = new Date(orderDate).toLocaleDateString('fi-FI', {
    month: '2-digit',
    day: '2-digit',
  });

  // WIP
  return (
    <div className="border-black-3 mb-6 flex w-[800px] cursor-pointer flex-col items-center justify-center space-y-4 rounded bg-[#101211] text-white hover:bg-[#1c1e24]">
      <div className="flex w-full flex-row items-center">
        <div className="border-r-3 border-black p-4 text-center">
          <h2>{index + 1 + '.'}</h2>
        </div>
        <div className="flex flex-row items-start justify-start">
          <h3 className="px-4">{formattedDate}</h3>
        </div>
        <div className="flex flex-col items-center px-8">
          <ul className="">
            {products.map((product, idx) => (
              <li key={idx}>
                {product.name} - {'x' + product.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="ml-auto flex flex-col px-2 text-center">
          <h3>
            {t('orders.total')}: {totalPrice}
          </h3>
          <h3>
            {t('orders.status')}: {status}
          </h3>
        </div>
      </div>
    </div>
  );
};
