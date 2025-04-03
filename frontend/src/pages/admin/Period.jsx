import React, { useState, useEffect } from "react";
import api from "./../../api";
import TablePeriod from "../../components/table/TablePeriod";

export default function Period() {
  
  const [periods, setPeriods] = useState([]);

  const getPeriods = () => {
    api.get("/api/period/")
      .then((res) => setPeriods(res.data))
      .catch((err) => alert("Error al cargar los periodos: " + err));
  }

  useEffect(() => {
      getPeriods()
    }, []);

  
  const refresh = () => {
    getPeriods();
  };

  return (
    <div>
      <TablePeriod  periods = {periods} refresh = {refresh}/>
    </div>
  )
}
