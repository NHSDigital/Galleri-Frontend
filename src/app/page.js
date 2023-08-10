import Header from './components/Header';
import Content from './components/content';
import Footer from './components/Footer';
import ClinicSummary from './pages/ClinicSummary';

// The root page of Galleri
export default function Root() {
  return (
    <div>
      <body className='js-enabled'>
        <Header />
        {/* <Content /> */}
        <ClinicSummary />
        <Footer />
      </body>
    </div>
  )
}
