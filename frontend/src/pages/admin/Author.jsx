import TableAuthor from '../../components/table/TableAuthor';
import React, { useState, useEffect } from "react";
import api from "./../../api";

export default function Author() {
  const [authors, setAuthors] = useState([]);

  const getAuthors = () => {
    api.get("/api/author/")
      .then((res) => setAuthors(res.data))
      .catch((err) => alert("Error al cargar autores: " + err));
  }

  const handleAuthorDeleted = () => {
    getAuthors(); 
  };

  const handleAuthorEdited = () => {
    getAuthors(); 
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <div>
      <TableAuthor 
        authors={authors}
        onDeleteAuthor={handleAuthorDeleted}
        onEditAuthor={handleAuthorEdited}
      />
    </div>
  )
}