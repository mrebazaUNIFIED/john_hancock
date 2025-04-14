import React, { useEffect, useState } from "react";
import "./BarLine.css";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";

export default function BarLine() {
    // Mapeo de rango de años al índice del primer evento del carrusel
    const scrollToIndexMap = {
        "1754-1763": 0,
        "1764-1773": 10,
        "1774-1783": 20,
        "1784-1793": 31,
    };

    const [carouselReady, setCarouselReady] = useState(false);

    useEffect(() => {
        const $carousel = $("[data-js='timeline-carousel']");

        $carousel.slick({
            initialSlide: 21,
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

        // Esperamos un poco para asegurarnos que slick está completamente montado
        setTimeout(() => {
            setCarouselReady(true);
        }, 300); // puedes ajustar este tiempo si quieres

        return () => {
            $carousel.slick("unslick");
        };
    }, []);

    const handleScrollTo = (key) => {
        if (!carouselReady) return; // Evita ejecutar si aún no está listo
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
                            month: "John Hancock graduates from Harvard College",
                            text: "French and Indian War begins, with Massachusetts supporting British interests",
                        },
                        {
                            year: "1755",
                            month: "John Hancock works in uncle’s counting house as Thomas Hancock amasses large military contracts to support war effort",
                            text: "French and Indian War continues, with George Washington participating as a Major in the Virginia militia.",
                        },
                        {
                            year: "1756",
                            month: "John Hancock continues learning about the business from his uncle Thomas Hancock",
                            text: "French and Indian War extends beyond skirmishes in the British and French American colonies into an imperial war known as the Seven Years’ War that was fought throughout Europe",
                        },
                        {
                            year: "1757",
                            month: "John Hancock continues working in the background of his uncle Thomas’s growing operations",
                            text: "Imperial war continues with British setbacks in North America, but success gaining territory in India",
                        },
                        {
                            year: "1758",
                            month: "Thomas Hancock gains military contracts for provisioning British troops at garrison forts in Halifax and expands his reach by supplying the newly-British held Fortress of Louisbourg",
                            text: "Theologian Jonathan Edwards, as President of the College of New Jersey (now Princeton University), dies from a weakened immune system after being publicly inoculated against Smallpox.",
                        },
                        {
                            year: "1759",
                            month: "John Hancock gains more responsibility in the business, directing both trade and personal aspects for his uncle’s company.",
                            text: "British gain control of Quebec as part of the French and Indian War, building momentum for control of Canada",
                        },
                        {
                            year: "1760",
                            month: "John Hancock travels to England to visit trading partners, collect debts owed to his uncle, forge new connections to expand the business, and witnesses the Accession of King George III",
                            text: "Great Fire of Boston destroys hundreds of buildings and results in over a thousand people being homeless.",
                        },
                        {
                            year: "1761",
                            month: "John Hancock spends the first half of the year traveling throughout England in order to personally connect with partners and establish new contracts for the company.",
                            text: "George III officially crowned King of England.",
                        },
                        {
                            year: "1762",
                            month: "After returning from England, John Hancock gains more responsibility but remains in the background of his uncle’s company.",
                            text: "England gains territory in Havana and Manila while also declaring war against Spain.",
                        },
                        {
                            year: "1763",
                            month: "Based on John Hancock’s success while traveling to England and the skills he displayed as the company grew, Thomas Hancock names his nephew as a formal partner in the business.",
                            text: "Treaty of Paris formally ends the French and Indian War in North America, resulting in extensive gains of land for the British Empire.",
                        },
                        {
                            year: "1764",
                            month: "John Hancock’s uncle Thomas Hancock dies on August 1st.",
                            text: "James Otis declares in response to the Sugar Act that “Taxation Without Representation is Tyranny”.",
                        },
                        {
                            year: "1765",
                            month: "John Hancock is elected in March as a Boston Selectman for the first time.",
                            text: "Representatives from many American colonies meet in New York for the Stamp Act Congress, protesting revenue measure that extended the reach of duties and taxes",
                        },
                        {
                            year: "1766",
                            month: "John Hancock positions himself as a social leader by producing large celebration after the repeal of the Stamp Act",
                            text: "Parliament issues the Declaratory Act, asserting British authority to legislate over the American colonies",
                        },
                        {
                            year: "1767",
                            month: "John Hancock heads a non-importation by merchants of British goods after Parliament issues the Townshend Acts",
                            text: "John Dickinson’s 'Letters from a Farmer in Pennsylvania' appears in newspapers, expanding the American protest of taxation without representation",
                        },
                        {
                            year: "1768",
                            month: "British seize John Hancock’s ship named Liberty on allegations of smuggling, leading to a riot in Boston",
                            text: "England sends troops to occupy Boston as protest expand and threaten to become more violent",
                        },
                        {
                            year: "1769",
                            month: "John Hancock avoids bankruptcy by surrendering his ship Liberty to British officials while also combatting allegations by publisher John Mein that Hancock broke the non-importation agreement",
                            text: "Non-Importation Agreements extend from New England to New Jersey, Virginia, and North Carolina",
                        },
                        {
                            year: "1770",
                            month: "John Hancock prioritizes leading political protest efforts over his own business activity",
                            text: "On March 5, the Boston Massacre kills five Bostonian colonists, escalating tensions with British troops despite a partial repeal of the Townshend Acts on the same day in England",
                        },
                        {
                            year: "1771",
                            month: "John Hancock continues the legal efforts against John Mein in an effort to destroy his vocal critic.",
                            text: "Massachusetts Governor Thomas Hutchinson moves the General Court from Boston to Cambridge for a second year.",
                        },
                        {
                            year: "1772",
                            month: "Governor Thomas Hancock names John Hancock Colonel of the Boston Corps of Cadets.",
                            text: "Joseph Warren delivers a fiery Boston Massacre Oration on March 5th as Governor Thomas Hutchinson again holds elections in Cambridge rather than Boston.",
                        },
                        {
                            year: "1773",
                            month: "John Hancock goes on an expedition to settle the boundary line between Connecticut and New York.",
                            text: "Boston Tea Party on December 16th assertively protested new British duties on imported goods.",
                        },
                        // Actualización 1774-1783
                        {
                            year: "1774",
                            month: "John Hancock delivers the Boston Massacre Oration on March 5th and begins presiding as President the Massachusetts Provincial Congress in October.",
                            text: "Parliament passes Coercive Acts, which closed the ports in Boston and resulted in American colonists forming the First Continental Congress in Philadelphia.",
                        },
                        {
                            year: "1775",
                            month: "John Hancock becomes President of the Second Continental Congress in Philadelphia in May and in August marries Dorothy Quincy in Fairfield, Connecticut.",
                            text: "In June, Joseph Warren is killed at the Battle of Bunker Hill and George Washington is named Commander in Chief of the Continental Army.",
                        },
                        {
                            year: "1776",
                            month: "As President, John Hancock manages military logistics, promotes unity, and conveys political resolutions to each colony and state while he personally experiences the death of his aunt Lydia in April and the birth of his daughter Lydia in November.",
                            text: "Thomas Paine publishes Common Sense in January and the Declaration of Independence is signed in July.",
                        },
                        {
                            year: "1777",
                            month: "John Hancock’s daughter Lydia tragically dies in August and he resigns as President of the Continental Congress in October.",
                            text: "Articles of Confederation created and sent to the states for ratification.",
                        },
                        {
                            year: "1778",
                            month: "John Hancock’s son John George Washington Hancock is born and also leads a military expedition to Rhode Island as a general.",
                            text: "France becomes a formal ally of the United States in the American Revolution",
                        },
                        {
                            year: "1779",
                            month: "John Hancock manages logistics and operations for the Massachusetts militia as a general.",
                            text: "Spain becomes allies with France in imperial war against England, aiding the United States’ efforts in North America.",
                        },
                        {
                            year: "1780",
                            month: "John Hancock elected in October the first Governor of Massachusetts under the Commonwealth’s Constitution.",
                            text: "British General Henry Clinton gains control of Charleston, South Carolina, as the Revolutionary War concentrated in the South.",
                        },
                        {
                            year: "1781",
                            month: "As Governor, John Hancock focuses on managing the financial strains in Massachusetts.",
                            text: "Battle of Yorktown ends major combat with England",
                        },
                        {
                            year: "1782",
                            month: "John Hancock re-elected as Governor for third term as the stresses of war shape Massachusetts.",
                            text: "The Confederation Congress adopts the Great Seal of the United States and authorized Robert Aitkens to print the first official Bible in the young country.",
                        },
                        {
                            year: "1783",
                            month: "John Hancock considers leaving politics and prioritize focusing on rebuilding his business.",
                            text: "The Quock Walker cases in Massachusetts essentially end slavery in the Commonwealth.",
                        },
                        // Actualización 1784-1793
                        {
                            year: "1784",
                            month: "John Hancock dedicates time to refurbishing his iconic house by the Boston Common.",
                            text: "President of the Confederation Congress signs the Treaty of Paris officially ending the Revolutionary War, and the United States begin exporting goods to England.",
                        },
                        {
                            year: "1785",
                            month: "John Hancock resigns as the Governor of Massachusetts in February, citing strains on his health.",
                            text: "In July, the United States Confederation Congress establishes the dollar as the national currency.",
                        },
                        {
                            year: "1786",
                            month: "John Hancock physically rests while remaining informed of the domestic social, economic, and political turmoil occurring in Massachusetts.",
                            text: "Shays’s Rebellion erupted in Western Massachusetts due to intensifying postwar economic hardships.",
                        },
                        {
                            year: "1787",
                            month: "John Hancock experiences the tragic death of his son John George Washington Hancock in January, wins the election to return as Governor of Massachusetts in April, and that summer began pardoning participants in Shays’s Rebellion while also forgiving debts and cutting taxes.",
                            text: "United States Constitution drafted and sent to the states for ratification while expansion plans form with the passing of the Northwest Ordinance.",
                        },
                        {
                            year: "1788",
                            month: "John Hancock supports ratifying the US Constitution and proposes a Bill of Rights in February, while domestically he works with Prince Hall to protect the rights of Black men from slavery in Massachusetts.",
                            text: "Marietta – now part of Ohio – becomes the first permanent American settlement that was not part of the original Thirteen Colonies.",
                        },
                        {
                            year: "1789",
                            month: "Critic writing under the pseudonym of Laco attacks John Hancock in print in February and March in an effort to have the Governor lose the election.",
                            text: "George Washington becomes the first President of the United States after the ratification of the Federal Constitution.",
                        },
                        {
                            year: "1790",
                            month: "John Hancock continually seeks to solidify Massachusetts’ financial stability while emphasizing state rights over federal influence.",
                            text: "United States federal government assumes states’ debts with The Funding Act of 1790 after an agreement between Alexander Hamilton, Thomas Jefferson, and James Madison that also ensured that the nation’s capital would be near Virginia.",
                        },
                        {
                            year: "1791",
                            month: "John Hancock wins a tenth one-year term as Governor in May, and continues tapping into the religious foundations of Massachusetts by proclaiming a Day of Fasting and a Day of Thanksgiving.",
                            text: "Congress passes a Federal excise tax in March, leading to the resistance known as the Whisky Rebellion that lasted until 1794 while the Bill of Rights protecting personal rights was ratified by the states in December.",
                        },
                        {
                            year: "1792",
                            month: "In December, John Hancock highlights his conservatism by having the sheriff shut down performances at the Board Alley Theatre, while also indicating his progressiveness by holding an “Equality Ball” at his home with free Black men of Boston.",
                            text: "Kentucky becomes the 15th state just two years after Vermont was the 14th state admitted into the United States.",
                        },
                        {
                            year: "1793",
                            month: "John Hancock issues a Proclamation in September that restricts travelers from Philadelphia into Massachusetts due to a Smallpox epidemic as one of his final acts of Governor before dying on October 8th.",
                            text: "King Louis XVI of France is beheaded by the guillotine as the French Revolution radicalizes.",
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

                <div className="">
                    <p className="font-bold text-xl" style={{ fontWeight: "bold" }}>Legend:</p>
                    <div className="flex items-center content-center">
                        <p className="w-4 h-4 bg-amber-300 rounded-sm mr-2"> </p>
                        <b className="font-bold text-amber-300">Hancock Events</b>
                    </div>

                    <div className=" flex items-center content-center">
                        <p className="w-4 h-4 bg-white rounded-sm mr-2"> </p>
                        <b className="font-bold text-white">Historical Events</b>
                    </div>
                </div>
            </section>
        </>
    );
}
