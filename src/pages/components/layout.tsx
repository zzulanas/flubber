import { ReactNode, useContext } from "react"
import { useState } from "react";
import { theme_transition } from "../../styles/global-vars";
import Sidebar from "./sidebar"
import { useTheme } from "./theme";

interface Props {
    children?: ReactNode
}

export default function Layout({ children }: Props) {
    const {themeType} = useTheme();
    return (
        <>
            <main className={`drawer drawer-mobile ${theme_transition}`} data-theme={themeType}>
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {children}
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
                    </div>
                    <Sidebar/>
                </main>
        </>
    )
}