"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { SignOutButton } from "../sign-out";
import ThemeSwitcher from "./ThemeSwitcher";
import NavigatorSelector from "/components/layout/NavigatorSelector";
import LeftNavigation from "/components/layout/LeftNavigation";
import SignInButton from "../sign-in";

export default function LeftNavEntire({ setEditing }) {
  const session = useSession();
  return (
    <div
      className={`bg-base-300 no-scrollbar relative z-50 flex h-full flex-col justify-between gap-4 overflow-y-scroll px-4 pt-2 pb-8 drop-shadow-lg`}
    >
      <div>
        <div className={`mb-4`}>
          <div className={`text-[57px] font-black italic antialiased`}>
            <a href={`/`}>
              <span
                className={`text-secondary relative z-10 shadow-black drop-shadow-lg`}
              >
                ED
              </span>
              <span className={`text-accent relative z-0 -ml-[12px]`}>NAV</span>
            </a>
          </div>
          <div
            className={`text-base-content -mt-3 text-[18px] font-light tracking-widest uppercase`}
          >
            <p className={`leading-4 tracking-[2px]`}>SUCCESS TRACKER</p>
          </div>
        </div>
        {/*<SearchField/>*/}
        <LeftNavigation setEditing={setEditing} />
      </div>

      <div className={`mb-2`}>
        {session.data.user["level"] !== "navigator" ? (
          <NavigatorSelector />
        ) : null}
        <ThemeSwitcher />
        <div className={`bg-base-200 mt-8 flex flex-col rounded-lg p-3`}>
          <div className={`text-sm`}>{session.data.user.name}</div>
          <div className={`text-xs`}>{session.data.user.email}</div>
          <div className={`mb-4 text-xs`}>{session.data.user["level"]}</div>
          {session.status === "authenticated" ? (
            <SignOutButton />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
}
