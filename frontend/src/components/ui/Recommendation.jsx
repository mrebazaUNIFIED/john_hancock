import React, { useState, useEffect } from "react";
import api from "./../../api";

export default function Recommendation() {

    const [periods, setPeriods] = useState([]);

    const getPeriods = () => {
        api.get("/api/period/")
            .then((res) => setPeriods(res.data.slice(0, 4)))
            .catch((err) => alert("Error al cargar los periodos: " + err));
    }

    const [searchTerm, setSearchTerm] = useState("");
    //Efect
    useEffect(() => {
        getPeriods()
    }, []);


    return (
        <>
            <div className="p-8 flex flex-col items-center gap-8">
                <div className="flex items-center gap-4 bg-white shadow px-6 py-4 rounded-md w-full max-w-3xl">
                    <input
                        type="text"
                        placeholder="Type Your Question here using Dr. JMG's AI"
                        className="flex-grow outline-none bg-transparent text-sm border border-gray-300 rounded-md p-3 placeholder:text-[#c9b3b3] placeholder:font-bold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="bg-[#b60000] text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition">
                        Search Documents
                    </button>
                </div>
            </div>


        </>

    );
}
