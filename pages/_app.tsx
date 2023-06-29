import '../styles/app.scss'
import DefaultLayout from '../layouts/DefaultLayout'

// Import FCL config
import '../config/fcl'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
