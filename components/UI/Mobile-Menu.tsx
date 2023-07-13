'use client'

import { useState, useRef, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
  
  const [user, setUser] = useState({loggedIn: null});
  const [height, setHeight] = useState(0);

  useEffect(() => { 
    //Check Authentication
    fcl.currentUser.subscribe(setUser);
  }, []);

  useEffect(() => { 
    if (typeof document !== 'undefined') {
      const mainElement = document.getElementById("main-app-container");
      setHeight(mainElement.clientHeight);
      console.log(mainElement.clientHeight);
    }
  }, [mobileNavOpen]);

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false)
    };
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  const handleClose = () => {
    setMobileNavOpen(false)
  };

  const handleLogout = () => {
    fcl.unauthenticate();
    setMobileNavOpen(false)
  };
  

  return (
    <div className="flex">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && 'active'}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <FontAwesomeIcon className="text-white text-lg" icon={faBars} />
      </button>

      {/*Mobile navigation */}
      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className={`absolute top-0 pb-16 z-20 left-0 block w-full overflow-auto bg-white`}
          style={{height: height}}
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Button type="ghost" className='absolute top-1 right-3' onClick={handleClose}><FontAwesomeIcon icon={faXmark}/></Button>
          <ul className="mt-9 px-5 py-2">
            {/* <li>
              <Link href="/signin" className="flex font-medium w-full text-gray-600 py-2 justify-center" onClick={() => setMobileNavOpen(false)}>Sign in</Link>
            </li>
            <li>
              <Link href="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 w-full my-2" onClick={() => setMobileNavOpen(false)}>
                <span>Sign up</span>
                <svg className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fill="#999" fillRule="nonzero" />
                </svg>
              </Link>
            </li> */}
            <li>
              <Link href="#" className="flex font-medium w-full text-primary hover:bg-[#E29AFD] hover:text-[#BF3DDB] p-2 justify-start gap-3 items-center">
                <div>
                <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  fill="none"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12v2.1c0 3.5-.9 4.4-4.4 4.4H5.4c-3.6 0-4.4-.9-4.4-4.4V5.9c0-3.5.9-4.4 4.4-4.4h8.1m5.5 6v-6m0 0 2 2m-2-2-2 2"/></svg>
                </div>
                <div>Sell Crypto</div>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex font-medium w-full text-primary hover:bg-[#E29AFD] hover:text-[#BF3DDB] p-2 justify-start gap-3 items-center">
                <div>
                  <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M16 17.4h-4l-4.4 3c-.2.1-.3.2-.5.2s-.4 0-.5-.1c-.2-.1-.3-.2-.4-.4-.2-.2-.2-.4-.2-.5v-2.1c-3 0-5-2-5-5v-6c0-3 2-5 5-5h10c3 0 5 2 5 5v6c0 2.9-2 4.9-5 4.9z"/><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 11v-.2c0-.7.4-1 .8-1.3.4-.3.8-.6.8-1.3 0-.9-.7-1.7-1.7-1.7s-1.6.8-1.6 1.7m1.7 5.2h0"/>
                  </svg>
                </div>
                <div>Support</div>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex font-medium w-full text-primary hover:bg-[#E29AFD] hover:text-[#BF3DDB] p-2 justify-start gap-3 items-center">
                <div>
                  <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 10V8c0-3.31 1-6 6-6s6 2.69 6 6v2m-1 12H7c-4 0-5-1-5-5v-2c0-4 1-5 5-5h10c4 0 5 1 5 5v2c0 4-1 5-5 5Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.995 16h.01m-4.01 0h.01m-4.01 0h.007"/></svg>
                </div>
                <div>Privacy Policy</div>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex font-medium w-full text-primary hover:bg-[#E29AFD] hover:text-[#BF3DDB] p-2 justify-start gap-3 items-center">
                <div>
                  <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4m-4 4h8"/></svg>
                </div>
                <div>Terms of Service</div>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex font-medium w-full text-primary hover:bg-[#E29AFD] hover:text-[#BF3DDB] p-2 justify-start gap-3 items-center">
                <div>
                  <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 9H7m15 1.97v2.06c0 .55-.44 1-1 1.02h-1.96c-1.08 0-2.07-.79-2.16-1.87-.06-.63.18-1.22.6-1.63.37-.38.88-.6 1.44-.6H21c.56.02 1 .47 1 1.02Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.48 10.55c-.42.41-.66 1-.6 1.63.09 1.08 1.08 1.87 2.16 1.87H21v1.45c0 3-2 5-5 5H7c-3 0-5-2-5-5v-7c0-2.72 1.64-4.62 4.19-4.94.26-.04.53-.06.81-.06h9c.26 0 .51.01.75.05C19.33 3.85 21 5.76 21 8.5v1.45h-2.08c-.56 0-1.07.22-1.44.6Z"/>
                  </svg>
                </div>
                <div>My Wallet {!user.loggedIn && <span className="text-red-600 text-sm">not connected</span>}</div>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex font-medium w-full text-primary hover:bg-[#E29AFD] hover:text-[#BF3DDB] p-2 justify-start gap-3 items-center">
                <div>
                  <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h8M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"/>
                  </svg>
                </div>  
                <div>My Limits</div>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex font-medium w-full text-primary  hover:bg-[#E29AFD] hover:text-[#BF3DDB] p-2 justify-start gap-3 items-center">
                <div>
                  <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 2.43994V12.4199C17 14.3899 15.59 15.1599 13.86 14.1199L12.54 13.3299C12.24 13.1499 11.76 13.1499 11.46 13.3299L10.14 14.1199C8.41 15.1499 7 14.3899 7 12.4199V2.43994" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 2.43994V12.4199C17 14.3899 15.59 15.1599 13.86 14.1199L12.54 13.3299C12.24 13.1499 11.76 13.1499 11.46 13.3299L10.14 14.1199C8.41 15.1499 7 14.3899 7 12.4199V2.43994" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div>My Order History</div>
              </Link>
            </li>
            { user.loggedIn && 
              <li>
                <Link href="#" className="flex font-medium w-full text-primary hover:bg-[#E29AFD] hover:text-[#BF3DDB] p-2 justify-start gap-3 items-center" onClick={() => handleLogout()}>
                  <FontAwesomeIcon icon={faRightFromBracket} transform={{ rotate: 180 }} /> Logout
                </Link>
              </li>
            }
            { !user.loggedIn && 
              <li>
                <div className="flex font-medium w-full text-gray-500 hover:bg-[#E29AFD] hover:text-[#BF3DDB] p-2 justify-start gap-3 items-center cursor-pointer">
                  <FontAwesomeIcon icon={faRightFromBracket} transform={{ rotate: 180 }} /> Logout
                </div>
              </li>
            }
          </ul>          
        </Transition>
      </div>
    </div>
  )
}
