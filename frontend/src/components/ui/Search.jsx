import React, { useState, useEffect } from "react";
import api from "./../../api";
import { useNavigate } from "react-router-dom";


export default function Search() {
  // Variables de estado
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);


  // Estados para búsquedas individuales
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchRecipient, setSearchRecipient] = useState("");
  const [searchPeriod, setSearchPeriod] = useState("");

  // Estados para límite de elementos
  const [visibleAuthors, setVisibleAuthors] = useState(10);
  const [visibleRecipients, setVisibleRecipients] = useState(10);
  const [visiblePeriods, setVisiblePeriods] = useState(10);

  const [periods, setPeriods] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [posts, setPosts] = useState([]);

  //Dates search
  const [initDate, setInitDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [searchType, setSearchType] = useState('specific'); // 'specific' o 'range'
  const [specificDate, setSpecificDate] = useState("");

  const navigate = useNavigate();

  const handleNavigate = (type, id, search) => {
    navigate(`/files?type=${type}&id=${id}&search=${search}`);
    window.scrollTo(0, 0);
  };

  const handleNavigateTimes = () => {
    const formatDate = (date) => {
      return date ? new Date(date).toISOString().split("T")[0] : "";
    };

    if (searchType === 'specific') {
      const formattedDate = formatDate(specificDate);
      navigate(`/files?type=datespecific&date=${formattedDate}`);
    } else {
      const formattedInit = formatDate(initDate);
      const formattedEnd = formatDate(endDate);
      navigate(`/files?type=daterange&init=${formattedInit}&end=${formattedEnd}`);
    }
    window.scrollTo(0, 0);
  };

  const enableTimes = () => {
    if (searchType === 'specific') {
      return specificDate !== "";
    }
    return initDate !== "" && endDate !== "";
  };


  useEffect(() => {
    if (periods.length === 0) getPeriods();
    if (authors.length === 0) getAuthors();
    if (recipients.length === 0) getRecipients();
    if (posts.length === 0) getPosts();
  }, []);

  useEffect(() => {
    if (searchType === 'specific') {
      setInitDate("");
      setEndDate("");
    } else {
      setSpecificDate("");
    }
  }, [searchType]);

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
      {/* Contenedores de filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl ">
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
                onClick={() => handleNavigate("author", item.id, `${item.last_name}, ${item.name}`)}
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
                onClick={() => setVisibleAuthors(10)}
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
                onClick={() => handleNavigate("recipient", item.id, `${item.last_name}, ${item.name}`)}
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
                onClick={() => setVisibleRecipients(10)}
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
            placeholder="Document sources..."
            className="mb-2 p-2 text-sm border rounded w-full outline-none bg-white"
            value={searchPeriod}
            onChange={(e) => setSearchPeriod(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            {filteredPeriods.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate("institution", item.id, `${item.name}`)}
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
                onClick={() => setVisiblePeriods(10)}
              >
                Show less...
              </button>
            )}
          </div>
        </div>




      </div>

      <div className="mx-auto max-w-7xl px-4 ">
        {/* Header */}
        <div className='text-center'>
          <p className='text-[#AB0C2F] font-serif italic tracking-wide'>
            RESEARCH AT YOUR PACE
          </p>
          <p className='font-bold text-4xl pt-2'>
            Search by  <span className='text-[#AB0C2F]'>Date Range</span>
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-5xl">
        <div className="flex flex-col p-3 col-start-2 col-span-1">
          <div className="bg-[#b60000] text-white font-semibold px-2 py-1 rounded mb-2 text-center text-sm">
            <p className="p-2 text-left">Search by Date</p>
          </div>

          <div className="flex flex-col gap-2">
            {/* Selector de tipo de búsqueda */}
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="dateType"
                  value="specific"
                  checked={searchType === 'specific'}
                  onChange={() => setSearchType('specific')}
                  className="text-[#b60000] focus:ring-[#b60000]"
                />
                Specific Date
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="dateType"
                  value="range"
                  checked={searchType === 'range'}
                  onChange={() => setSearchType('range')}
                  className="text-[#b60000] focus:ring-[#b60000]"
                />
                Date Range
              </label>
            </div>

            {/* Campos de fecha según el tipo seleccionado */}
            {searchType === 'specific' ? (
              <div className="flex flex-col bg-[#f1efe9] p-3 rounded">
                <label className="text-sm font-medium text-gray-700 mb-1">Select Date:</label>
                <input
                  type="date"
                  value={specificDate}
                  onChange={(e) => setSpecificDate(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b60000]"
                />
              </div>
            ) : (
              <>
                <div className="flex flex-col bg-[#f1efe9] p-3 rounded">
                  <label className="text-sm font-medium text-gray-700 mb-1">From:</label>
                  <input
                    type="date"
                    value={initDate}
                    onChange={(e) => setInitDate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b60000]"
                  />
                </div>
                <div className="flex flex-col bg-[#f1efe9] p-3 rounded">
                  <label className="text-sm font-medium text-gray-700 mb-1">To:</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b60000]"
                  />
                </div>
              </>
            )}

            {/* Botón de búsqueda */}
            <button
              onClick={handleNavigateTimes}
              disabled={!enableTimes()}
              className={`mt-3 font-semibold py-2 rounded transition cursor-pointer text-center 
        ${enableTimes() ? 'bg-[#797575] text-white hover:bg-red-700' : 'bg-gray-400 text-white cursor-not-allowed'}`}
            >
              Search
            </button>
          </div>
        </div>
      </div>



    </div>
  );
}