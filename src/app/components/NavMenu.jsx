"use client";
import Link from "next/link";
import "../styles/css/sass.css";
import { signOut } from "next-auth/react";

// Navigation Menu
export default function NavMenu() {
  return (
    <nav
      className="nhsuk-navigation"
      id="header-navigation"
      role="navigation"
      aria-label="Primary navigation"
    >
      <ul class="nhsuk-header__navigation-list">
        <li class="nhsuk-header__navigation-item">
          <Link className="nhsuk-header__navigation-link" href="/">
            Clinic Summary
          </Link>
        </li>
        <li class="nhsuk-header__navigation-item">
          <Link
            className="nhsuk-header__navigation-link"
            href="/views/invitation_planning"
          >
            Invitation Variables
          </Link>
        </li>
        <li
          class="nhsuk-header__navigation-item"
          style={{ marginLeft: "auto" }}
        >
          <a
            class="nhsuk-header__navigation-link"
            style={{ cursor: "pointer" }}
            onClick={() => signOut({ callbackUrl: "/signin" })}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Space") {
                // Handle the keyboard interaction, e.g., trigger the same action as onClick
                signOut();
              }
            }}
            tabIndex="0" // Ensure the element is focusable
          >
            Sign Out
          </a>
        </li>
      </ul>
    </nav>
  );
}
