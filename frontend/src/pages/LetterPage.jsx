import React, { useState, useEffect } from "react";
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import * as pdfjs from 'pdfjs-dist/build/pdf'; // Importación corregida
import { useSearchParams } from "react-router-dom";
import api from "../api";
import DOMPurify from "dompurify";

// Importa los estilos
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Configura el worker usando la versión correcta
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function LetterPage() {
    const backgroundImage = "./fondo.png";

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [searchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [postSearch, setPostSearch] = useState();

    const postSlug = searchParams.get("post");

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        if (postSlug && posts.length > 0) {
            const filteredPost = posts.find(post => post.slug === postSlug);
            setPostSearch(filteredPost);
        }
    }, [postSlug, posts, postSearch]);


    const getPosts = () => {
        api.get("/api/post/")
            .then((res) => setPosts(res.data))
            .catch((err) => alert("Error al cargar los Posts3: " + err));


    }

    const pdfFile = postSearch?.document?.path || "Cargando...";


    return (
        <div className=" min-h-screen">
            {/* Header */}
            <div
                className="relative w-full h-48 md:h-64 bg-cover bg-center flex items-center px-6"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 flex items-start  space-x-8 max-w-5xl  px-4 ml-10" >

                    <div>
                        <h1 className="text-white text-2xl md:text-4xl font-semibold">4 July, 1763</h1>
                        <h2 className="text-white text-2xl md:text-4xl font-bold">
                            {postSearch?.title || "Cargando..."}
                        </h2>
                    </div>
                </div>
            </div>


            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-8 my-20">

                <div className="lg:col-span-3 space-y-6">

                    <div className="flex items-center justify-center h-[800px] w-[800px] bg-gray-50 rounded-lg shadow">
                        <Viewer
                            fileUrl={pdfFile}
                            plugins={[defaultLayoutPluginInstance]}
                            theme="light"
                        />
                    </div>



                    <div className=" rounded-2xl space-y-2 mt-30">
                        <p
                            className=" text-sm"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postSearch?.citeAs || "Cargando...") }}
                        />
                    </div>


                    <div className="flex justify-center">
                        <button className="bg-[#b1040e] hover:bg-[#8c030b] text-white w-64 py-3 rounded-md font-semibold text-lg shadow-[4px_4px_0px_0px_rgba(185,184,180,1)] transition-all leading-tight text-center">
                            Use AI Quill for <br /> Research
                        </button>
                    </div>


                </div>


                <div className="space-y-6 ">
                    <div className="bg-white rounded-md shadow p-4 space-y-3 min-h-120">
                        <div className=''>
                            <h4 className="font-semibold text-gray-700 underline">Title:</h4>
                            <p className="text-gray-600 text-sm">{postSearch?.title || "Cargando..."}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700 underline">Author:</h4>
                            <p className="text-gray-600 text-sm">{postSearch?.author.last_name || "Cargando..."}, {postSearch?.author.name || "Cargando..."}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700 underline">Recipient:</h4>
                            <p className="text-gray-600 text-sm">{postSearch?.recipient.last_name || "Cargando..."}, {postSearch?.recipient.name || "Cargando..."}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700 underline">Institutions:</h4>
                            <p className="text-gray-600 text-sm">{postSearch?.institution.name || "Cargando..."}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
