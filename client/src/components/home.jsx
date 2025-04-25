import React, { useEffect, useRef } from "react";
import { gsap } from 'gsap';

function Home() {
  const fullMenuRef = useRef(null);
  const menuIconf = useRef(null);

  useEffect(() => {
    const fullMenu = fullMenuRef.current;
    const menuIcon = menuIconf.current;
    const menuItems = fullMenu.querySelectorAll("h1");

    // Initially set all menu items off-screen
    gsap.set(menuItems, { x: "200%" });

    const tl = gsap.timeline({ paused: true });

    // Animate menu container visible
    tl.to(fullMenu, { opacity: 1, duration: 0.8 });

    // Animate each item coming from right to center
    tl.to(menuItems, {
      x: "0%",
      stagger: 0.5, // Delay between each item for nice wave effect
      ease: "power2.out",
      duration: 0.5
    }, "-=0.5"); // Overlap slightly with container fade

    const handleClick = () => {
      if (tl.reversed()) {
        tl.play();
      } else {
        tl.reverse();
      }
    };

    menuIcon.addEventListener('click', handleClick);

    return () => {
      if (menuIcon) {
        menuIcon.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <div className='overflow-hidden'>
      <div className="bg-zinc-900 w-screen h-screen overflow-x-hidden relative font-[inconsolata-monte]">
        <nav className='text-white w-screen flex justify-between items-center'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/RPC-JP_Logo.png" className='w-20 ml-10' />
          <h1
            className="relative cursor-pointer mr-10 text-2xl flex items-center group"
            ref={menuIconf}
          >
            Menu&nbsp;
            <span className="material-symbols-rounded">menu</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </h1>
        </nav>

        <div
          ref={fullMenuRef}
          className="opacity-0 bg-transparent flex flex-col text-white text-xl pr-12 absolute right-2 top-20"
        >
          <h1 className='mb-3'>Home</h1>
          <h1 className='mb-3'>About</h1>
          <h1 className='mb-3'><a href="Login-register-Page">Login</a></h1>
          <h1 className='mb-3'><a href="/register-Login-Page">Register</a></h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
