import { useState } from "react";

export default function DetailForm() {
    const [name, setName] = useState("Terry Tan");
    const [sex, setSex] = useState("Male");
    const [NRIC, setNRIC] = useState("S9999288C");
    const [address, setAddress] = useState("Blk 100 NTU CRESCENT #10-142");
    return (
        <div className="h-5/6 border-[3px] border-cyan-600 w-5/6 p-20 rounded-[150px] flex items-center justify-center bg-white text-black">
            <div className="flex flex-col gap-10 w-full h-full justify-center">
                <div>
                    <label className="text-gray-500 pl-2">Name</label>
                    <input className="w-full px-2 bg-white border-2 py-2 rounded-lg" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label className="text-gray-500 pl-2">Sex</label>
                    <input className="w-full px-2 bg-white border-2 py-2 rounded-lg" value={sex} onChange={(e)=>setSex(e.target.value)}/>
                </div>
                <div>
                    <label className="text-gray-500 pl-2">NRIC</label>
                    <input className="w-full px-2 bg-white border-2 py-2 rounded-lg" value={NRIC} onChange={(e)=>setNRIC(e.target.value)}/>
                </div>
                <div>
                    <label className="text-gray-500 pl-2">Address</label>
                    <input className="w-full px-2 bg-white border-2 py-2 rounded-lg" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </div>
            </div>
        </div>
    );
}
