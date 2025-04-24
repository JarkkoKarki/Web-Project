const MenuRow = (props) => {
  const { item } = props;

  return (
    <div className="embla__slide flex-shrink-0 w-full max-w-md mx-auto bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
      <img src={item.src} alt={item.name} className="rounded-md mb-4 w-full h-auto" />
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">{item.name}</p>
        <span className="text-yellow-500 font-bold">{item.price} €</span>
      </div>
    </div>
  );
};

export default MenuRow;
