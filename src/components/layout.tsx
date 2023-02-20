import React from "react";
import { type ReactNode, type FC } from "react";
import { themeTransition } from "../styles/global-vars";
import Sidebar from "./sidebar";
import { useTheme } from "./theme";

interface Props {
  children?: ReactNode;
}

export const Layout: FC<{ children: ReactNode }> = ({ children }: Props) => {
  const { themeType } = useTheme();
  return (
    <>
      <main
        className={`drawer-mobile drawer ${themeTransition}`}
        data-theme={themeType}
      >
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {children}
          <label
            htmlFor="my-drawer-2"
            className="btn-primary drawer-button btn lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <Sidebar />
      </main>
    </>
  );
};
