import React, { useState, useEffect } from "react";
import api from "./../../api";

export default function Recommendation() {

    const [periods, setPeriods] = useState([]);

    const getPeriods = () => {
        api.get("/api/period/")
            .then((res) => setPeriods(res.data.slice(0,4)))
            .catch((err) => alert("Error al cargar los periodos: " + err));
    }


    //Efect
    useEffect(() => {
        getPeriods()
    }, []);


    return (
        <div className="mx-auto max-w-7xl px-4">
            {/* Header */}
            <div className='text-center my-10'>
                <p className='text-[#AB0C2F] font-serif italic tracking-wide'>
                    RESEARCH AT YOUR PACE
                </p>
                <p className='font-bold text-4xl pt-2'>
                    Search by <span className='text-[#AB0C2F]'>Period</span>
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {periods.map((period, index) => (
                    <a
                        href="#"
                        key={index}
                        className="relative rounded overflow-hidden group h-[450px] cursor-pointer"
                    >
                        {/* Image */}
                        <img
                            src={period.image}
                            alt={period.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                        />

                        {/* Overlay oscuro */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Text */}
                        <div className="absolute bottom-4 left-4 text-white z-10">
                            <h3 className="font-semibold text-lg underline">{period.name}</h3>
                            <p className="text-sm">{period.year_start.substring(0, 4)} - {period.year_end && (
                        <>

                          {(() => {
                            const [year, month, day] = period.year_end.split("-");
                            return month === "12" && day === "31"
                              ? parseInt(year) + 1
                              : year;
                          })()}
                        </>
                      )}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
