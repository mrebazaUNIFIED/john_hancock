import React, { useState, useEffect } from "react";
import api from "./../../api";
import TableRecipient from '../../components/table/TableRecipient'


export default function Recipient() {

  const [recipients, setRecipient] = useState([]);

  const getRecipient = () => {
    api.get("/api/recipient/")
      .then((res) => setRecipient(res.data))
      .catch((err) => alert("Error al cargar los periodos: " + err));
  }


  const handleRecipientDeleted = () => {
    getRecipient();
  };

  const handleRecipientEdited = () => {
    getRecipient();
  };


  useEffect(() => {
    getRecipient()
  }, []);



  return (
    <div>
      <TableRecipient recipients={recipients} onDeleteRecipient={handleRecipientDeleted}
        onEditRecipient={handleRecipientEdited} />
    </div>
  )
}

