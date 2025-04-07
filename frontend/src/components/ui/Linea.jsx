import React, { useEffect, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import BarLine from "./BarLine";

const timelineData = [
  { year: "1754", hancock: "Graduates from Harvard College", us: "French and Indian War Begins; supports Britain" },
  { year: "1760", hancock: "Travels to England", us: "" },
  { year: "1763", hancock: "Named Partner in Business", us: "Treaty of Paris ends French and Indian War" },
  { year: "1764", hancock: "Thomas Hancock dies", us: "" },
  { year: "1765", hancock: "", us: "Stamp Act imposed by Britain" },
  { year: "1768", hancock: "Ship Liberty seized by British", us: "" },
  { year: "1770", hancock: "", us: "Boston Massacre" },
  { year: "1773", hancock: "", us: "Boston Tea Party" },
  { year: "1774", hancock: "Delivers Boston Massacre Oration", us: "Intolerable Acts Close Boston’s Ports" },
  { year: "1775", hancock: "President of the Continental Congress", us: "American Revolutionary War Begins" },
  { year: "1776", hancock: "", us: "Declaration of Independence" },
  { year: "1777", hancock: "", us: "Articles of Confederation created" },
  { year: "1778", hancock: "Military Expedition to Rhode Island", us: "" },
  { year: "1780", hancock: "First Governor of Massachusetts", us: "" },
  { year: "1781", hancock: "", us: "Battle of Yorktown Ends Major Combat with England" },
  { year: "1785", hancock: "Resigns as Governor, citing health", us: "" },
  { year: "1787", hancock: "Returns as Governor after Shays’s Rebellion", us: "United States Constitution Drafted" },
  { year: "1788", hancock: "Supports US Constitution and Proposes Bill of Rights", us: "" },
  { year: "1789", hancock: "", us: "George Washington Becomes 1st President" },
  { year: "1791", hancock: "", us: "Bill of Rights Ratified" },
  { year: "1793", hancock: "Dies on October 8th", us: "" },
];

export default function Linea() {
  const specialIndex = timelineData.findIndex(item => item.us === "Declaration of Independence");
  const [currentIndex, setCurrentIndex] = useState(specialIndex);
  const scrollRef = useRef(null);
  const [direction, setDirection] = useState(0);

  const scrollToItem = (index) => {
    const element = document.getElementById(`item-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });

    }
  };

  const handleNext = () => {
    if (currentIndex < timelineData.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setDirection(1);
      scrollToItem(newIndex);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setDirection(-1);
      scrollToItem(newIndex);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    const element = document.getElementById(`item-${specialIndex}`);
    if (container && element) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const offset = elementRect.left - containerRect.left - container.clientWidth / 2 + element.clientWidth / 2;
      container.scrollBy({ left: offset, behavior: "smooth" });
    }
    setCurrentIndex(specialIndex);
  }, []);

  return (
    <>

      <div className="">
        <div>
          <BarLine />
        </div>

      </div>

      
    </>
  );
}
