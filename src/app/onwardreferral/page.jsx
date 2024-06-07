"use client";

import React, { useEffect, useState } from "react";
import "src/app/styles/css/sass.css";
import { useSession } from "next-auth/react";
import { useInactivity } from "@/app/context/AutoSignOutProvider";
import Header from "@/app/components/Header";
import Pagination from "../components/Pagination";
import LoggedOut from "../views/logged_out/LoggedOut";

export default function OnwardReferral() {
  const ONWARDREFERALLIST = process.env.NEXT_PUBLIC_PARTICIPANTS;

  const { data: session, status } = useSession({
    required: true,
  });

  const [participants, setParticipants] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * 20;
  const lastPageIndex = Number(firstPageIndex) + Number(20);
  const currentTableData = participants.slice(firstPageIndex, lastPageIndex);

  const onCurrentPageChange = (page) => {
    setCurrentPage(page);
  };

  const convertDate = (isoDateString) => {
    let date = new Date(isoDateString);

    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${ONWARDREFERALLIST}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/clinic-information?clinicId=${clinicId}&clinicName=${clinicName}`
        );
        const result = await response.json();
        setParticipants(result);
      } catch (error) {
        console.error(error);
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
                  {currentTableData.map((participant) => (
                    <tr role="row">
                      <>
                        <td role="cell">
                          {convertDate(participant.body.Blood_Draw_Date.S)}
                        </td>
                        <td role="cell">
                          {convertDate(participant.body.Result_Creation.S)}
                        </td>
                        <td role="cell">
                          <a
                            href={`participant/${participant.body.Participant_Id.S}`}
                            role="link"
                          >
                            {participant.body.Participant_Name.S}
                          </a>
                        </td>
                      </>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalCount={participants.length}
                pageSize={20}
                onPageChange={(page) => onCurrentPageChange(page)}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  ) : (
    <LoggedOut showHeader={true} />
  );
}
