import React, {useEffect, useState} from 'react';
import useMenu from '../components/hooks/menuHooks';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import MenuCarouselItem from '../components/MenuCarouselItem';
import MenuItem from '../components/MenuRowItem';

const Menu = () => {
  const {menuArray, fullMenuArray} = useMenu();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {loop: true, containScroll: 'keepSnaps'},
    [Autoplay({delay: 3000, stopOnInteraction: false})],
  );

  // työnalla :)
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    console.log(`${item.name} added to cart!`);
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <>
      <section
        id="chefs-favourites"
        className="mx-auto max-w-6xl bg-[#101211] py-12"
      >
        <h2 className="mb-12 text-center text-4xl font-bold tracking-wider text-yellow-400">
          CHEFS FAVOURITES
        </h2>

        {/* Carousel Menu itemeille */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {menuArray.map((item) => (
              <MenuCarouselItem key={item.src} item={item} />
            ))}
          </div>
        </div>
      </section>
      <section id="menu" className="mx-auto max-w-6xl bg-[#101211]">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-wider text-yellow-400 underline underline-offset-4">
          MENU
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
              MEALS
            </h3>
            <ul className="space-y-6">
              <li>
                {fullMenuArray.map((item) => (
                  <MenuItem key={item.name} item={item} addToCart={addToCart} />
                ))}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
              APPETIZERS AND DESSERTS
            </h3>
            <ul className="space-y-6">
              <li>
                {fullMenuArray.map((item) => (
                  <MenuItem key={item.name} item={item} />
                ))}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
