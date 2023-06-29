import Navbar from '../components/Navbar'
import Banner from '../components/UI/Banner'
import Footer from '../components/UI/Footer'
import Header from '../components/UI/Header'

export default function MainLayout({ children }) {
  return (
    <>
    <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
      <Header />
      <section className="relative mt-16">
        {children}
      </section>
    </div>
    
    </>
  )
}