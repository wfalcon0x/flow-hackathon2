import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar'
import Banner from '../components/UI/Banner'
import Footer from '../components/UI/Footer'
import Header from '../components/UI/Header'

export default function MainLayout({ children })  {
  const defaultClassAttributes = "absolute top-[30px] left-[calc(50%_-_215px)] w-[430px] h-[642px] border-8 bg-gray-400 rounded-3xl z-10";
  const innerDefaultClassAttributes = "main-app-content bg-white w-full h-full overflow-y-scroll box-border rounded-2xl pt-[80px] pb-9";
  const [size, setSize] = useState([0, 0]);
  const [classAttributes, setClassAttributes] = useState(defaultClassAttributes);
  const [innerClassAttributes, setInnerClassAttributes] = useState(innerDefaultClassAttributes);
  const mainDev = useRef();



  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
      if(window.innerWidth < 500){
        setClassAttributes("h-full");
        setInnerClassAttributes("main-app-content bg-white w-full h-full overflow-y-scroll scr px-2 pt-[64px] pb-9");
      }
      else{
        setClassAttributes(defaultClassAttributes);
        setInnerClassAttributes(innerDefaultClassAttributes);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);


  return (
    <div className="relative bg-purple w-100 h-screen">
      <div className='text-white p-8 hidden lg:block'>
        <img src="/logo-light.svg" alt="" />
      </div>
      <div id="main-app-container" className={classAttributes}>
        <Header />
        <div className={innerClassAttributes}>
          <section className="relative min-h-full">
            {children}
          </section>
        </div>
        <Footer />
      </div>
      <div className="absolute bottom-[-1px] w-full h-[297.93px] flex items-end">
        <img
          className='w-full h-auto'
          alt=""
          src="/vector.svg"
        />
      </div>
    </div>
  )
}