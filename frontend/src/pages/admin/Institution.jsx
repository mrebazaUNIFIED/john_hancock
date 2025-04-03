import React, { useState, useEffect } from "react";
import api from "./../../api";
import TableInstitution from "../../components/table/TableInstitution";

export default function Institution() {

  const [institutions, setInstitution] = useState([])

  useEffect(() => {
    getInstitution()
  }, []);

  const getInstitution = () => {
    api.get("/api/institution/")
      .then((res) => setInstitution(res.data))
      .catch((err) => alert("Error institution: " + err));
  }

  const refresh = () =>{
    getInstitution()
  }

  return (
    <div>
      <TableInstitution institutions={institutions} refresh = {refresh}/>
    </div>
  )
}
