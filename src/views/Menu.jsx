import React, { useEffect} from 'react';
import useMenu from '../components/hooks/menuHooks';
import MenuRow from '../components/MenuRow';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const Menu = () => {
  const menuArray = useMenu();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, containScroll: "keepSnaps" }, // Ensure only one slide is visible
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit(); // Reinitialize Embla when needed
    }
  }, [emblaApi]);



  return (<>
    <section
        id="chefs-favourites"
        className="max-w-6xl mx-auto bg-[#101211] py-12"
      >
        <h2
          className="text-center text-4xl font-bold text-yellow-400 tracking-wider mb-12"
        >
          CHEFS FAVOURITES
        </h2>

        {/* Carousel Menu itemeille */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {menuArray.map((item) => (
              <MenuRow key={item.src} item={item} />
            ))}
          </div>
        </div>

      </section>
      <section id="menu" className="max-w-6xl mx-auto bg-[#101211]">
        <h2
          className="text-center text-4xl font-bold text-yellow-400 tracking-wider mb-12 underline underline-offset-4"
        >
          MENU
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div>
            <h3
              className="text-center text-2xl font-bold text-yellow-400 tracking-wider mb-6"
            >
              MEALS
            </h3>
            <ul className="space-y-6">
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>KEBAB CLASSIC</p>
                <p>$25</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>SUPER KEBAB</p>
                <p>$32</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>KINGSIZE KEBAB</p>
                <p>$45</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>VEGGIE MIX</p>
                <p>$23</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>SPICY SPECIAL</p>
                <p>$27</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>CHEF'S SPECIAL</p>
                <p>$48</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>GRILLED VEGGIE MIX</p>
                <p>$35</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>KEBAB BURGER</p>
                <p>$30</p>
              </li>
            </ul>
          </div>


          <div>
            <h3
              className="text-center text-2xl font-bold text-yellow-400 tracking-wider mb-6"
            >
              APPETIZERS AND DESSERTS
            </h3>
            <ul className="space-y-6">
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$25</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$38</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$45</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$22</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$28</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$32</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$30</p>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$40</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      </>

  );
};

export default Menu;
