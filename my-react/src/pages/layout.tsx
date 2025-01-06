
import { Outlet, useLocation } from "react-router-dom";
// import type {
//     CarouselItem,
//     CarouselOptions,
// } from 'flowbite';
// import type { CarouselItem, InstanceOptions } from 'flowbite';
import type { CarouselItem, CarouselOptions, CarouselInterface } from 'flowbite';
import { Carousel } from 'flowbite';
// import { Carousel } from "flowbite-react";



// const { Header, , Content } = Layout;
// const { Header, , Content } = Layout;

const Layout: React.FC = () => {
    // const { pathname } = useLocation();
    const carouselElement = document.getElementById('carousel-example');
//   const carousel = new Carousel(carouselElement, items, options, instanceOptions);
//   const carouselElement = document.getElementById('carousel-example');
const items: CarouselItem[] = [
    {
        position: 0,
        el: document.getElementById('carousel-item-1')
    },
    {
        position: 1,
        el: document.getElementById('carousel-item-2')
    },
    {
        position: 2,
        el: document.getElementById('carousel-item-3')
    },
    {
        position: 3,
        el: document.getElementById('carousel-item-4')
    },
];
    const options: CarouselOptions = {
      defaultPosition: 1,
      interval: 3000,
  
      indicators: {
          activeClasses: 'bg-white dark:bg-gray-800',
          inactiveClasses:
              'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
          items: [
              {
                  position: 0,
                  el: document.getElementById('carousel-indicator-1'),
              },
              {
                  position: 1,
                  el: document.getElementById('carousel-indicator-2'),
              },
              {
                  position: 2,
                  el: document.getElementById('carousel-indicator-3'),
              },
              {
                  position: 3,
                  el: document.getElementById('carousel-indicator-4'),
              },
          ],
      },
  
      // callback functions
      onNext: () => {
          console.log('next slider item is shown');
      },
      onPrev: () => {
          console.log('previous slider item is shown');
      },
      onChange: () => {
          console.log('new slider item has been shown');
      },
  };

  if (document.getElementById('carousel-item-1')) {
    const carousel: CarouselInterface = new Carousel(carouselElement, items, options);

    carousel.cycle()

    // set event listeners for prev and next buttons
    const prevButton = document.getElementById('data-carousel-prev');
    const nextButton = document.getElementById('data-carousel-next');

    prevButton?.addEventListener('click', () => {
        carousel.prev();
    });

    nextButton?.addEventListener('click', () => {
        carousel.next();
    });
}
    
    
    return (
      <>
      <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://cdn.worldvectorlogo.com/logos/tinder-2.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tinder</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
        <a href="Home" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="UserProfile" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">UserProfile</a>
        </li>
        <li>
          <a href="LoginPage" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">LoginPage</a>
        </li>
        <li>
          <a href="RegisterPage" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">RegisterPage</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
      </header>
        <main>
        <button data-tooltip-target="tooltip-default" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default tooltip</button>

<div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    Tooltip content
    <div className="tooltip-arrow" data-popper-arrow></div>
</div>



{/* // object options with default values


// instance options object
const instanceOptions: InstanceOptions = {
  id: 'carousel-example',
  override: true
};

const carousel: CarouselInterface = new Carousel(carouselElement, items, options, instanceOptions);

carousel.cycle();

// set event listeners for prev and next buttons
const $prevButton = document.getElementById('data-carousel-prev');
const $nextButton = document.getElementById('data-carousel-next');

$prevButton.addEventListener('click', () => {
    carousel.prev();
});

$nextButton.addEventListener('click', () => {
    carousel.next();
}); */}



        </main>
  <Outlet />
        <footer className="footerInner bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        {/* <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div> */}
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
</footer>
      </>
  );
}
<script src="../path/to/flowbite/dist/flowbite.min.js"></script>
{/* <script src="http://localhost:8097"></script> */}
export default Layout;