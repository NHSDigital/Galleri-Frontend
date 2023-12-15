"use client";
import Header from "./components/Header";
import Content from "./components/content";
import Footer from "./components/Footer";
import Start from "./views/start_page/Start";
import ClinicSummary from "./views/clinic_summary/ClinicSummary";
import InvitationPlanning from "./views/invitation_planning/InvitationPlanning";
import ClinicInformation from "./views/clinic_information/ClinicInformation";
import InvitationSummary from "./views/invitation_summary/InvitationSummary";
import { AppStateProvider } from "./context/AppStateContext";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

// The root page of Galleri
export default function Root() {
  return (
    <div>
      <body className="js-enabled">
        <a id="skip-to-main" href="#main-content" class="govuk-skip-link" data-module="govuk-skip-link">
          Skip to main content
        </a>
        <Router>
        <AppStateProvider>
        
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/clinicSummary" element={<ClinicSummary />} />
            <Route path="/invitationPlanning" element={<InvitationPlanning />} />
          </Routes>
         
          {/* <Header /> */}
          {/* <Start /> */}
          {/* <Content /> */}
          {/* <ClinicSummary /> */}
          {/* <InvitationPlanning /> */}
          {/* <ClinicInformation /> */}
          {/* <InvitationSummary /> */}
          <Footer />

        </AppStateProvider>
        </Router>
      </body>
    </div>
  );
}
