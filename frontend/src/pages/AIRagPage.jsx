import React from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import DescriptionIcon from '@mui/icons-material/Description';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import SchoolIcon from '@mui/icons-material/School';
import PushPinIcon from '@mui/icons-material/PushPin';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import SendIcon from '@mui/icons-material/Send';

export default function AIRagPage() {

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <div className="min-h-screen flex flex-col">

            <div className="relative w-full h-48 md:h-64 bg-cover bg-center px-6 flex items-center justify-center" style={{ backgroundImage: "url('./your-background.jpg')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative space-y-6 max-w-5xl text-center">
                    <h2 className="text-white text-2xl md:text-4xl font-bold mt-10">
                        Message to Lieutenant Governor Hutchinson on the Command of Castle William
                    </h2>
                    <div className="flex justify-end mb-5">
                        <button className="bg-[#b1040e] hover:bg-[#8c030b] text-white w-64 py-3 rounded-md font-semibold text-lg shadow-[5px_5px_0px_0px_rgba(100,101,103,1)] transition-all leading-tight text-center">
                            Ask Dr. JMG About <br /> The Documents
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto mt-10 px-4">

                <div className="w-full md:w-1/3 bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-4 h-[600px]">
                    <h2 className="text-lg font-semibold text-gray-700 border-b border-[#909298] pb-2 mb-4">Sources</h2>

                    <button className="w-full mb-6 py-2 border-2 border-[#b1040e] text-[#b1040e] rounded-xl font-semibold hover:bg-[#b1040e] hover:text-white transition">
                        + Add source
                    </button>

                    <div className="flex justify-between items-center mb-4">
                        <span className="font-medium text-sm text-gray-700">Select all sources</span>
                        <input type="checkbox" className="w-5 h-5 text-red-600 rounded focus:ring-0  accent-[#909298] cursor-pointer " />
                    </div>



                    <ul className="space-y-2 max-h-80  pr-2">
                        {[
                            "17650911 JH to Barnard & Harrison.pdf",
                            "17650926 Joshua Winslow to JH.pdf",
                            "17650930 JH to Barnard & Harrison.pdf",
                            "17651104 JH to Devonshire.pdf",
                            "17651123 Thomas Williams to JH.pdf",
                            "17660901 JH to Maturin.pdf",
                            "17660903 JH to Matthew Woodford.pdf",
                            "17660929 Maturin to JH.pdf"
                        ].map((text, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-2 rounded-xl transition">
                                <div className="flex items-center space-x-2">
                                    <PictureAsPdfIcon color="error" className="mr-2" />
                                    <span className="text-sm text-gray-700">{text}</span>
                                </div>
                                <input type="checkbox" className="w-4 h-4 text-red-600 rounded focus:ring-0 accent-[#909298] cursor-pointer" />
                            </li>
                        ))}
                    </ul>
                </div>




                <div className="w-full md:w-2/3 bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-4 h-[600px]">
                    <h2 className="text-lg font-semibold text-gray-700 border-b border-[#909298] pb-2 mb-4">Chat</h2>
                    <div className="flex items-center space-x-3 mt-10">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/029/239/220/small_2x/parchment-paper-scroll-papyrus-empty-frame-blank-png.png" alt="icon" className="w-8 h-8" />

                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">1765 Correspondence: Stewards' Financial Matters</h2>
                    <p className="text-sm text-gray-600 my-5">8 sources</p>

                    <p className="text-gray-700 text-sm leading-relaxed text-justify my-5">
                        These excerpts are <strong className="font-medium">various letters</strong> primarily involving <strong className="font-medium">John Hancock</strong> and his correspondence with <strong className="font-medium">business associates and acquaintances</strong>. The letters discuss <strong className="font-medium">shipping matters</strong>, including the chartering and potential insurance of vessels, as well as <strong className="font-medium">financial arrangements and concerns</strong>. Some letters also touch upon <strong className="font-medium">personal matters</strong> and sentiments. Overall, the collection offers a glimpse into Hancock's <strong className="font-medium">commercial activities and relationships</strong> during this period.
                    </p>

                    <div className="flex items-center my-8 space-x-4">
                        <div className="w-40">
                            <Chip
                                icon={<PushPinIcon />}
                                label="Save to note"
                                variant="outlined"
                                onClick={handleClick}
                                className="w-full "
                                sx={{
                                    '& .MuiChip-label': {
                                        paddingTop: '1rem',
                                        paddingBottom: '1rem'
                                    }
                                }}
                            />
                        </div>
                        <CopyAllIcon className="text-gray-700 w-6 h-6 cursor-pointer" />
                    </div>



                    <div className="flex flex-wrap gap-4 pt-2 my-10">
                        <div className="w-60">
                            <Chip
                                icon={<DescriptionIcon color="inherit" className="!text-yellow-500" />}
                                label="Add note"
                                variant="outlined"
                                onClick={handleClick}
                                className="w-full"
                            />
                        </div>

                        <div className="w-60">
                            <Chip
                                icon={<GraphicEqIcon color="inherit" className="!text-blue-500" />}
                                label="Audio Overview"
                                variant="outlined"
                                onClick={handleClick}
                                className="w-full"
                            />
                        </div>

                        <div className="w-60">
                            <Chip
                                icon={<SchoolIcon color="inherit" className="!text-purple-500" />}
                                label="Briefing doc"
                                variant="outlined"
                                onClick={handleClick}
                                className="w-full"
                            />
                        </div>
                    </div>


                    <div className="w-full border rounded-2xl p-2 flex items-center justify-between shadow-sm mt-6">
                        <div className="flex-1">
                            <textarea
                                placeholder="Start typing..."
                                rows={2}
                                className="w-full text-sm text-gray-700 placeholder-gray-400 py-3 rounded-md focus:outline-none focus:ring-0 resize-none"
                            ></textarea>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                            <span className="text-xs text-gray-500">8 sources</span>
                            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-400 hover:bg-indigo-300 transition cursor-pointer">
                                <SendIcon color="inherit" className="!text-white" />
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
