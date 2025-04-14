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
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">

        {/* Dr. Griffith Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-12"
        >
          <div className="relative ">
            <h2 className="text-5xl font-extrabold text-[#b60000] tracking-tight relative z-10 text-center">
              Dr. Jeffrey M. Griffith
            </h2>
            <div className="h-2 w-32 bg-[#b60000] mx-auto mt-2 rounded-full"></div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#f1efe9] border-l-8 border-[#b60000] p-10 rounded-3xl shadow-2xl space-y-6 transition-all duration-300"
          >
            <p className="text-lg leading-relaxed text-gray-800">
              <strong>Dr. Jeffrey M. Griffith</strong> holds a dual degree with a <strong>Bachelor of Science in Business Administration</strong> and a <strong>Bachelor of Arts in History</strong> from <em>Chapman University</em>, and then achieved a <strong>Master of Arts in History</strong> from <em>California State University, Fullerton</em>. His dissertation, <em>“God Save the Commonwealth: Massachusetts Election Sermons and a Revolutionary World”</em>, earned Dr. Griffith a <strong>PhD</strong> from <em>Claremont Graduate University</em>.
            </p>

            <p className="text-lg leading-relaxed text-gray-800">
              Griffith actively interacts with numerous archives and historical societies, gaining elected membership in the <strong>Colonial Society of Massachusetts</strong> and the <strong>American Antiquarian Society</strong>, and is part of the <em>Council of Visitors</em> for <em>Revolutionary Spaces</em>. Additionally, Griffith is a <strong>lifetime member</strong> of the <em>American Historical Association</em>, a member of the <em>Organization of American Historians</em>, a <strong>Life Benefactor</strong> and <strong>Benjamin Franklin Society</strong> member at <em>American Ancestors</em>, a member with <em>The Associates of the Boston Public Library</em>, a member at <em>The Congregational Library</em>, a member of <em>Friends of Minute Man National Park</em>, a member at <em>Lexington History Museums</em>, a member at <em>Massachusetts Historical Society</em>, a member of <em>The Lantern Society at Old North Illuminated</em>, and a member at the <em>Museum of Worcester</em>.
            </p>

            <p className="text-lg leading-relaxed text-gray-800">
              In an effort to provide opportunities for scholars, researchers, and anyone interested in history to further study <strong>John Hancock’s contribution</strong> to American history, Griffith has worked alongside many of these organizations to conserve and display Hancock’s <em>written and physical artifacts</em>. Griffith <strong>funded the digitalization</strong> of the <em>Massachusetts Historical Society’s Hancock Family Papers collection</em>, while also funding <strong>conservation projects</strong> for <em>Lexington History Museums’ John Hancock waistcoat</em> and the <em>Museum of Worcester’s trunk</em> that belonged to <strong>John Hancock</strong>.
            </p>
          </motion.div>

        </motion.section>

        {/* John Hancock Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="relative inline-block text-center mx-auto">
            <h2 className="text-5xl font-extrabold text-[#b60000] tracking-tight relative z-10">
              About Papers of John Hancock and Accompanying Website
            </h2>
            <div className="h-2 w-36 bg-[#b60000] mx-auto mt-2 rounded-full"></div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#f1efe9] border-r-8  border-[#b60000] p-10 rounded-3xl shadow-2xl space-y-6 transition-all duration-300"
          >
            <p className="text-lg leading-relaxed text-gray-800">
              In 2024, the <strong>Colonial Society of Massachusetts</strong> chose <strong>Dr. Jeffrey Griffith</strong> as the editor for their multi-volume <em>Papers of John Hancock</em> project. As a publishing entity, since 1892 the Colonial Society has striven to provide researchers with previously unpublished material of key historical figures in an effort to provide additional insights on countless historical subjects.
            </p>

            <p className="text-lg leading-relaxed text-gray-800">
              To date, no comprehensive collection of <strong>Hancock’s writings</strong> has been curated, in part because his papers were scattered between distant relatives, since Hancock did not have any surviving direct descendants. In order to assemble the over <strong>4,000 letters</strong> that span across four decades, over <strong>80 archives, repositories, and collections</strong> across <em>North America</em> and <em>Europe</em> have been consulted. The multi-volume <em>Papers of John Hancock</em>, along with this accompanying website, seeks to overcome the fragmented reality of Hancock's correspondence, not only providing a centralized resource for his writings and discussions with numerous historical figures on countless subjects.
            </p>

            <p className="text-lg leading-relaxed text-gray-800">
              Both the <strong>printed and digital collections</strong> of <strong>John Hancock’s correspondence</strong> will provide unparalleled access to a key <strong>Founding Father</strong> whose circumstances have resulted in him being largely absent from extensive biographical work and inclusion in broader historical studies. The published <em>Papers of John Hancock</em> will include <strong>extensive annotations</strong> on individuals mentioned and the events discussed. Further, a <strong>comprehensive index</strong> included in the back of each printed volume will point a researcher to the particular letters that mention the subject being studied.
            </p>

            <p className="text-lg leading-relaxed text-gray-800">
              The website, meanwhile, employs <strong>revolutionary technology</strong> that modernizes a static index while providing users the opportunities to <strong>discover, connect, and consider</strong> whatever content they desire. Using <strong>Dr. JMG’s AI tools</strong>, users can ask any question they desire of the uploaded correspondence authored or received by <strong>John Hancock</strong>. Based on the query, the AI will show which letters relate to the topic, <strong>filtering content from thousands of letters</strong> to efficiently point the user to discussions, debates, and activity involving Hancock and his correspondents.
            </p>

            <p className="text-lg leading-relaxed text-gray-800">
              <strong>John Hancock’s life, activities, and contributions</strong> intersect with virtually all realms of <em>18th century American society</em>. Hancock’s family had deep roots in the <strong>religious foundation of Massachusetts</strong>, as his grandfather and father were <em>Congregationalist ministers</em>. As a <strong>businessman</strong>, he learned from his uncle, traveled to <em>England</em>, and sought to vertically integrate his operations through ownership of a <strong>wharf, warehouse, dozens of ships</strong>, procuring and exporting his own oil supply, and importing goods from around the <em>British Empire</em>. As tensions with England intensified, Hancock <strong>sacrificed his business operations and fortune</strong> to guide resistance to imperial overreach on a continental stage as <strong>President of the Continental Congress</strong>, while later reigning as the <strong>first governor of the Commonwealth of Massachusetts</strong>. Hancock’s fantasies of being a conquering military hero were often ceremonial, but included one excursion as a <strong>general to Rhode Island</strong>. Socially, John Hancock projected power as a <em>Man of Capital</em> through his <strong>house by the Boston Common</strong>, his <strong>extravagant attire</strong>, and his <strong>extensive benefactions</strong> to numerous communities and individuals. Hancock both interacted with and shaped each of these pillars of <em>eighteenth-century American society</em> throughout his life, and the <strong>thousands of letters curated here</strong> provide insight into his <strong>contributions and abilities</strong>.
            </p>
          </motion.div>

        </motion.section>

      </div>


    </div>
  );
}
