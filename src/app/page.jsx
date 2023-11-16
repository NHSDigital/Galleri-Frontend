"use client";
import Header from "./components/Header";
import Content from "./components/content";
import Footer from "./components/Footer";
import ClinicSummary from "./views/clinic_summary/ClinicSummary";
import InvitationPlanning from "./views/invitation_planning/InvitationPlanning";
import ClinicInformation from "./views/clinic_information/ClinicInformation";
import InvitationSummary from "./views/invitation_summary/InvitationSummary";

// The root page of Galleri
export default function Root() {
  return (
    <div>
      <body className="js-enabled">
        <Header />
        {/* <Content /> */}
        <ClinicSummary />
        {/* <InvitationPlanning /> */}
        {/* <ClinicInformation /> */}
        <InvitationSummary />
        <Footer />
      </body>
    </div>
  );
}
