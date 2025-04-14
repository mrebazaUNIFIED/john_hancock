import React, { useState, useEffect } from "react";
import {
    Grid,
    Paper,
    Pagination,
} from '@mui/material';
import { useSearchParams, useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import api from '../api';



export default function FilesPage() {
    const [searchParams] = useSearchParams();

    const type = searchParams.get("type");
    const id = searchParams.get("id");
    const search = searchParams.get("search");
    const dateSpecific = searchParams.get("date");
    const dateInit = searchParams.get("init");
    const dateEnd = searchParams.get("end");

    const [institutions, setinstitutions] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [periods, setPeriods] = useState([])
    const [sublocations, setSublocations] = useState([])

    const [searchAuthor, setSearchAuthor] = useState("");
    const [searchRecipient, setSearchRecipient] = useState("");
    const [searchinstitution, setSearchinstitution] = useState("");
    const [authorLimit, setAuthorLimit] = useState(10);
    const [recipientLimit, setRecipientLimit] = useState(10);
    const [institutionLimit, setinstitutionLimit] = useState(10);



    const [posts, setPosts] = useState([]);
    const [searchFiles, setSearchFiles] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);


    //search cada uno

    const [searchAuthor2, setSearchAuthor2] = useState("");
    const [searchRecipient2, setSearchRecipient2] = useState("");
    const [searchinstitution2, setSearchinstitution2] = useState("");
    const [searchPeriod2, setSearchPeriod2] = useState("");
    const [searchSublocation2, setSearchSublocation2] = useState("");

    //Filtros de cada uno
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [selectedRecipient, setSelectedRecipient] = useState("");
    const [selectedInstitution, setSelectedInstitution] = useState("");
    const [selectedPeriod, setSelectedPeriod] = useState("");
    const [selectedSublocation, setSelectedSublocation] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const getFilterName = () => {
        if (type === 'author') {
            const author = authors.find(a => String(a.id) === id);
            return author ? `${author.last_name}, ${author.name}` : '';
        }
        if (type === 'recipient') {
            const recipient = recipients.find(r => String(r.id) === id);
            return recipient ? `${recipient.last_name}, ${recipient.name}` : '';
        }
        if (type === 'institution') {
            const institution = institutions.find(p => String(p.id) === id);
            return institution ? institution.name : '';
        }
        return '';
    };

    const getPostsByAuthor = (authorId) => {
        const filteredPosts = posts.filter(post => post.author.id === authorId);
        return filteredPosts;
    };

    const getPostsByRecipient = (recipientId) => {
        const filteredPosts = posts.filter(post => post.recipient.id === recipientId);
        return filteredPosts;
    };

    const getPostByinstitution = (institutionId) => {
        const filteredPosts = posts.filter(post => post.institution.id === institutionId);
        return filteredPosts;
    };



    useEffect(() => {
        if (institutions.length === 0) getinstitutions();
        if (authors.length === 0) getAuthors();
        if (recipients.length === 0) getRecipients();
        if (posts.length === 0) getPosts();
        if (periods.length === 0) getPeriods();
        if (sublocations.length === 0) getSublocations();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        // Resetear todos los filtros al cambiar tipo o id
        setSelectedAuthor("");
        setSelectedRecipient("");
        setSelectedInstitution("");
        setSelectedPeriod("");
        setSelectedSublocation("");
    }, [type, id, search]);

    useEffect(() => {
        setCurrentPage(1);
    }, [type, id, search]);

    useEffect(() => {
        const updateSearchFiles = () => {
            if (type === 'author') {
                const author = authors.find(a => String(a.id) === id);
                if (author) {
                    const filteredPosts = posts.filter(post => post.author?.id === author.id);
                    setSearchFiles(filteredPosts);
                } else {
                    setSearchFiles([]);
                }
            } else if (type === 'recipient') {
                const recipient = recipients.find(r => String(r.id) === id);
                if (recipient) {
                    const filteredPosts = posts.filter(post => post.recipient?.id === recipient.id);
                    setSearchFiles(filteredPosts);
                } else {
                    setSearchFiles([]);
                }
            } else if (type === 'institution') {
                const institution = institutions.find(p => String(p.id) === id);
                if (institution) {
                    const filteredPosts = posts.filter(post => post.institution?.id === institution.id);
                    setSearchFiles(filteredPosts);
                } else {
                    setSearchFiles([]);
                }
            } else if (type === 'datespecific' && dateSpecific) {
                // Formato esperado: YYYY-MM-DD
                const filteredPosts = posts.filter(post => post.date === dateSpecific);
                setSearchFiles(filteredPosts);
            } else if (type === 'daterange' && dateInit && dateEnd) {
                const start = new Date(dateInit);
                const end = new Date(dateEnd);

                const filteredPosts = posts.filter(post => {
                    const postDate = new Date(post.date);
                    return postDate >= start && postDate <= end;
                });
                setSearchFiles(filteredPosts);
            } else {
                setSearchFiles([]);
            }
        };

        updateSearchFiles();
    }, [type, id, authors, recipients, institutions, posts, dateSpecific, dateInit, dateEnd]);



    useEffect(() => {
        let filtered = [...searchFiles];

        if (selectedAuthor) {
            filtered = filtered.filter(post => post.author?.id === selectedAuthor);
        }
        if (selectedRecipient) {
            filtered = filtered.filter(post => post.recipient?.id === selectedRecipient);
        }
        if (selectedInstitution) {
            filtered = filtered.filter(post => post.institution?.id === selectedInstitution);
        }
        if (selectedPeriod) {
            filtered = filtered.filter(post => post.period?.id === selectedPeriod);
        }
        if (selectedSublocation) {
            filtered = filtered.filter(post => post.sublocation?.id === selectedSublocation);
        }

        setFilteredPosts(filtered);
        setCurrentPage(1); // Reiniciar a la primera página al cambiar filtros
    }, [searchFiles, selectedAuthor, selectedRecipient, selectedInstitution, selectedPeriod, selectedSublocation]);

    const getinstitutions = () => {
        api.get("/api/institution/")
            .then((res) => setinstitutions(res.data))
            .catch((err) => alert("Error al cargar los institutionos2: " + err));
    }

    const getAuthors = () => {
        api.get("/api/author/")
            .then((res) => setAuthors(res.data))
            .catch((err) => alert("Error al cargar los autores2: " + err));
    }

    const getRecipients = () => {
        api.get("/api/recipient/")
            .then((res) => setRecipients(res.data))
            .catch((err) => alert("Error al cargar los destinatarios2: " + err));
    }

    const getPosts = () => {
        api.get("/api/post/")
            .then((res) => setPosts(res.data))
            .catch((err) => alert("Error al cargar los Posts2: " + err));
    }

    const getPeriods = () => {
        api.get("/api/period/")
            .then((res) => setPeriods(res.data))
            .catch((err) => alert("Error al cargar los Periods2: " + err));
    }

    const getSublocations = () => {
        api.get("/api/sublocation/")
            .then((res) => setSublocations(res.data))
            .catch((err) => alert("Error al cargar los Sublocations2: " + err));
    }

    const filteredAuthors = authors.filter(author =>
        author.name.toLowerCase().includes(searchAuthor.toLowerCase()) ||
        author.last_name.toLowerCase().includes(searchAuthor.toLowerCase())
    ).slice(0, authorLimit);

    const filteredRecipients = recipients.filter(recipient =>
        recipient.name.toLowerCase().includes(searchRecipient.toLowerCase()) ||
        recipient.last_name.toLowerCase().includes(searchRecipient.toLowerCase())
    ).slice(0, recipientLimit);

    const filteredinstitutions = institutions.filter(institution =>
        institution.name.toLowerCase().includes(searchinstitution.toLowerCase())
    ).slice(0, institutionLimit);


    //Filtros para seleccionar

    const authorsFromPosts = Array.from(new Set(
        searchFiles.map(post => post.author)
            .filter(author => author)
            .map(author => JSON.stringify(author))
    )).map(authorStr => JSON.parse(authorStr))

    const filteredAuthorsSearch = authorsFromPosts.filter(author =>
        author.name.toLowerCase().includes(searchAuthor2.toLowerCase()) ||
        author.last_name.toLowerCase().includes(searchAuthor2.toLowerCase())
    )

    const recipientsFromPosts = Array.from(new Set(
        searchFiles.map(post => post.recipient)
            .filter(recipient => recipient)
            .map(recipient => JSON.stringify(recipient))
    )).map(recipientStr => JSON.parse(recipientStr))


    const filteredRecipientsSearch = recipientsFromPosts.filter(recipient =>
        recipient.name.toLowerCase().includes(searchRecipient2.toLowerCase()) ||
        recipient.last_name.toLowerCase().includes(searchRecipient2.toLowerCase())
    )


    const institutionsFromPosts = Array.from(new Set(
        searchFiles.map(post => post.institution)
            .filter(inst => inst)
            .map(inst => JSON.stringify(inst))
    )).map(instStr => JSON.parse(instStr))


    const filteredInstitutionsSearch = institutionsFromPosts.filter(institution =>
        institution.name.toLowerCase().includes(searchinstitution2.toLowerCase())
    )

    const periodsFromPosts = Array.from(new Set(
        searchFiles.map(post => post.period)
            .filter(p => p)
            .map(p => JSON.stringify(p))
    )).map(pStr => JSON.parse(pStr))

    const filteredPeriodsSearch = periodsFromPosts.filter(period =>
        period.name.toLowerCase().includes(searchPeriod2.toLowerCase())
    )

    const sublocationsFromPosts = Array.from(new Set(
        searchFiles.map(post => post.sublocation)
            .filter(s => s)
            .map(s => JSON.stringify(s))
    )).map(sStr => JSON.parse(sStr))

    const filteredSublocationsSearch = sublocationsFromPosts.filter(sublocation =>
        sublocation.name.toLowerCase().includes(searchSublocation2.toLowerCase())
    )

    const handleSelectAuthor = (id) => {
        setSelectedAuthor(prev => (prev === id ? null : id));
    };

    const handleSelectRecipient = (id) => {
        setSelectedRecipient(prev => (prev === id ? null : id));
    };

    const handleSelectInstitution = (id) => {
        setSelectedInstitution(prev => (prev === id ? null : id));
    };

    const handleSelectPeriod = (id) => {
        setSelectedPeriod(prev => (prev === id ? null : id));
    };

    const handleSelectSublocation = (id) => {
        setSelectedSublocation(prev => (prev === id ? null : id));
    };

    const formatReadableDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };



    return (
        <div className="min-h-screen my-5">
            <div className="container mx-auto max-w-7xl">

                <Grid container spacing={4}>
                    {/* Sidebar */}
                    <Grid item xs={12} md={2.5}>

                        <Paper className=" mb-6 p-2">
                            <img src="./imagen_file.png" alt="image_file" className='w-full h-[200px]' />
                            <div className='bg-[#004059] mb-2'>
                                <p className="text-white ml-2 uppercase">
                                    {type === 'datespecific' ? 'Date Specific' : type === 'daterange' ? 'Date Range' : type}
                                </p>

                            </div>
                            <hr className='text-gray-400' />
                            <div className="flex items-center bg-gray-100 p-2 rounded ">
                                <span className="ml-2 text-[#004059] font-semibold">
                                    {type === 'datespecific' && dateSpecific
                                        ? formatReadableDate(dateSpecific)
                                        : type === 'daterange' && dateInit && dateEnd
                                            ? `${formatReadableDate(dateInit)} / ${formatReadableDate(dateEnd)}`
                                            : search}
                                </span>
                            </div>
                        </Paper>

                        {!(type === 'author') && (<Paper className="p-2 mb-6 shadow-sm">
                            <div className='bg-[#b60000] text-white p-2'>
                                <p>AUTHOR</p>
                            </div>
                            <hr className='text-gray-400 my-2' />
                            <input type="text" placeholder='Search here or click bellow'
                                className='border w-full p-1'
                                value={searchAuthor}
                                onChange={(e) => setSearchAuthor(e.target.value)}
                            />

                            <div className="space-y-1 my-2">
                                {filteredAuthors.map((author) => (
                                    <a key={author.id} href={`files?type=author&id=${author.id}&search=${author.last_name}, ${author.name}`}>
                                        <p key={author.id} className="text-sm text-[#004059]">{author.last_name}, {author.name} ({getPostsByAuthor(author.id).length})</p>
                                    </a>
                                ))}
                            </div>

                            <hr className='my-1' />

                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <button onClick={() => setAuthorLimit(10)} className="text-[#b60000] font-medium cursor-pointer">Top 10</button>
                                <span>/</span>
                                <button onClick={() => setAuthorLimit(authors.length)} className="text-gray-500 hover:text-gray-700 cursor-pointer">Top {authors.length}</button>
                            </div>
                        </Paper>)}

                        {!(type === 'recipient') && (<Paper className="p-2 mb-6 shadow-sm">
                            <div className='bg-[#b60000] text-white p-2'>
                                <p>RECIPIENT</p>
                            </div>
                            <hr className='text-gray-400 my-2' />
                            <input type="text" placeholder='Search here or click below' className='border w-full p-1' value={searchRecipient} onChange={(e) => setSearchRecipient(e.target.value)} />

                            <div className="space-y-1 my-2">
                                {filteredRecipients.map((recipient) => (
                                    <a href={`files?type=recipient&id=${recipient.id}&search=${recipient.last_name}, ${recipient.name}`} key={recipient.id}>
                                        <p key={recipient.id} className="text-sm text-[#004059]">{recipient.last_name}, {recipient.name} ({getPostsByRecipient(recipient.id).length})</p>
                                    </a>
                                ))}
                            </div>

                            <hr className='my-1' />

                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <button onClick={() => setRecipientLimit(10)} className="text-[#b60000] font-medium cursor-pointer">Top 10</button>
                                <span>/</span>
                                <button onClick={() => setRecipientLimit(recipients.length)} className="text-gray-500 hover:text-gray-700 cursor-pointer">Top {recipients.length}</button>
                            </div>
                        </Paper>)}

                        {!(type === 'institution') && (
                            <Paper className="p-2 mb-6 shadow-sm">
                                <div className='bg-[#b60000] text-white p-2'>
                                    <p>DOCUMENT SOURCE</p>
                                </div>

                                <hr className='text-gray-400 my-2' />
                                <input type="text" placeholder='Search here'
                                    className='border w-full p-1'
                                    value={searchinstitution}
                                    onChange={(e) => setSearchinstitution(e.target.value)}
                                />
                                <div className="space-y-1 my-2">
                                    {filteredinstitutions.map((institution) => (
                                        <a key={institution.id} href={`files?type=institution&id=${institution.id}&search=${institution.name}`}>
                                            <p key={institution.id} className="text-sm">{institution.name} ({getPostByinstitution(institution.id).length})</p>
                                        </a>
                                    ))}
                                </div>

                                <hr className='my-1' />

                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <button onClick={() => setinstitutionLimit(10)} className="text-[#b60000] font-medium">Top 10</button>
                                    <span>/</span>
                                    <button onClick={() => setinstitutionLimit(50)} className="text-gray-500 hover:text-gray-700">Top 50 ({institutions.length})</button>
                                </div>
                            </Paper>
                        )}


                    </Grid>

                    {/* Main Content */}
                    <Grid item xs={12} md={8}>
                        <div className="bg-white rounded shadow-sm min-w-[1000px]">
                            <div
                                style={{
                                    backgroundImage: "url('/fondo_file.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                                className="py-5 shadow-sm"
                            >
                                <div className="my-5 h-[200px] flex flex-col items-center justify-center">
                                    <div className="flex items-center justify-center gap-2 bg-opacity-50 p-4 rounded-lg">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="border p-3 min-w-[700px] bg-white text-gray-600 italic"
                                            value={
                                                `${type === 'datespecific' ? 'Date Specific' :
                                                    type === 'daterange' ? 'Date Range' :
                                                        type?.toUpperCase() || ''}="` +
                                                `${type === 'datespecific' && dateSpecific
                                                    ? new Date(dateSpecific).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                                    : type === 'daterange' && dateInit && dateEnd
                                                        ? `${new Date(dateInit).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - ${new Date(dateEnd).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
                                                        : search || ''
                                                }"`
                                            }
                                            disabled
                                        />

                                    </div>

                                    <div className={`grid ${type === 'datespecific' || type === 'daterange' ? 'grid-cols-5' : 'grid-cols-4'} gap-x-4 p-3`}>

                                        {!(type === 'author') && (
                                            <div className="bg-white rounded-sm ">
                                                <div className="bg-[#b60000]">
                                                    <p className="text-white text-center p-1">Author</p>
                                                </div>
                                                <hr className='text-gray-400 my-2' />
                                                <div className="px-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Search author"
                                                        className="border w-full p-1  text-sm rounded-sm"
                                                        value={searchAuthor2}
                                                        onChange={(e) => setSearchAuthor2(e.target.value)}
                                                    />
                                                </div>

                                                <div className="flex flex-col px-2 py-2 gap-1 max-h-40 overflow-y-auto ">
                                                    {filteredAuthorsSearch.map((author) => (
                                                        <FormControlLabel
                                                            key={author.id}
                                                            control={
                                                                <Checkbox
                                                                    size="8px"
                                                                    sx={{
                                                                        color: '#b60000',
                                                                        '&.Mui-checked': {
                                                                            color: '#b60000',
                                                                        },
                                                                    }}
                                                                    checked={selectedAuthor === author.id}
                                                                    onChange={() => handleSelectAuthor(author.id)}

                                                                />
                                                            }
                                                            label={
                                                                <span className="text-[10px]">
                                                                    {`${author.last_name}, ${author.name}`}
                                                                </span>
                                                            }

                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {!(type === 'recipient') && (
                                            <div className="bg-white rounded-sm ">
                                                <div className="bg-[#b60000]">
                                                    <p className="text-white text-center p-1">Recipient</p>
                                                </div>
                                                <hr className='text-gray-400 my-2' />
                                                <div className="px-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Search Recipient"
                                                        className="border w-full p-1  text-sm rounded-sm"
                                                        value={searchRecipient2}
                                                        onChange={(e) => setSearchRecipient2(e.target.value)}
                                                    />
                                                </div>

                                                <div className="flex flex-col px-2 py-2 gap-1 max-h-40 overflow-y-auto ">
                                                    {filteredRecipientsSearch.map((recipient) => (
                                                        <FormControlLabel
                                                            key={recipient.id}
                                                            control={
                                                                <Checkbox
                                                                    size="8px"
                                                                    sx={{
                                                                        color: '#b60000',
                                                                        '&.Mui-checked': {
                                                                            color: '#b60000',
                                                                        },
                                                                    }}
                                                                    checked={selectedRecipient === recipient.id}
                                                                    onChange={() => handleSelectRecipient(recipient.id)}

                                                                />
                                                            }
                                                            label={
                                                                <span className="text-[10px]">
                                                                    {`${recipient.last_name}, ${recipient.name}`}
                                                                </span>
                                                            }

                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {!(type === 'institution') && (
                                            <div className="bg-white rounded-sm ">
                                                <div className="bg-[#b60000]">
                                                    <p className="text-white text-center p-1">Document Source</p>
                                                </div>
                                                <hr className='text-gray-400 my-2' />
                                                <div className="px-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Search Document Source"
                                                        className="border w-full p-1  text-sm rounded-sm"
                                                        value={searchinstitution2}
                                                        onChange={(e) => setSearchinstitution2(e.target.value)}
                                                    />
                                                </div>

                                                <div className="flex flex-col px-2 py-2 gap-1 max-h-40 overflow-y-auto ">
                                                    {filteredInstitutionsSearch.map((institution) => (
                                                        <FormControlLabel
                                                            key={institution.id}
                                                            control={
                                                                <Checkbox
                                                                    size="8px"
                                                                    sx={{
                                                                        color: '#b60000',
                                                                        '&.Mui-checked': {
                                                                            color: '#b60000',
                                                                        },
                                                                    }}
                                                                    checked={selectedInstitution === institution.id}
                                                                    onChange={() => handleSelectInstitution(institution.id)}

                                                                />
                                                            }
                                                            label={
                                                                <span className="text-[10px]">
                                                                    {`${institution.name}`}
                                                                </span>
                                                            }

                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}


                                        <div className="bg-white rounded-sm ">
                                            <div className="bg-[#b60000]">
                                                <p className="text-white text-center p-1">Period</p>
                                            </div>
                                            <hr className='text-gray-400 my-2' />
                                            <div className="px-2">
                                                <input
                                                    type="text"
                                                    placeholder="Search Period"
                                                    className="border w-full p-1  text-sm rounded-sm"
                                                    value={searchPeriod2}
                                                    onChange={(e) => setSearchPeriod2(e.target.value)}
                                                />
                                            </div>

                                            <div className="flex flex-col px-2 py-2 gap-1 max-h-40 overflow-y-auto ">
                                                {filteredPeriodsSearch.map((period) => (
                                                    <FormControlLabel
                                                        key={period.id}
                                                        control={
                                                            <Checkbox
                                                                size="8px"
                                                                sx={{
                                                                    color: '#b60000',
                                                                    '&.Mui-checked': {
                                                                        color: '#b60000',
                                                                    },
                                                                }}
                                                                checked={selectedPeriod === period.id}
                                                                onChange={() => handleSelectPeriod(period.id)}

                                                            />
                                                        }
                                                        label={
                                                            <span className="text-[10px]">
                                                                {` ${period.name}`}
                                                            </span>
                                                        }

                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-sm ">
                                            <div className="bg-[#b60000]">
                                                <p className="text-white text-center p-1">Location</p>
                                            </div>
                                            <hr className='text-gray-400 my-2' />
                                            <div className="px-2">
                                                <input
                                                    type="text"
                                                    placeholder="Search Location"
                                                    className="border w-full p-1  text-sm rounded-sm"
                                                    value={searchSublocation2}
                                                    onChange={(e) => setSearchSublocation2(e.target.value)}
                                                />
                                            </div>

                                            <div className="flex flex-col px-2 py-2 gap-1 max-h-40 overflow-y-auto ">
                                                {filteredSublocationsSearch.map((sublocation) => (
                                                    <FormControlLabel
                                                        key={sublocation.id}
                                                        control={
                                                            <Checkbox
                                                                size="8px"
                                                                sx={{
                                                                    color: '#b60000',
                                                                    '&.Mui-checked': {
                                                                        color: '#b60000',
                                                                    },
                                                                }}
                                                                checked={selectedSublocation === sublocation.id}
                                                                onChange={() => handleSelectSublocation(sublocation.id)}

                                                            />
                                                        }
                                                        label={
                                                            <span className="text-[10px]">
                                                                {` ${sublocation.name}`}
                                                            </span>
                                                        }

                                                    />
                                                ))}
                                            </div>
                                        </div>

                                    </div>


                                    <p className="text-amber-800 font-semibold italic mt-2">
                                        Documents filtered by:
                                        <span className="font-normal text-black ml-1">
                                            {type
                                                ? `${type === 'datespecific' ? 'Date Specific' :
                                                    type === 'daterange' ? 'Date Range' :
                                                        type.toUpperCase()}="` +
                                                `${type === 'datespecific' && dateSpecific
                                                    ? new Date(dateSpecific).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })
                                                    : type === 'daterange' && dateInit && dateEnd
                                                        ? `${new Date(dateInit).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })} - ${new Date(dateEnd).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })}`
                                                        : search || ''
                                                }"`
                                                : 'All documents'}
                                        </span>

                                    </p>
                                </div>
                            </div>
                            <div className='mx-5 pb-5'>
                                <div className="flex justify-between items-center my-6">
                                    <p className="text-gray-500 italic pl-3">
                                        Results {filteredPosts.length > 0 ?
                                            `${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, filteredPosts.length)} of ${filteredPosts.length}` :
                                            "0"}
                                    </p>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        shape="rounded"
                                        showFirstButton
                                        showLastButton
                                    />
                                </div>

                                <div className="space-y-2">
                                    {currentItems.length > 0 ? (
                                        currentItems.map((file, i) => (
                                            <div key={file.id}>
                                                <a href={`/transcript?post=${file.slug}`}>
                                                    <p className="font-light italic bg-gray-300 px-3 text-[#093352] hover:text-[#253f52] hover:font-semibold hover:underline">
                                                        <span className='font-bold pr-3 text-black'>
                                                            {indexOfFirstItem + i + 1}
                                                        </span>
                                                        {file.title}
                                                    </p>
                                                </a>
                                                <p className="text-gray-600 px-3" dangerouslySetInnerHTML={{ __html: file.content.length > 50 ? file.content.substring(0, 50) + "..." : file.content }} />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center">No results found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}