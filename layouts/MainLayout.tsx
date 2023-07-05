import { useLayoutEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar'
import Banner from '../components/UI/Banner'
import Footer from '../components/UI/Footer'
import Header from '../components/UI/Header'

export default function MainLayout({ children })  {
  const defaultClassAttributes = "absolute top-[191px] left-[calc(50%_-_215px)] w-[430px] h-[642px] border-8 bg-gray-400 rounded-3xl";
  const innerDefaultClassAttributes = "bg-white box-border w-full h-full overflow-hidden p-2 rounded-2xl";
  const [size, setSize] = useState([0, 0]);
  const [classAttributes, setClassAttributes] = useState(defaultClassAttributes);
  const [innerClassAttributes, setInnerClassAttributes] = useState(innerDefaultClassAttributes);
  const mainDev = useRef();

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
      if(window.innerWidth < 500){
        setClassAttributes("h-full");
        setInnerClassAttributes("bg-white w-full h-full overflow-hidden p-2 test");
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
    <div className="relative bg-purple w-100 h-screen min-h-[1024px]">
      <div id="main-app-container" className={classAttributes}>
        <div className={innerClassAttributes}>
          <Header />
          <section className="relative">
            {children}
          </section>
        </div>
      </div>
    </div>
  )
}