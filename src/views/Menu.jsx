import React from 'react';

const Menu = () => {
  return (<>
    <section
        id="chefs-favourites"
        class="max-w-6xl mx-auto bg-[#101211] py-12"
      >
        <h2
          class="text-center text-4xl font-bold text-yellow-400 tracking-wider mb-12"
        >
          CHEFS FAVOURITES
        </h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <li class="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
            <img src="https://placehold.co/400x250" class="rounded-md mb-4" />
            <div class="flex justify-between items-center">
              <p class="text-lg font-semibold">KEBAB CLASSIC</p>
              <span class="text-yellow-500 font-bold">$25</span>
            </div>
          </li>

          <li class="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
            <img src="https://placehold.co/400x250" class="rounded-md mb-4" />
            <div class="flex justify-between items-center">
              <p class="text-lg font-semibold">SUPER KEBAB</p>
              <span class="text-yellow-500 font-bold">$32</span>
            </div>
          </li>

          <li class="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
            <img src="https://placehold.co/400x250" class="rounded-md mb-4" />
            <div class="flex justify-between items-center">
              <p class="text-lg font-semibold">KINGSIZE KEBAB</p>
              <span class="text-yellow-500 font-bold">$45</span>
            </div>
          </li>

          <li class="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
            <img src="https://placehold.co/400x250" class="rounded-md mb-4" />
            <div class="flex justify-between items-center">
              <p class="text-lg font-semibold">VEGGIE MIX</p>
              <span class="text-yellow-500 font-bold">$23</span>
            </div>
          </li>

          <li class="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
            <img src="https://placehold.co/400x250" class="rounded-md mb-4" />
            <div class="flex justify-between items-center">
              <p class="text-lg font-semibold">SPICY SPECIAL</p>
              <span class="text-yellow-500 font-bold">$27</span>
            </div>
          </li>

          <li class="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
            <img src="https://placehold.co/400x250" class="rounded-md mb-4" />
            <div class="flex justify-between items-center">
              <p class="text-lg font-semibold">CHEF'S SPECIAL</p>
              <span class="text-yellow-500 font-bold">$48</span>
            </div>
          </li>
        </ul>
      </section>
      <section id="menu" class="max-w-6xl mx-auto bg-[#101211]">
        <h2
          class="text-center text-4xl font-bold text-yellow-400 tracking-wider mb-12 underline underline-offset-4"
        >
          MENU
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

          <div>
            <h3
              class="text-center text-2xl font-bold text-yellow-400 tracking-wider mb-6"
            >
              MEALS
            </h3>
            <ul class="space-y-6">
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>KEBAB CLASSIC</p>
                <p>$25</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>SUPER KEBAB</p>
                <p>$32</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>KINGSIZE KEBAB</p>
                <p>$45</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>VEGGIE MIX</p>
                <p>$23</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>SPICY SPECIAL</p>
                <p>$27</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>CHEF'S SPECIAL</p>
                <p>$48</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>GRILLED VEGGIE MIX</p>
                <p>$35</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>KEBAB BURGER</p>
                <p>$30</p>
              </li>
            </ul>
          </div>


          <div>
            <h3
              class="text-center text-2xl font-bold text-yellow-400 tracking-wider mb-6"
            >
              APPETIZERS AND DESSERTS
            </h3>
            <ul class="space-y-6">
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$25</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$38</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$45</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$22</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$28</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$32</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <p>PLACEHOLDER</p>
                <p>$30</p>
              </li>
              <li class="flex justify-between border-b border-gray-700 pb-2">
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
