import React, {useEffect} from 'react';
import useMenu from '../components/hooks/menuHooks';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import MenuCarouselItem from '../components/MenuCarouselItem';
import MenuItem from '../components/MenuRowItem';
import {useTranslation} from 'react-i18next';

const Menu = () => {
  const {t} = useTranslation();
  const {favoritesMenuArray, fullMenuArray} = useMenu();

  const currentDayIndex = new Date().getDay();
  const chefsSpecial =
    favoritesMenuArray.length > 0
      ? favoritesMenuArray[currentDayIndex % favoritesMenuArray.length]
      : null;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {loop: true, containScroll: 'keepSnaps'},
    [Autoplay({delay: 3000, stopOnInteraction: false})],
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <>
      <section className="mt-4 mb-8 flex w-full flex-col items-center justify-center rounded-lg bg-[#181a19] px-6 py-8 shadow-md md:mx-auto md:max-w-4xl">
        <div className="text-center">
          <h2 className="mb-6 text-3xl font-bold text-yellow-500">
            {t('menuPage.chefs-special-of-the-day')}
          </h2>
          {chefsSpecial ? (
            <div>
              <MenuCarouselItem
                item={{
                  ...chefsSpecial,
                  price: (parseFloat(chefsSpecial.price) * 0.9).toFixed(2),
                }}
              />
              <div className="mt-4 text-xl text-yellow-300">
                <span className="text-red-500 line-through">
                  {chefsSpecial.price}€
                </span>{' '}
                <span>
                  {parseFloat(chefsSpecial.price) * 0.9}€ (
                  {t('menuPage.discounted')})
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">{t('menuPage.no-special-today')}</p>
          )}
        </div>
      </section>

      <section
        id="chefs-favourites"
        className="mx-auto max-w-6xl rounded bg-[#101211] p-12"
      >
        <h2 className="mb-12 text-center text-4xl font-bold tracking-wider text-yellow-400">
          {t('menuPage.chefs-favorites')}
        </h2>

        {/* Carousel Menu itemeille */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
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
      <section
        id="menu"
        className="mx-auto max-w-6xl rounded bg-[#101211] p-12"
      >
        <h2 className="mb-12 text-center text-4xl font-bold tracking-wider text-yellow-400 underline underline-offset-4">
          {t('menuPage.menu')}
        </h2>
        <div className="flex flex-col gap-10 md:flex-row">
          {/* First Grid */}
          <div className="grid flex-1 auto-rows-auto gap-10">
            <div className="flex h-auto flex-col">
              <h3 className="mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
                {t('menuPage.meals')}
              </h3>
              <ul className="space-y-6">
                {fullMenuArray
                  .filter((item) => item.categories.includes('main course'))
                  .map((item) => (
                    <li key={item.name}>
                      <MenuItem item={item} />
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
                {t('menuPage.vegan')}
              </h3>
              <ul className="space-y-6">
                {fullMenuArray
                  .filter((item) => item.categories.includes('fields of vegan'))
                  .map((item) => (
                    <li key={item.name}>
                      <MenuItem item={item} />
                    </li>
                  ))}
              </ul>

              <h3 className="mt-4 mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
                {t('menuPage.special-offers')}
              </h3>
              <ul className="space-y-6">
                {fullMenuArray
                  .filter((item) => item.categories.includes('special offer'))
                  .map((item) => (
                    <li key={item.name}>
                      <MenuItem item={item} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Second Grid */}
          <div className="grid flex-1 auto-rows-auto gap-10">
            <div>
              <h3 className="mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
                {t('menuPage.starters')}
              </h3>
              <ul className="space-y-6">
                {fullMenuArray
                  .filter((item) => item.categories.includes('starter'))
                  .map((item) => (
                    <li key={item.name}>
                      <MenuItem item={item} />
                    </li>
                  ))}
              </ul>
              <h3 className="mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
                {t('menuPage.sides')}
              </h3>
              <ul className="space-y-6">
                {fullMenuArray
                  .filter((item) => item.categories.includes('sides'))
                  .map((item) => (
                    <li key={item.name}>
                      <MenuItem item={item} />
                    </li>
                  ))}
              </ul>
              <h3 className="mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
                {t('menuPage.drinks')}
              </h3>
              <ul className="space-y-6">
                {fullMenuArray
                  .filter((item) => item.categories.includes('drinks'))
                  .map((item) => (
                    <li key={item.name}>
                      <MenuItem item={item} />
                    </li>
                  ))}
              </ul>
              <h3 className="mt-4 mb-6 text-center text-2xl font-bold tracking-wider text-yellow-400">
                {t('menuPage.dessert')}
              </h3>
              <ul className="space-y-6">
                {fullMenuArray
                  .filter((item) => item.categories.includes('dessert'))
                  .map((item) => (
                    <li key={item.name}>
                      <MenuItem item={item} />
                    </li>
                  ))}
              </ul>
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
