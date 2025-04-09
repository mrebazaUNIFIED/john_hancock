import React, { useState, useEffect } from "react";
import api from "./../../api";
import { useNavigate } from "react-router-dom";


export default function Search() {
  // Variables de estado
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para búsquedas individuales
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchRecipient, setSearchRecipient] = useState("");
  const [searchPeriod, setSearchPeriod] = useState("");

  // Estados para límite de elementos
  const [visibleAuthors, setVisibleAuthors] = useState(20);
  const [visibleRecipients, setVisibleRecipients] = useState(20);
  const [visiblePeriods, setVisiblePeriods] = useState(20);

  const [periods, setPeriods] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const handleNavigate = (type, id,search) => {
    navigate(`/files?type=${type}&id=${id}&search=${search}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (periods.length === 0) getPeriods();
    if (authors.length === 0) getAuthors();
    if (recipients.length === 0) getRecipients();
    if (posts.length === 0) getPosts();
  }, []);

  // Funciones para obtener datos
  const getPeriods = () => {
    api.get("/api/institution/")
      .then((res) => setPeriods(res.data))
      .catch((err) => alert("Error al cargar los periodos: " + err));
  }

  const getAuthors = () => {
    api.get("/api/author/")
      .then((res) => setAuthors(res.data))
      .catch((err) => alert("Error al cargar los autores: " + err));
  }

  const getRecipients = () => {
    api.get("/api/recipient/")
      .then((res) => setRecipients(res.data))
      .catch((err) => alert("Error al cargar los destinatarios: " + err));
  }

  const getPosts = () => {
    api.get("/api/post/")
      .then((res) => setPosts(res.data))
      .catch((err) => alert("Error al cargar los Posts: " + err));
  }

  const getPostsByAuthor = (authorId) => {
    const filteredPosts = posts.filter(post => post.author.id === authorId);
    return filteredPosts;
  };

  const getPostsByRecipient = (recipientId) => {
    const filteredPosts = posts.filter(post => post.recipient.id === recipientId);
    return filteredPosts;
  };

  const getPostByPeriod = (periodId) => {
    const filteredPosts = posts.filter(post => post.institution.id === periodId);
    return filteredPosts;
  };

  // Filtrar datos
  const filteredAuthors = authors.filter(item =>
    `${item.name} ${item.last_name}`.toLowerCase().includes(searchAuthor.toLowerCase())
  ).slice(0, visibleAuthors);

  const filteredRecipients = recipients.filter(item =>
    `${item.name} ${item.last_name}`.toLowerCase().includes(searchRecipient.toLowerCase())
  ).slice(0, visibleRecipients);

  const filteredPeriods = periods.filter(item =>
    item.name.toLowerCase().includes(searchPeriod.toLowerCase())
  ).slice(0, visiblePeriods);

  return (
    <div className="p-8 flex flex-col items-center gap-8">
      {/* Search Input principal */}
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

      {/* Contenedores de filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl">

        {/* Bloque Author */}
        <div className="flex flex-col p-3">
          <div className="bg-[#b60000] text-white font-semibold px-2 py-1 rounded mb-2 text-center text-sm">
            <p className="p-2 text-left">Author</p>
          </div>
          <input
            type="text"
            placeholder="Search authors..."
            className="mb-2 p-2 text-sm border rounded w-full outline-none bg-white"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            {filteredAuthors.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate("author", item.id,`${item.last_name}, ${item.name}`)}
                className={`text-left cursor-pointer  text-sm px-2 py-1 rounded ${selectedAuthor === item.id
                  ? "bg-[#b60000] text-white"
                  : "bg-[#f1efe9] hover:bg-[#b60000] hover:text-white"
                  }`}
              >
                {item.last_name}, {item.name} ({getPostsByAuthor(item.id).length})

              </button>
            ))}
            {authors.length > visibleAuthors && (
              <button
                className="text-[#b60000] text-sm font-semibold mt-2 hover:underline cursor-pointer"
                onClick={() => setVisibleAuthors((prev) => prev + 200)}
              >
                Show more...
              </button>
            )}

            {visibleAuthors > 20 && (
              <button
                className="text-[#b60000] text-sm font-semibold mt-2 hover:underline cursor-pointer"
                onClick={() => setVisibleAuthors(20)}
              >
                Show less...
              </button>
            )}
          </div>
        </div>

        {/* Bloque Recipient */}
        <div className="flex flex-col p-3">
          <div className="bg-[#b60000] text-white font-semibold px-2 py-1 rounded mb-2 text-center text-sm">
            <p className="p-2 text-left">Recipient</p>
          </div>
          <input
            type="text"
            placeholder="Search recipients..."
            className="mb-2 p-2 text-sm border rounded w-full outline-none bg-white"
            value={searchRecipient}
            onChange={(e) => setSearchRecipient(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            {filteredRecipients.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate("recipient", item.id,`${item.last_name}, ${item.name}`)}
                className={`text-left text-sm px-2 py-1 rounded cursor-pointer ${selectedRecipient === item.id
                  ? "bg-[#b60000] text-white"
                  : "bg-[#f1efe9]  hover:bg-[#b60000] hover:text-white"
                  }`}
              >
                {item.last_name}, {item.name} ({getPostsByRecipient(item.id).length})
              </button>
            ))}
            {recipients.length > visibleRecipients && (
              <button
                className="text-[#b60000] text-sm font-semibold mt-2 hover:underline cursor-pointer"
                onClick={() => setVisibleRecipients(prev => prev + 200)}
              >
                Show more...
              </button>
            )}
            {visibleRecipients > 20 && (
              <button
                className="text-[#b60000] text-sm font-semibold mt-2 hover:underline cursor-pointer"
                onClick={() => setVisibleRecipients(20)}
              >
                Show less...
              </button>
            )}
          </div>
        </div>

        {/* Bloque Document Source */}
        <div className="flex flex-col p-3">
          <div className="bg-[#b60000] text-white font-semibold px-2 py-1 rounded mb-2 text-center text-sm">
            <p className="p-2 text-left">Document Source</p>
          </div>
          <input
            type="text"
            placeholder="Search periods..."
            className="mb-2 p-2 text-sm border rounded w-full outline-none bg-white"
            value={searchPeriod}
            onChange={(e) => setSearchPeriod(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            {filteredPeriods.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate("institution", item.id,`${item.name}`)}
                className={`text-left text-sm px-2 py-1 rounded cursor-pointer ${selectedPeriod === item.id
                  ? "bg-[#b60000] text-white"
                  : "bg-[#f1efe9] hover:bg-[#b60000] hover:text-white"
                  }`}
              >
                {item.name} ({getPostByPeriod(item.id).length})
              </button>
            ))}
            {periods.length > visiblePeriods && (
              <button
                className="text-[#b60000] text-sm font-semibold mt-2 hover:underline cursor-pointer"
                onClick={() => setVisiblePeriods(prev => prev + 50)}
              >
                Show more...
              </button>
            )}
            {visiblePeriods > 20 && (
              <button
                className="text-[#b60000] text-sm font-semibold mt-2 hover:underline cursor-pointer"
                onClick={() => setVisiblePeriods(20)}
              >
                Show less...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}