'use client'
import Header from './components/Header';
import Content from './components/content';
import Footer from './components/Footer';
import ClinicSummary from './views/clinic_summary/ClinicSummary';

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
