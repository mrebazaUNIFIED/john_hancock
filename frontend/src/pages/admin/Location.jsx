import React, { useState, useEffect } from "react";
import api from "./../../api";
import TableLocation from "../../components/table/TableLocation";

export default function Location() {

  const [locations, setLocation] = useState([])
  const [subLocations, setSubLocation] = useState([])

  useEffect(() => {
    getLocation()
    getSubLocation()
  }, []);

  const getLocation = () => {
    api.get("/api/sublocation/")
      .then((res) => setLocation(res.data))
      .catch((err) => alert("Error location: " + err));
  }

  const getSubLocation = () => {
    api.get("/api/location/")
      .then((res) => setSubLocation(res.data))
      .catch((err) => alert("Error location: " + err));
  }

  return (
    <div>
      <TableLocation locations={locations} sublocations = {subLocations} />
    </div>
  )
}
