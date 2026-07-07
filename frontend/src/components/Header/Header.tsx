import {Mail, PencilSparkles} from 'lucide-react';
export function Header() {
    return (
        <>
            <div className={"w-full flex justify-center"}>
                <div className={"flex  items-center bg-indigo-100 w-[40%] p-3 justify-evenly rounded-xl  mt-2 shadow-md"}>
                    <Mail size={30} className="text-indigo-600"/>
                    <div className="text-2xl font-semibold text-indigo-900 tracking-tight">Smart AI Email Assistant</div>
                    <PencilSparkles size={30} className="text-indigo-600"/>
                </div>
            </div>


        </>
    )
}