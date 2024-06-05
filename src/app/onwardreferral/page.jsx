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

  const participantsData = [
    {
      participantId: 0,
      resultsReceived: "No",
      participantName: "Ella Ray",
      bloodDrawDate: "01-06-2024",
    },
    {
      participantId: 1,
      resultsReceived: "Yes",
      participantName: "Gale Gray",
      bloodDrawDate: "14-02-2024",
    },
    {
      participantId: 2,
      resultsReceived: "Yes",
      participantName: "Ora Watson",
      bloodDrawDate: "08-03-2024",
    },
    {
      participantId: 3,
      resultsReceived: "No",
      participantName: "Eliza Mendez",
      bloodDrawDate: "17-01-2024",
    },
    {
      participantId: 4,
      resultsReceived: "Yes",
      participantName: "Letha Lyons",
      bloodDrawDate: "02-04-2024",
    },
    {
      participantId: 5,
      resultsReceived: "No",
      participantName: "Adeline Estes",
      bloodDrawDate: "15-04-2024",
    },
    {
      participantId: 6,
      resultsReceived: "Yes",
      participantName: "Terry Solis",
      bloodDrawDate: "18-01-2024",
    },
    {
      participantId: 7,
      resultsReceived: "Yes",
      participantName: "Chapman Alvarez",
      bloodDrawDate: "08-05-2024",
    },
    {
      participantId: 8,
      resultsReceived: "No",
      participantName: "Marguerite Cherry",
      bloodDrawDate: "13-03-2024",
    },
    {
      participantId: 9,
      resultsReceived: "No",
      participantName: "Gillespie Wooten",
      bloodDrawDate: "02-04-2024",
    },
    {
      participantId: 10,
      resultsReceived: "No",
      participantName: "Bobbie Salas",
      bloodDrawDate: "03-03-2024",
    },
    {
      participantId: 11,
      resultsReceived: "Yes",
      participantName: "Franklin Nieves",
      bloodDrawDate: "14-01-2024",
    },
    {
      participantId: 12,
      resultsReceived: "Yes",
      participantName: "Aileen Tillman",
      bloodDrawDate: "24-01-2024",
    },
    {
      participantId: 13,
      resultsReceived: "Yes",
      participantName: "Hubbard Raymond",
      bloodDrawDate: "27-03-2024",
    },
    {
      participantId: 14,
      resultsReceived: "No",
      participantName: "Hancock Farrell",
      bloodDrawDate: "03-03-2024",
    },
    {
      participantId: 15,
      resultsReceived: "Yes",
      participantName: "Natasha Tucker",
      bloodDrawDate: "20-03-2024",
    },
    {
      participantId: 16,
      resultsReceived: "Yes",
      participantName: "Clarke Robertson",
      bloodDrawDate: "25-01-2024",
    },
    {
      participantId: 17,
      resultsReceived: "Yes",
      participantName: "Rosa Delgado",
      bloodDrawDate: "15-04-2024",
    },
    {
      participantId: 18,
      resultsReceived: "Yes",
      participantName: "Marks Fuentes",
      bloodDrawDate: "30-05-2024",
    },
    {
      participantId: 19,
      resultsReceived: "No",
      participantName: "Ingram Burnett",
      bloodDrawDate: "07-04-2024",
    },
    {
      participantId: 20,
      resultsReceived: "No",
      participantName: "Lydia Berry",
      bloodDrawDate: "31-01-2024",
    },
    {
      participantId: 21,
      resultsReceived: "No",
      participantName: "Henrietta Leblanc",
      bloodDrawDate: "11-01-2024",
    },
    {
      participantId: 22,
      resultsReceived: "Yes",
      participantName: "Ramos Taylor",
      bloodDrawDate: "03-02-2024",
    },
    {
      participantId: 23,
      resultsReceived: "Yes",
      participantName: "Noel Parsons",
      bloodDrawDate: "14-01-2024",
    },
    {
      participantId: 24,
      resultsReceived: "Yes",
      participantName: "Manuela Haley",
      bloodDrawDate: "09-03-2024",
    },
    {
      participantId: 25,
      resultsReceived: "No",
      participantName: "Carroll Wilkerson",
      bloodDrawDate: "19-01-2024",
    },
    {
      participantId: 26,
      resultsReceived: "Yes",
      participantName: "Christian Mckinney",
      bloodDrawDate: "25-03-2024",
    },
    {
      participantId: 27,
      resultsReceived: "Yes",
      participantName: "Gwendolyn Curry",
      bloodDrawDate: "03-04-2024",
    },
    {
      participantId: 28,
      resultsReceived: "No",
      participantName: "Brandy Rodriquez",
      bloodDrawDate: "29-03-2024",
    },
    {
      participantId: 29,
      resultsReceived: "Yes",
      participantName: "Porter Guzman",
      bloodDrawDate: "18-02-2024",
    },
    {
      participantId: 30,
      resultsReceived: "No",
      participantName: "Deanna Sharpe",
      bloodDrawDate: "27-04-2024",
    },
    {
      participantId: 31,
      resultsReceived: "Yes",
      participantName: "Christina Slater",
      bloodDrawDate: "02-03-2024",
    },
    {
      participantId: 32,
      resultsReceived: "Yes",
      participantName: "Mia Hicks",
      bloodDrawDate: "04-04-2024",
    },
    {
      participantId: 33,
      resultsReceived: "Yes",
      participantName: "Beard Moss",
      bloodDrawDate: "15-05-2024",
    },
    {
      participantId: 34,
      resultsReceived: "No",
      participantName: "Nellie Dorsey",
      bloodDrawDate: "12-04-2024",
    },
    {
      participantId: 35,
      resultsReceived: "No",
      participantName: "Elisa Wolf",
      bloodDrawDate: "06-04-2024",
    },
    {
      participantId: 36,
      resultsReceived: "Yes",
      participantName: "Hunter Allen",
      bloodDrawDate: "17-03-2024",
    },
    {
      participantId: 37,
      resultsReceived: "Yes",
      participantName: "Ware Powell",
      bloodDrawDate: "31-01-2024",
    },
    {
      participantId: 38,
      resultsReceived: "No",
      participantName: "Aurora Mayer",
      bloodDrawDate: "07-01-2024",
    },
    {
      participantId: 39,
      resultsReceived: "Yes",
      participantName: "Ballard Daniel",
      bloodDrawDate: "25-04-2024",
    },
    {
      participantId: 40,
      resultsReceived: "No",
      participantName: "Herminia Ware",
      bloodDrawDate: "20-01-2024",
    },
    {
      participantId: 41,
      resultsReceived: "Yes",
      participantName: "Bowen Nichols",
      bloodDrawDate: "17-01-2024",
    },
    {
      participantId: 42,
      resultsReceived: "No",
      participantName: "Garza Sanchez",
      bloodDrawDate: "30-04-2024",
    },
    {
      participantId: 43,
      resultsReceived: "Yes",
      participantName: "Barry Welch",
      bloodDrawDate: "30-03-2024",
    },
    {
      participantId: 44,
      resultsReceived: "Yes",
      participantName: "Geneva Evans",
      bloodDrawDate: "03-05-2024",
    },
    {
      participantId: 45,
      resultsReceived: "No",
      participantName: "Rochelle Camacho",
      bloodDrawDate: "09-02-2024",
    },
    {
      participantId: 46,
      resultsReceived: "Yes",
      participantName: "Minerva Shaw",
      bloodDrawDate: "05-05-2024",
    },
    {
      participantId: 47,
      resultsReceived: "No",
      participantName: "Gentry Ferguson",
      bloodDrawDate: "27-05-2024",
    },
    {
      participantId: 48,
      resultsReceived: "No",
      participantName: "Harmon Massey",
      bloodDrawDate: "13-01-2024",
    },
    {
      participantId: 49,
      resultsReceived: "Yes",
      participantName: "Katharine Kennedy",
      bloodDrawDate: "02-03-2024",
    },
    {
      participantId: 50,
      resultsReceived: "No",
      participantName: "Young Hudson",
      bloodDrawDate: "24-02-2024",
    },
    {
      participantId: 51,
      resultsReceived: "No",
      participantName: "Carrie Mcgee",
      bloodDrawDate: "27-05-2024",
    },
    {
      participantId: 52,
      resultsReceived: "Yes",
      participantName: "Lindsey Callahan",
      bloodDrawDate: "30-04-2024",
    },
    {
      participantId: 53,
      resultsReceived: "No",
      participantName: "Munoz Haney",
      bloodDrawDate: "25-03-2024",
    },
    {
      participantId: 54,
      resultsReceived: "Yes",
      participantName: "Tyler Hahn",
      bloodDrawDate: "27-03-2024",
    },
    {
      participantId: 55,
      resultsReceived: "No",
      participantName: "Audra Cabrera",
      bloodDrawDate: "27-01-2024",
    },
    {
      participantId: 56,
      resultsReceived: "Yes",
      participantName: "Browning Ratliff",
      bloodDrawDate: "13-01-2024",
    },
    {
      participantId: 57,
      resultsReceived: "Yes",
      participantName: "Gomez Arnold",
      bloodDrawDate: "06-02-2024",
    },
    {
      participantId: 58,
      resultsReceived: "Yes",
      participantName: "Cruz Carr",
      bloodDrawDate: "23-02-2024",
    },
    {
      participantId: 59,
      resultsReceived: "Yes",
      participantName: "Estes Long",
      bloodDrawDate: "11-05-2024",
    },
    {
      participantId: 60,
      resultsReceived: "Yes",
      participantName: "Cara Snider",
      bloodDrawDate: "04-02-2024",
    },
    {
      participantId: 61,
      resultsReceived: "No",
      participantName: "Tucker Fitzgerald",
      bloodDrawDate: "31-05-2024",
    },
    {
      participantId: 62,
      resultsReceived: "No",
      participantName: "Sallie Carpenter",
      bloodDrawDate: "23-03-2024",
    },
    {
      participantId: 63,
      resultsReceived: "Yes",
      participantName: "Paula Robbins",
      bloodDrawDate: "26-01-2024",
    },
    {
      participantId: 64,
      resultsReceived: "No",
      participantName: "Spence Gallagher",
      bloodDrawDate: "08-05-2024",
    },
    {
      participantId: 65,
      resultsReceived: "Yes",
      participantName: "Lopez Gross",
      bloodDrawDate: "03-02-2024",
    },
    {
      participantId: 66,
      resultsReceived: "Yes",
      participantName: "Drake Leach",
      bloodDrawDate: "21-04-2024",
    },
    {
      participantId: 67,
      resultsReceived: "No",
      participantName: "James Richard",
      bloodDrawDate: "18-04-2024",
    },
    {
      participantId: 68,
      resultsReceived: "Yes",
      participantName: "Madeline Serrano",
      bloodDrawDate: "14-04-2024",
    },
    {
      participantId: 69,
      resultsReceived: "Yes",
      participantName: "Chang Barnes",
      bloodDrawDate: "15-05-2024",
    },
    {
      participantId: 70,
      resultsReceived: "No",
      participantName: "Stacy Cross",
      bloodDrawDate: "23-03-2024",
    },
    {
      participantId: 71,
      resultsReceived: "No",
      participantName: "Dora Ramirez",
      bloodDrawDate: "19-02-2024",
    },
    {
      participantId: 72,
      resultsReceived: "Yes",
      participantName: "Carson Cervantes",
      bloodDrawDate: "09-01-2024",
    },
    {
      participantId: 73,
      resultsReceived: "No",
      participantName: "Chan Norton",
      bloodDrawDate: "11-02-2024",
    },
  ];

  const firstPageIndex = (currentPage - 1) * 20;
  const lastPageIndex = Number(firstPageIndex) + Number(20);
  const currentTableData = participantsData.slice(
    firstPageIndex,
    lastPageIndex
  );

  const onCurrentPageChange = (page) => {
    setCurrentPage(page);
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
              <Pagination
                currentPage={currentPage}
                totalCount={participantsData.length}
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
