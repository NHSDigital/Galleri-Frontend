import Header from './components/Header';
import Content from './components/content';
import Footer from './components/Footer';
import PrivacyConfirmation from './views/privacy_confirmation/PrivacyConfirmation';
import LoggedOut from './views/logged_out/LoggedOut';
import Start from './views/start_page/Start';
import ClinicSummary from './views/clinic_summary/ClinicSummary';
import InvitationPlanning from './views/invitation_planning/InvitationPlanning';
import ClinicInformation from './views/clinic_information/ClinicInformation';
import InvitationSummary from './views/invitation_summary/InvitationSummary';
import { AppStateProvider } from './context/AppStateContext';
import { InactivityProvider } from './context/AutoSignOutProvider';

// The root page of Galleri
export default function Root() {
  const roles = ['Invitation Planner', 'Referring Nurse'];
  return (
    <div>
      <body className="js-enabled">
        <a
          id="skip-to-main"
          href="#main-content"
          className="govuk-skip-link"
          data-module="govuk-skip-link"
        >
          Skip to main content
        </a>
        <AppStateProvider>
          <InactivityProvider
            timeout={process.env.LOGOUT_TIMEOUT || 15 * 60 * 1000}
          >
            {/* <Header /> */}
            <PrivacyConfirmation userRole={roles[0]} />
            {/* <Content /> */}
            {/* <ClinicSummary /> */}
            {/* <InvitationPlanning /> */}
            {/* <ClinicInformation /> */}
            {/* <InvitationSummary /> */}
            <Footer />
          </InactivityProvider>
        </AppStateProvider>
      </body>
    </div>
  );
}
