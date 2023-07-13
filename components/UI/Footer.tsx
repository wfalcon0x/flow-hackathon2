import Logo from './Logo'

export default function Footer() {
  return (
    <footer className='absolute w-full fixed bottom-0 bg-white h-9 -z--1 rounded-b-3xl'>
      <div className='flex justify-center items-center h-full'>
        <img src="/images/footer-logo.svg" alt="" className='w-auto h-3' />
      </div>
    </footer>
  )
}
