import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";
import DOMPurify from "dompurify";



export default function TranscriptPage() {
    const backgroundImage = "./fondo.png";
    const thumbImage = "./escrito.jpg";

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


    return (
        <div className=" min-h-screen">
            {/* Header */}
            <div
                className="relative w-full h-48 md:h-64 bg-cover bg-center flex items-center px-6"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 flex items-start  space-x-8 max-w-5xl  px-4 ml-10" >
                    <a href={`/letter/?post=${postSlug}`} target="_blank" rel="noopener noreferrer">
                        <img
                            src={thumbImage}
                            alt="Manuscript"
                            className="w-36 h-60 md:w-36 md:h-55 object-cover rounded border-2 border-white shadow-lg hover:scale-105 transition-transform"
                        />
                    </a>
                    <div>
                        <h1 className="text-white text-2xl md:text-4xl font-semibold">
                            {postSearch?.date || "Cargando..."}
                        </h1>
                        <h2 className="text-white text-2xl md:text-4xl font-bold">
                            {postSearch?.title || "Cargando..."}
                        </h2>
                    </div>
                </div>
            </div>


            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 p-8 my-15">

                <div className="lg:col-span-3 space-y-6 ">

                    <div className="  p-6 space-y-4">
                        <h3 className="text-2xl font-light mb-0">   {postSearch?.title || "Cargando..."}</h3>
                        <h3 className="text-2xl font-light mt-0">{postSearch?.sublocation.name || "Cargando..."},  {postSearch?.date || "Cargando..."}</h3>
                        <p className="text-sm  font-semibold">From {postSearch?.author.last_name || "Cargando..."}</p>
                        <p className="text-sm text-gray-500 text-end">{postSearch?.sublocation.name || "Cargando..."},  {postSearch?.date || "Cargando..."}</p>


                        <p
                            className="text-gray-700 leading-relaxed text-justify"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postSearch?.content || "Cargando...") }}
                        />
                    </div>


                    <div className=" rounded-2xl p-6 space-y-2">
                        <h4 className="font-semibold text-gray-800 text-2xl">Cite as</h4>
                        <p
                            className="text-gray-700  text-sm"
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
                            <p className="text-gray-600 text-sm">{postSearch?.author.last_name || "Cargando..."} ,{postSearch?.author.name || "Cargando..."}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700 underline">Recipient:</h4>
                            <p className="text-gray-600 text-sm">{postSearch?.recipient.last_name || "Cargando..."} ,{postSearch?.recipient.name || "Cargando..."}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700 underline">Institutions:</h4>
                            <p className="text-gray-600 text-sm">{postSearch?.institution.name || "Cargando..."}</p>
                        </div>
                    </div>

                    <div className=" rounded-md shadow p-4 space-y-3 bg-[#f0ece5]">
                        <h4 className="font-bold text-gray-700 text-2xl ">View Original Document</h4>
                        <a href={`/letter/?post=${postSlug}`} target="_blank" className="w-full border border-gray-300 py-2 rounded  transition hover:bg-red-600 hover:font-semibold hover:text-white p-5 mx-0 ">
                            Click Here
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
