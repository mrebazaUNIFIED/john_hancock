import React, { useEffect } from "react";
import "./BarLine.css";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";

export default function BarLine() {
    // Mapeo de rango de años al índice del primer evento del carrusel
    const scrollToIndexMap = {
        "1754-1763": 0,
        "1764-1773": 10, // Primer evento en 1763/1765
        "1774-1783": 14, // Primer evento en 1774
        "1784-1793": 21, // Primer evento en 1785
    };

    useEffect(() => {
        const $carousel = $("[data-js='timeline-carousel']");

        function carousel() {
            $carousel.slick({
                infinite: false,
                arrows: true,
                prevArrow:
                    '<div class="slick-prev"> <div class="btn mr-3 btn-warning d-flex justify-content-center align-items-center"> <div>Previous</div></div></div>',
                nextArrow:
                    '<div class="slick-next"> <div class="btn btn-warning d-flex justify-content-center align-items-center">  <div>Next</div></div></div>',
                dots: true,
                autoplay: false,
                speed: 1100,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                ],
            });
        }

        carousel();

        return () => {
            $carousel.slick("unslick");
        };
    }, []);

    const handleScrollTo = (key) => {
        const index = scrollToIndexMap[key];
        $("[data-js='timeline-carousel']").slick("slickGoTo", index);
    };

    return (
        <>
            <div className="flex items-center justify-center text-white w-full text-center">
                <button
                    className="bg-[#0e2c54] w-1/4 p-3 hover:opacity-80 transition cursor-pointer"
                    onClick={() => handleScrollTo("1754-1763")}
                >
                    <p className="text-xl">
                        <b>1754-1763:</b> <span>22 letters</span>
                    </p>
                </button>

                <button
                    className="bg-[#4477f6] w-1/4 p-3 hover:opacity-80 transition cursor-pointer"
                    onClick={() => handleScrollTo("1764-1773")}
                >
                    <p className="text-xl">
                        <b>1764-1773:</b> <span>580+ letters</span>
                    </p>
                </button>

                <button
                    className="bg-[#50b981] w-1/4 p-3 hover:opacity-80 transition cursor-pointer"
                    onClick={() => handleScrollTo("1774-1783")}
                >
                    <p className="text-xl">
                        <b>1774-1783:</b> <span>3,100+ letters</span>
                    </p>
                </button>

                <button
                    className="bg-[#818181] w-1/4 p-3 hover:opacity-80 transition cursor-pointer"
                    onClick={() => handleScrollTo("1784-1793")}
                >
                    <p className="text-xl">
                        <b>1784-1793:</b> <span>330+ letters</span>
                    </p>
                </button>
            </div>

            <section className="timeline-carousel">
                <div className="timeline-carousel__item-wrapper" data-js="timeline-carousel">
                    {[
                        {
                            year: "1754",
                            month: "Graduates from Harvard College",
                            text: "French and Indian War begins, with Massachusetts supporting British interests",
                        },
                        {
                            year: "1755",
                            month: "John works in uncle’s counting house as Thomas Hancock’s amasses large military contracts to support war effort",
                            text: "French and Indian War continues, with George Washington participating as a Major in the Virginia militia.",
                        },
                        {
                            year: "1756",
                            month: "Continues learning business from Uncle Thomas",
                            text: "French and Indian War extends beyond skirmishes in the British and French American colonies into an imperial war fought throughout Europe known as the Seven Years’ War",
                        },
                        {
                            year: "1757",
                            month: "John continues working in the background of his uncle Thomas Hancock’s growing operations",
                            text: "Imperial War continued, with British setbacks in North America but success gaining territory in India",
                        },
                        {
                            year: "1758",
                            month: "Siege of Louisbourg results in British possession of a key port in the Atlantic; Thomas Hancock supplies provisions for British troops at garrison forts in Halifax and expands his reach by supplying the newly-British gained Fortress of Louisbourg",
                            text: "Theologian Jonathan Edwards, as President of the College of New Jersey (now Princeton University), dies from a weakened immune system after being publicly inoculated against Smallpox.",
                        },
                        {
                            year: "1759",
                            month: "John Hancock gains more responsibility in operations, directing both business and personal aspects of his uncle’s company.",
                            text: "British gain control of Quebec as part of the French and Indian War, building momentum for control of Canada",
                        },
                        {
                            year: "1760",
                            month: "John Hancock travels to England to visit trading partners, collect debts owed to his uncle, and forge new connections to expand the business; witnesses the Accession of King George III",
                            text: "Great Fire of Boston destroys hundreds of buildings and resulted in over a thousand people being homeless.",
                        },
                        {
                            year: "1761",
                            month: "John Hancock spends the first half of the year traveling throughout England, which resulted in personally connecting with partners and establishing new contracts for the company.",
                            text: "George III officially crowned as King of England",
                        },
                        {
                            year: "1762",
                            month: "After returning from England, John gains more responsibility but remains in the background of his uncle’s company",
                            text: "Seven Years’  War further expands as England declares war against Spain. England gains territory in Havana and Manila.",
                        },
                        {
                            year: "1763",
                            month: "Based on John’s performance while traveling to England and the skills he displayed as the company grew, Thomas Hancock names his nephew as a formal partner in the business",
                            text: "Treaty of Paris formally ends the French and Indian War in North America, resulting in extensive gains of land for the British Empire",
                        },
                        {
                            year: "1765",
                            month: "",
                            text: "Stamp Act imposed by Britain",
                        },
                        {
                            year: "1768",
                            month: "Ship Liberty seized by British",
                            text: "",
                        },
                        {
                            year: "1770",
                            month: "",
                            text: "Boston Massacre",
                        },
                        {
                            year: "1773",
                            month: "",
                            text: "Boston Tea Party",
                        },
                        {
                            year: "1774",
                            month: "Delivers Boston Massacre Oration",
                            text: "Intolerable Acts Close Boston’s Ports",
                        },
                        {
                            year: "1775",
                            month: "President of the Continental Congress until October 1777",
                            text: "American Revolutionary War Begins",
                        },
                        {
                            year: "1776",
                            month: "",
                            text: "Declaration of Independence",
                        },
                        {
                            year: "1777",
                            month: "",
                            text: "Articles of Confederation created",
                        },
                        {
                            year: "1778",
                            month: "Military Expedition as General to Rhode Island",
                            text: "",
                        },
                        {
                            year: "1780",
                            month: "First Governor of Massachusetts",
                            text: "",
                        },
                        {
                            year: "1781",
                            month: "",
                            text: "Battle of Yorktown Ends Major Combat with England",
                        },
                        {
                            year: "1785",
                            month: "Resigns as MA Governor, citing health",
                            text: "",
                        },
                        {
                            year: "1787",
                            month: "Returns as MA Governor after Shays’s Rebellion",
                            text: "United States Constitution Drafted",
                        },
                        {
                            year: "1788",
                            month: "Supports US Constitution and Proposes Bill of Rights",
                            text: "",
                        },
                        {
                            year: "1789",
                            month: "",
                            text: "George Washington Becomes 1st President",
                        },
                        {
                            year: "1791",
                            month: "",
                            text: "Bill of Rights Ratified",
                        },
                        {
                            year: "1793",
                            month: "Dies on October 8th",
                            text: "",
                        },

                    ].map((item, index) => (
                        <div key={index} className="timeline-carousel__item">

                            <div className="timeline-carousel__item-inner">
                                {item.year && <span className="year">{item.year}</span>}
                                <span className="month">{item.month}</span>
                                <span className="month2">{item.text}</span>

                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="text-start flex items-center justify-center">
                        <p className="w-4 h-4 bg-amber-300 rounded-sm mr-2"> </p>
                        <b className="font-bold text-amber-300">Hancock Events</b>
                    </div>

                    <div className="text-end flex items-center justify-center">
                        <p className="w-4 h-4 bg-white rounded-sm mr-2"> </p>
                        <b className="font-bold text-white">Historical Events</b>
                    </div>
                </div>
            </section>
        </>
    );
}
