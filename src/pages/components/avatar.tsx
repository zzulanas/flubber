import { useSession } from "next-auth/react";
import { FC } from "react";
import Image from "next/image";

const Avatar: FC = () => {
    const {data: sessionData} = useSession();
    const greeting = () => {
        const greetings = [
            "hi",
            "howdy",
            "hello",
            "what's up"
        ]
        return greetings[(Math.floor(Math.random()*greetings.length))]
    }
    
    return (
        <div className="flex justify-center">
            <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {sessionData?.user.image && <Image 
                    src={sessionData?.user.image}
                    alt="User Profile Image"
                    width={100}
                    height={100}></Image> }
                </div>
            </div>
            <h1 className="text-grey text-2xl text-center ml-5">hi {sessionData?.user.name} 👋</h1>
        </div>
    )
}

export default Avatar