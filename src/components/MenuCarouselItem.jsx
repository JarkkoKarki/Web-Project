const MenuCarouselItem = (props) => {
  const {item} = props;

  return (
    <div className="embla__slide mx-auto w-full max-w-md flex-shrink-0 rounded-lg bg-[#1a1a1a] p-4 shadow-lg">
      <img
        src={item.src}
        alt={item.name}
        className="mb-4 h-auto w-full rounded-md"
      />
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">{item.name}</p>
        <span className="font-bold text-yellow-500">{item.price} €</span>
      </div>
    </div>
  );
};

export default MenuCarouselItem;
