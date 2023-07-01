'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import Logo from './Logo'
import MobileMenu from './Mobile-Menu'

export default function Header() {

  const [top, setTop] = useState<boolean>(true)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }  

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header className={`relative [background:linear-gradient(90.19deg,_#eb98fd,_#6ab7ff)] rounded-2xl fixed w-100 z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <h1 className="text-white text-lg" >Sell Crypto</h1>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
