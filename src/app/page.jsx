'use client'
import Header from './components/Header';
import Content from './components/content';
import Footer from './components/Footer';
import ClinicSummary from './views/clinic_summary/ClinicSummary';
import InvitationPlanning from './views/invitation_planning/InvitationPlanning';

// The root page of Galleri
export default function Root() {
  return (
    <div>
      <body className='js-enabled'>
        <Header />
        {/* <Content /> */}
        {/* <ClinicSummary /> */}
        <InvitationPlanning />
        <Footer />
      </body>
    </div>
  )
}
