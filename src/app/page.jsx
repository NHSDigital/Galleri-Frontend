"use client";
import Header from "./components/Header";
import Content from "./components/content";
import Footer from "./components/Footer";
import PrivacyConfirmation from "./views/privacy_confirmation/PrivacyConfirmation";
import Start from "./views/start_page/Start";
import ClinicSummary from "./views/clinic_summary/ClinicSummary";
import InvitationPlanning from "./views/invitation_planning/InvitationPlanning";
import ClinicInformation from "./views/clinic_information/ClinicInformation";
import InvitationSummary from "./views/invitation_summary/InvitationSummary";
import { AppStateProvider } from "./context/AppStateContext";

// The root page of Galleri
export default function Root() {
  return (
    <div>
      <body className="js-enabled">
        <AppStateProvider>
          {/* <Header /> */}
          <PrivacyConfirmation />
          {/* <Start /> */}
          {/* <Content /> */}
          {/* <ClinicSummary /> */}
          {/* <InvitationPlanning /> */}
          {/* <ClinicInformation /> */}
          {/* <InvitationSummary /> */}
          <Footer />
        </AppStateProvider>
      </body>
    </div>
  );
}
