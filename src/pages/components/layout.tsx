import { ReactNode, useContext } from "react"
import { useState } from "react";
import { ThemeContext } from "../_app";
import Sidebar from "./sidebar"

interface Props {
    children?: ReactNode
}

export default function Layout({ children }: Props) {
    const theme = useContext(ThemeContext);
    return (
        <>
            <main className="drawer drawer-mobile transition" data-theme={theme}>
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