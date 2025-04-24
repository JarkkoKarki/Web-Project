const MenuRow = (props) => {
  const {item} = props;

  return (
        <li className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
            <img src={item.src} className="rounded-md mb-4" />
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">{item.name}</p>
              <span className="text-yellow-500 font-bold">{item.price} €</span>
            </div>
        </li>
  );
};

export default MenuRow;
