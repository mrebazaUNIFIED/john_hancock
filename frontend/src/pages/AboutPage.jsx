import { motion } from "framer-motion";
import { FaFeatherAlt, FaSearch, FaBrain, FaShip } from "react-icons/fa";
import heroFondo from '/johncockherp.png'

export default function About() {
  return (
    <div className="font-sans bg-[#f6f4ee]">

      {/* Hero Full Width */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden"
      >
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img
            src={heroFondo}
            alt="John Hancock Papers Hero"
            className="w-full h-full object-cover brightness-50"
          />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative z-10 text-white max-w-3xl px-6"
        >
          <h1 className="text-6xl font-extrabold leading-tight drop-shadow-lg">
            📜 The John Hancock Papers
          </h1>
          <p className="text-xl mt-6 opacity-90">
            A journey through the life of a founder, spanning over 4,000 letters, revolutionary intrigues, and colonial ventures.
          </p>
          <div className="my-5">
            <a href="/" className="my-8 px-8 py-4 bg-[#b60000] rounded-xl font-medium hover:bg-[#8d0000] transition">
              Explore Archive
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">

        {/* About Dr. Griffith */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold text-[#000]">Dr. Jeffrey Griffith</h2>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#f1efe9] p-8 rounded-3xl shadow-2xl space-y-4"
          >
            <p>
              <strong className="text-[#b60000]">🎓 Academic Background:</strong> Dr. Griffith holds a Bachelor of Science in Business Administration and a Bachelor of Arts in History from Chapman University. He later earned a Master of Arts in History from California State University, Fullerton, and completed his PhD at Claremont Graduate University with his dissertation,<b> <em>“God Save the Commonwealth: Massachusetts Election Sermons and a Revolutionary World.”</em></b>
            </p>
            <p>
              <strong className="text-[#b60000]">🏛️ Affiliations & Memberships:</strong> A respected historian, Dr. Griffith is an elected member of the <b> Colonial Society of Massachusetts</b> and <b>the American Antiquarian Society</b>. He also serves on the Council of Visitors for Revolutionary Spaces and holds lifetime membership in the American Historical Association. His extensive affiliations include the Organization of American Historians, American Ancestors (Life Benefactor & Benjamin Franklin Society member), The Associates of the Boston Public Library, The Congregational Library, Friends of Minute Man National Park, Lexington History Museums, Massachusetts Historical Society, The Lantern Society at Old North Illuminated, and the Museum of Worcester.
            </p>
            <p>
              <strong className="text-[#b60000]">🧳 Preservation & Legacy:</strong> Committed to advancing historical research, Dr. Griffith collaborates with various institutions to conserve and display John Hancock’s legacy. He personally funded the digitization of the Massachusetts Historical Society’s Hancock Family Papers collection and has contributed to conservation projects, including the preservation of Hancock’s waistcoat at Lexington History Museums and his personal trunk at the Museum of Worcester.
            </p>
          </motion.div>
        </motion.section>



        {/* John Hancock details */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <h2 className="text-4xl font-bold text-[#000]">John Hancock: More Than Just a Signature</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "🛳️ The Bold Merchant", text: "Owner of a fleet of ships and warehouses, Hancock managed a global trade network from Boston." },
              { title: "📝 The Grand Signer", text: "His signature on the Declaration of Independence is one of the most iconic in history." },
              { title: "🎖️ The Revolutionary Leader", text: "Presided over the Continental Congress and helped forge resistance against the British Crown." },
              { title: "🏠 Boston’s Philanthropist", text: "His mansion by Boston Common and his donations helped shape the city's civic life." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="p-6 border border-[#e0ded8] rounded-3xl bg-[#f1efe9] shadow-xl"
              >
                <h3 className="font-semibold text-xl mb-2 text-[#b60000]">{item.title}</h3>
                <p className="text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* What makes this website unique */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <h2 className="text-4xl font-bold text-[#000]">What Makes This Website Unique?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <FaFeatherAlt size={26} />, title: "Living Archive", desc: "Over 4,000 letters transcribed and available online." },
              { icon: <FaSearch size={26} />, title: "Interactive Index", desc: "Connect facts, characters, and events using AI and dynamic filters." },
              { icon: <FaBrain size={26} />, title: "Historical AI", desc: "Ask questions and discover related letters using advanced AI." },
              { icon: <FaShip size={26} />, title: "Transatlantic Perspective", desc: "Letters from Boston to London and beyond, all in one place." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="flex items-start space-x-4 bg-[#f1efe9] p-6 rounded-3xl shadow-xl hover:shadow-2xl transition"
              >
                <div className="text-[#b60000]">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Left-Line Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative py-10"
        >
          <h2 className="text-4xl font-bold text-[#000] text-center mb-16">🕰️ Hancock Through the Years</h2>

          <div className="flex relative max-w-5xl mx-auto">

            {/* Left Line with Parallax */}
            <motion.div
              initial={{ y: 0 }}
              whileInView={{ y: [0, -30, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#b60000] to-[#8d0000] rounded-full"
            />

            {/* Timeline Cards */}
            <div className="ml-10 space-y-14 w-full">

              {[
                { year: "1737", event: "Born in Braintree, Massachusetts." },
                { year: "1764", event: "Becomes one of Boston’s wealthiest men after inheriting the family business." },
                { year: "1775", event: "Presides over the Second Continental Congress." },
                { year: "1776", event: "Signs the Declaration of Independence with his iconic signature." },
                { year: "1780", event: "Elected as the first governor of Massachusetts." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative flex items-center space-x-6"
                >
                  {/* Pulsating Point */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -left-12 w-6 h-6 bg-[#b60000] rounded-full shadow-md border-4 border-[#f6f4ee] z-20"
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#f1efe9] p-6 rounded-2xl shadow-xl w-full border border-[#e0ded8] hover:shadow-2xl transition"
                  >
                    <span className="font-bold text-[#b60000] text-xl block mb-1">{item.year}</span>
                    <p className="text-gray-700">{item.event}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <a href="/" className="bg-[#b60000] text-white font-semibold text-lg px-10 py-5 rounded-3xl hover:bg-[#8d0000] transition shadow-xl">
            🔍 Explore Hancock’s Archive
          </a>
        </motion.div>

      </div>
    </div>
  );
}
