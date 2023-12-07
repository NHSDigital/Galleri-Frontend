import Header from "./components/Header";
import Content from "./components/content";
import Footer from "./components/Footer";
import Start from "./views/start_page/Start";
import ClinicSummary from "./views/clinic_summary/ClinicSummary";
import InvitationPlanning from "./views/invitation_planning/InvitationPlanning";
import ClinicInformation from "./views/clinic_information/ClinicInformation";
import InvitationSummary from "./views/invitation_summary/InvitationSummary";
import { AppStateProvider } from "./context/AppStateContext";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route";
import AutoSignOutProvider from "./context/AutoSignOutProvider";

// The root page of Galleri
export default async function Root() {
  const data = await getServerSession(authOptions);
  return (
    <div>
      <body className="js-enabled">
        <a id="skip-to-main" href="#main-content" class="govuk-skip-link" data-module="govuk-skip-link">
          Skip to main content
        </a>
        <div>{JSON.stringify(data)}</div>
        <AutoSignOutProvider>
          <AppStateProvider>
            {/* <Header /> */}
            <Start />
            {/* <Content /> */}
            {/* <ClinicSummary /> */}
            {/* <InvitationPlanning /> */}
            {/* <ClinicInformation /> */}
            {/* <InvitationSummary /> */}
            <Footer />
          </AppStateProvider>
        </AutoSignOutProvider>
      </body>
    </div>
  );
}
