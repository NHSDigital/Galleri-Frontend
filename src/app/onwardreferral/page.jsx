"use client";

import React, { useEffect, useState } from "react";
import "src/app/styles/css/sass.css";
import { useSession } from "next-auth/react";
import { useInactivity } from "@/app/context/AutoSignOutProvider";
import Header from "@/app/components/Header";
import LoggedOut from "../views/logged_out/LoggedOut";

export default function OnwardReferral() {
  const CLINIC_INFORMATION = process.env.NEXT_PUBLIC_CLINIC_INFORMATION;

  const { data: session, status } = useSession({
    required: true,
  });
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${CLINIC_INFORMATION}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/clinic-information?clinicId=${clinicId}&clinicName=${clinicName}`
        );
        const result = await response.json();
        setParticipants(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const { showLogoutPage } = useInactivity();

  if (status === "loading") {
    return <Header />;
  }

  if (!session) {
    typeof window !== "undefined" && (window.location.href = "/signin");
    return null;
  }

  const participantsData = [
    {
      bloodDrawDate: "25/06/2024",
      resultsReceived: "Yes",
      participantName: "John Smith",
      participantId: "1",
    },
    {
      bloodDrawDate: "25/06/2024",
      resultsReceived: "Yes",
      participantName: "John Smith",
      participantId: "2",
    },
    {
      bloodDrawDate: "25/06/2024",
      resultsReceived: "Yes",
      participantName: "John Smith",
      participantId: "3",
    },
    {
      bloodDrawDate: "25/06/2024",
      resultsReceived: "Yes",
      participantName: "John Smith",
      participantId: "4",
    },
  ];

  return !showLogoutPage ? (
    <>
      <Header withNavigation={true} />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="main-content" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-full">
              <h1>Onward referrals work list</h1>
              <h2>Results table</h2>
              <table
                className="nhsuk-table-responsive nhsuk-u-margin-bottom-4"
                role="table"
              >
                <thead role="rowgroup" className="nhsuk-table__head">
                  <th role="row">Blood Draw Date</th>
                  <th role="row">Results Received</th>
                  <th role="row">Participant Name</th>
                </thead>
                <tbody>
                  {participantsData.map((participant) => (
                    <tr role="row">
                      <>
                        <td role="cell">{participant.bloodDrawDate}</td>
                        <td role="cell">{participant.resultsReceived}</td>
                        <td role="cell">
                          <a
                            href={`participant/${participant.participantId}`}
                            role="link"
                          >
                            {participant.participantName}
                          </a>
                        </td>
                      </>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  ) : (
    <LoggedOut showHeader={true} />
  );
}
