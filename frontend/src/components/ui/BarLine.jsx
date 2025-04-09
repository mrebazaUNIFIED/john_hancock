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
                            year: "1764",
                            month: "Uncle Thomas Hancock dies",
                            text: "James Otis declares concept of 'Taxation Without Representation is Tyranny' in response to the Sugar Act",
                        },
                        {
                            year: "1765",
                            month: "Elected as a Boston Selectman for first time",
                            text: "Representatives from many American colonies meet in New York for the Stamp Act Congress, protesting revenue measure that extended the reach of duties and taxes",
                        },
                        {
                            year: "1766",
                            month: "Sets himself as a social leader by producing large celebration after the repeal of the Stamp Act",
                            text: "Parliament issues the Declaratory Act, asserting British authority to legislate over the American colonies",
                        },
                        {
                            year: "1767",
                            month: "Leads boycott by merchants of British goods after Parliament issues Townshend Acts",
                            text: "John Dickinson’s 'Letters from a Farmer in Pennsylvania' appears in newspapers, expanding the American protest of taxation without representation",
                        },
                        {
                            year: "1768",
                            month: "British seize Hancock’s ship Liberty on allegations of smuggling",
                            text: "England sends troops to occupy Boston due to expanding protests",
                        },
                        {
                            year: "1769",
                            month: "Avoids bankruptcy by surrendering his ship Liberty to British officials; Combats allegations by John Mein of breaking Non-Importation Agreement",
                            text: "Non-Importation Agreements extend from New England to New Jersey, Virginia, and North Carolina",
                        },
                        {
                            year: "1770",
                            month: "Emphasizes leading protest efforts over his own business",
                            text: "Boston Massacre; Townshend Acts repealed",
                        },
                        {
                            year: "1771",
                            month: "Continues lawsuit against John Mein in effort to destroy critic",
                            text: "Massachusetts Governor Thomas Hutchinson moves the General Court from Boston to Cambridge for a second year",
                        },
                        {
                            year: "1772",
                            month: "Governor Thomas Hutchinson names Hancock Colonel of the Boston Corps of Cadets",
                            text: "Joseph Warren delivers fiery Boston Massacre Oration as Governor Hutchinson again holds elections in Cambridge rather than Boston",
                        },
                        {
                            year: "1773",
                            month: "Goes on expedition to settle boundary line between Connecticut and New York",
                            text: "Boston Tea Party",
                        },
                        // Actualización 1774-1783
                        {
                            year: "1774",
                            month: "Delivers Boston Massacre Oration; Presides as President of Massachusetts Provincial Congress",
                            text: "Parliament passes Coercive Acts, closing the ports in Boston; First Continental Congress meets in Philadelphia",
                        },
                        {
                            year: "1775",
                            month: "Becomes President of the Continental Congress in Philadelphia; Marries Dorothy Quincy in Fairfield, Connecticut",
                            text: "Joseph Warren killed at the Battle of Bunker Hill; George Washington named Commander in Chief of Continental Army",
                        },
                        {
                            year: "1776",
                            month: "Manages military logistics, promotes unity, and conveys political resolutions from Philadelphia to each colony and state; Aunt Lydia dies while daughter Lydia born",
                            text: "Thomas Paine publishes Common Sense; Declaration of Independence signed",
                        },
                        {
                            year: "1777",
                            month: "Daughter Lydia dies; Resigns as President of the Continental Congress",
                            text: "Articles of Confederation created",
                        },
                        {
                            year: "1778",
                            month: "Son John George Washington Hancock born; Military Expedition as General to Rhode Island",
                            text: "France becomes a formal ally of the United States in the American Revolution",
                        },
                        {
                            year: "1779",
                            month: "Manages logistics and operations for the Massachusetts militia as General",
                            text: "Spain becomes allies with France in imperial war against England, aiding the United States’ efforts in North America",
                        },
                        {
                            year: "1780",
                            month: "Elected first Governor of Massachusetts under the Commonwealth’s Constitution",
                            text: "British General Henry Clinton gains control of Charleston, South Carolina, as the Revolutionary War concentrated in the South",
                        },
                        {
                            year: "1781",
                            month: "Focuses on managing the financial strains in Massachusetts",
                            text: "Battle of Yorktown ends major combat with England",
                        },
                        {
                            year: "1782",
                            month: "Re-elected Governor for third term as postwar conditions shape Massachusetts",
                            text: "Congress adopts the United States Great Seal and authorized the formation of a national mint",
                        },
                        {
                            year: "1783",
                            month: "Considers leaving politics and instead focus on his business",
                            text: "Quock Walker case in Massachusetts essentially ends slavery in the Commonwealth; Treaty of Paris officially ended the American Revolution",
                        },
                        // Actualización 1784-1793
                        {
                            year: "1784",
                            month: "Dedicates time to refurbishing his iconic house by the Boston Common",
                            text: "President of the Confederation Congress Thomas Mifflin signs Treaty of Paris after ratification, and England begins accepting raw material from the United States",
                        },
                        {
                            year: "1785",
                            month: "Resigns as MA Governor, citing health",
                            text: "The United States’ Confederation Congress establishes the dollar as the national money unit system",
                        },
                        {
                            year: "1786",
                            month: "Physically rests while remaining informed of Massachusetts social, economic, and political turmoil",
                            text: "Shays’s Rebellion erupted in Western Massachusetts due to intensifying postwar economic hardships",
                        },
                        {
                            year: "1787",
                            month: "Son John George Washington Hancock dies in skating accident; Returns as MA Governor, issues debt relief to bring end to Shays’s Rebellion",
                            text: "United States Constitution drafted and sent to states for ratification; Confederation Congress passes the Northwest Ordinance",
                        },
                        {
                            year: "1788",
                            month: "Supports ratifying US Constitution and proposes a Bill of Rights; Works with Prince Hall to protect the rights of Black men from slavery",
                            text: "Marietta – now part of Ohio – becomes the first permanent American settlement that was not part of the original Thirteen Colonies",
                        },
                        {
                            year: "1789",
                            month: "Critic writing under the pseudonym of Laco attacks Hancock in effort to have the Governor lose the election",
                            text: "George Washington Becomes 1st President",
                        },
                        {
                            year: "1790",
                            month: "Continues seeking to solidify Massachusetts’s financial stability while continuing to emphasize state rights over federal influence",
                            text: "United States federal government assumes states’ debts with The Funding Act of 1790 and an agreement between Alexander Hamilton, Thomas Jefferson, and James Madison that resulted in the national capital being near Virginia",
                        },
                        {
                            year: "1791",
                            month: "Continues duties as Governor, including tapping into the religious foundations of Massachusetts by proclaiming a Day of Fasting and a Day of Thanksgiving",
                            text: "Bill of Rights ratified by the states; United States Congress passed a Federal Excise Tax, leading to the Whiskey Rebellion",
                        },
                        {
                            year: "1792",
                            month: "Holds 'Equality Ball' at his home with free Black men of Boston; Shuts down Board Alley Theatre over dispute with General Court over stage performances",
                            text: "Kentucky becomes 15th state two years after Vermont admitted into the United States.",
                        },
                        {
                            year: "1793",
                            month: "Issues Proclamation restricting travelers from Philadelphia into Massachusetts due to Smallpox epidemic; Dies on October 8th",
                            text: "King Louis XVI beheaded by the guillotine as the French Revolution radicalized",
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
                    <p className="font-bold text-xl" style={{fontWeight:"bold"}}>Legend:</p>
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
