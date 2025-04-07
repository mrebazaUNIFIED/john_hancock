import React, { useState, useEffect } from "react";
import {
    Grid,
    Paper,
    Pagination,
} from '@mui/material';
import { useSearchParams,useNavigate } from "react-router-dom";
import api from '../api';



export default function FilesPage() {
    const [searchParams] = useSearchParams();

    const type = searchParams.get("type");
    const id = searchParams.get("id");
    const search = searchParams.get("search");

    const [periods, setPeriods] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [searchAuthor, setSearchAuthor] = useState("");
    const [searchRecipient, setSearchRecipient] = useState("");
    const [searchPeriod, setSearchPeriod] = useState("");
    const [authorLimit, setAuthorLimit] = useState(10);
    const [recipientLimit, setRecipientLimit] = useState(10);
    const [periodLimit, setPeriodLimit] = useState(10);
    const [posts, setPosts] = useState([]);
    const [searchFiles, setSearchFiles] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchFiles.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(searchFiles.length / itemsPerPage);
    const navigate = useNavigate();

    

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleNavigateSearch = (type, id,search) => {
        navigate(`/files?type=${type}&id=${id}&search=${search}`);
        window.scrollTo(0, 0);
      };

    const handleNavigate = (slug) => {
        e.preventDefault(); 
        navigate(`/transcript?&post=${slug}`);
        window.scrollTo(0, 0);
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
        if (type === 'period') {
            const period = periods.find(p => String(p.id) === id);
            return period ? period.name : '';
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

    const getPostByPeriod = (periodId) => {
        const filteredPosts = posts.filter(post => post.period.id === periodId);
        return filteredPosts;
    };

    useEffect(() => {
        if (periods.length === 0) getPeriods();
        if (authors.length === 0) getAuthors();
        if (recipients.length === 0) getRecipients();
        if (posts.length === 0) getPosts();
    }, []);

    useEffect(() => {
        setCurrentPage(1); // Resetear a primera página cuando cambian los filtros
    }, [type, id, search]);

    // Update searchFiles when data or URL params change
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
            } else if (type === 'period') {
                const period = periods.find(p => String(p.id) === id);
                if (period) {
                    const filteredPosts = posts.filter(post => post.period?.id === period.id);
                    setSearchFiles(filteredPosts);
                } else {
                    setSearchFiles([]);
                }
            } else {
                setSearchFiles([]);
            }
        };

        updateSearchFiles();
    }, [type, id, authors, recipients, periods, posts]);



    // Funciones para obtener datos
    const getPeriods = () => {
        api.get("/api/period/")
            .then((res) => setPeriods(res.data))
            .catch((err) => alert("Error al cargar los periodos2: " + err));
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

    const filteredAuthors = authors.filter(author =>
        author.name.toLowerCase().includes(searchAuthor.toLowerCase()) ||
        author.last_name.toLowerCase().includes(searchAuthor.toLowerCase())
    ).slice(0, authorLimit);

    const filteredRecipients = recipients.filter(recipient =>
        recipient.name.toLowerCase().includes(searchRecipient.toLowerCase()) ||
        recipient.last_name.toLowerCase().includes(searchRecipient.toLowerCase())
    ).slice(0, recipientLimit);

    const filteredPeriods = periods.filter(period =>
        period.name.toLowerCase().includes(searchPeriod.toLowerCase())
    ).slice(0, periodLimit);



    return (
        <div className="min-h-screen my-5">
            <div className="container mx-auto max-w-7xl">

                <Grid container spacing={4}>
                    {/* Sidebar */}
                    <Grid item xs={12} md={2.5}>

                        <Paper className=" mb-6 p-2">
                            <img src="./imagen_file.png" alt="image_file" className='w-full h-[200px]' />
                            <div className='bg-[#004059] mb-2'>
                                <p className='text-white ml-2 uppercase'>
                                    {type}
                                </p>
                            </div>
                            <hr className='text-gray-400' />
                            <div className="flex items-center bg-gray-100 p-2 rounded ">
                                <span className="ml-2 text-[#004059] font-semibold">{search}</span>
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

                        {!(type === 'period') && (
                            <Paper className="p-2 mb-6 shadow-sm">
                                <div className='bg-[#b60000] text-white p-2'>
                                    <p>Period</p>
                                </div>

                                <hr className='text-gray-400 my-2' />
                                <input type="text" placeholder='Search here'
                                    className='border w-full p-1'
                                    value={searchPeriod}
                                    onChange={(e) => setSearchPeriod(e.target.value)}
                                />
                                <div className="space-y-1 my-2">
                                    {filteredPeriods.map((period) => (
                                        <a key={period.id}  href={`files?type=period&id=${period.id}&search=${period.name}`}>
                                            <p key={period.id} className="text-sm">{period.name} ({getPostByPeriod(period.id).length})</p>
                                        </a>
                                    ))}
                                </div>

                                <hr className='my-1' />

                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <button onClick={() => setPeriodLimit(10)} className="text-[#b60000] font-medium">Top 10</button>
                                    <span>/</span>
                                    <button onClick={() => setPeriodLimit(50)} className="text-gray-500 hover:text-gray-700">Top 50 ({periods.length})</button>
                                </div>
                            </Paper>
                        )}


                    </Grid>

                    {/* Main Content */}
                    <Grid item xs={12} md={8}>
                        <div className="bg-white rounded shadow-sm">
                            <div
                                style={{
                                    backgroundImage: "url('/fondo_file.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                                className="py-5 shadow-sm"
                            >
                                <div className="my-5 h-[50px] flex flex-col items-center justify-center">
                                    <div className="flex items-center justify-center gap-2 bg-opacity-50 p-4 rounded-lg">
                                        <input type="text" placeholder="Search" className="border p-3 w-[400px] bg-white text-gray-600 italic" value={`${type.toUpperCase()}="${getFilterName()}"`}/>
                                        <button className="bg-gradient-to-b from-[#004059] via-[#03445e] to-[#135382] text-white border p-3 cursor-pointer rounded-lg transition-all duration-300 hover:bg-gradient-to-b hover:from-[#135382] hover:via-[#03445e] hover:to-[#004059]">
                                            Go
                                        </button>
                                    </div>
                                    <p className="text-amber-800 font-semibold italic mt-2">
                                        Documents filtered by: 
                                         <span className="font-normal text-black ml-1">
                                            {type ? `${type.toUpperCase()}="${getFilterName()}"` : "All documents"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className='mx-5 pb-5'>
                                <div className="flex justify-between items-center my-6">
                                    <p className='text-gray-500 italic pl-3'>
                                        Results {searchFiles.length > 0 ?
                                            `${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, searchFiles.length)} of ${searchFiles.length}` :
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
                                            <div key={file.id}> {/* Usar ID único en lugar de índice */}
                                                <a href={`/transcript?post=${file.slug}`}  >
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