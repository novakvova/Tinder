
import React, { useState, useEffect } from 'react';
// import { Carousel } from 'flowbite';
// import 'flowbite';  // Import Flowbite JS
// import 'flowbite/dist/flowbite.min.css';  // Import Flowbite CSS
import {Carousel} from 'flowbite-react';


// export function Component() {
//     return (

//     );
//   };

const Home = () => {




// useEffect(() => {
//     // Initialize Flowbite's carousel after the component has mounted
//         const carouselElement = document.getElementById('carousel-example');
//     const carousel = new Carousel(carouselElement);
//     // const carouselElement = document.getElementById('carousel-example');
//     // if (carouselElement) {
//     //   new (window as any).Flowbite.Carousel(carouselElement);
//     // }
//   }, []);

return (
    <>
        <h1>dfjaslfjgbksldfjkgjsdfkjg</h1>

        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">

        <button data-tooltip-target="tooltip-default" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default tooltip</button>

<div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    Tooltip content
    <div className="tooltip-arrow" data-popper-arrow></div>
</div>
      <Carousel>
        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
    </div>

        

{/* <script src="./../dist/app-bundle.js"></script> */}
        </>
    );
}

export default Home;