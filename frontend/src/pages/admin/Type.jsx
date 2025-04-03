import React, { useState, useEffect } from "react";
import api from "./../../api";
import TableType from "../../components/table/TableType";

export default function Type() {

  const [types, setType] = useState([])

  useEffect(() => {
    getType()
  }, []);

  const getType = () => {
    api.get("/api/type/")
      .then((res) => setType(res.data))
      .catch((err) => alert("Error type: " + err));
  }

  const refresh = () =>{
    getType()
  }

  return (
    <div>
      <TableType types={types} refresh = {refresh}/>
    </div>
  )
}
