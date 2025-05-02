import React, {useEffect} from 'react';
import useMenu from '../components/hooks/menuHooks';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import MenuCarouselItem from '../components/MenuCarouselItem';
import MenuItem from '../components/MenuRowItem';
import {useShoppingCart} from '../contexts/ShoppingCartContext';

const Menu = () => {
  const {favoritesMenuArray, fullMenuArray} = useMenu();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {loop: true, containScroll: 'keepSnaps'},
    [Autoplay({delay: 3000, stopOnInteraction: false})],
  );

  const {addItemToCart} = useShoppingCart();

  const handleAddToCart = (item) => {
    addItemToCart(item);
    console.log(`${item.name} added to cart! ID: ${item.id}`);
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
          <div className="embla__container flex gap-5">
            {favoritesMenuArray.map((item) => (
              <MenuCarouselItem
                key={item.src}
                item={item}
                className="mx-auto w-3/4"
              />
            ))}
          </div>
        </div>
      </section>
      <section id="menu" className="mx-auto max-w-6xl bg-[#101211]">
        <h2 className="mb-12 text-center text-4xl font-bold tracking-wider text-yellow-400 underline underline-offset-4">
          MENU
        </h2>
        <div className="flex flex-col gap-10 md:flex-row">
          {/* First Grid */}
          <div className="grid flex-1 auto-rows-auto gap-10">
            <div>
              <h3 className="mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
                MEALS
              </h3>
              <ul className="space-y-6">
                {fullMenuArray
                  .filter((item) => item.categories.includes('main course'))
                  .map((item) => (
                    <li key={item.name}>
                      <MenuItem
                        item={item}
                        addToCart={handleAddToCart}
                        className="mx-auto w-3/4"
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
                SIDES
              </h3>
              <ul className="space-y-6">
                {fullMenuArray
                  .filter((item) => item.categories.includes('sides'))
                  .map((item) => (
                    <li key={item.name}>
                      <MenuItem
                        item={item}
                        addToCart={handleAddToCart}
                        className="mx-auto w-3/4"
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Second Grid */}
          <div className="grid flex-1 auto-rows-auto gap-10">
            <div>
              <h3 className="mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
                DRINKS
              </h3>
              <ul className="space-y-6">
                {fullMenuArray
                  .filter((item) => item.categories.includes('drinks'))
                  .map((item) => (
                    <li key={item.name}>
                      <MenuItem
                        item={item}
                        addToCart={handleAddToCart}
                        className="mx-auto w-3/4"
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
                STARTERS
              </h3>
              <ul className="space-y-6">
                {fullMenuArray
                  .filter((item) => item.categories.includes('starter'))
                  .map((item) => (
                    <li key={item.name}>
                      <MenuItem
                        item={item}
                        addToCart={handleAddToCart}
                        className="mx-auto w-3/4"
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
