const MenuCarouselItem = ({item}) => {
  return (
    <div className="embla__slide mx-auto w-full max-w-xs flex-shrink-0 rounded bg-[#1a1a1a] p-1 shadow-md">
      <img
        src={item.src}
        alt={item.name}
        className="mb-1 h-auto w-full rounded"
      />
      <div className="flex items-center justify-between">
        <p className="text-base font-medium">{item.name}</p>
        <span className="text-base font-semibold text-yellow-400">
          {item.price} €
        </span>
      </div>
    </div>
  );
};

export default MenuCarouselItem;
