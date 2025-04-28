import {toUpper} from 'lodash';

const MenuItem = (props) => {
  const {item} = props;

  return (
    <>
      <div className="grid justify-between space-y-2 border-b border-gray-700 pb-4">
        <p className="text-lg font-semibold">{toUpper(item.name)}</p>
        <p className="text-sm text-emerald-600">{item.diets}</p>
        <p className="left-0 font-bold text-yellow-500">{item.price} €</p>
      </div>
    </>
  );
};

export default MenuItem;
