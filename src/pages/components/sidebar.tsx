// Sidebar component for main page
import type { Session } from "next-auth";
import Image from "next/image";
import type { FC } from "react";

interface SidebarProps {
    sessionData: Session
}

const Sidebar: FC<SidebarProps> = ({sessionData}) => {
    return (
        <div>
            <h1 className="text-white text-4xl">Hello {sessionData?.user.name}</h1>
            { sessionData?.user.image && <Image 
                src={sessionData?.user.image}
                alt="User Profile Image"
                width={100}
                height={100}></Image> }
        </div>
    )
}

export default Sidebar;