import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Index from "./layouts/Index"
import Home from "./pages/HomePage"
import About from "./pages/AboutPage"
import Contact from "./pages/ContactPage"
import Community from "./pages/CommunityPage"
import TranscriptPage from "./pages/TranscriptPage"
import LetterPage from "./pages/LetterPage"
import AIRagPage from "./pages/AIRagPage"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/admin/Dashboard"
import Statics from "./pages/admin/Statics"
import Recipient from "./pages/admin/Recipient"
import Period from "./pages/admin/Period"
import Author from "./pages/admin/Author"
import Institution from "./pages/admin/Institution"
import Location from "./pages/admin/Location"
import Type from "./pages/admin/Type"
import Post from "./pages/admin/Post"
import ProtectedRoute from "./components/ProtectedRoute"
import View from "./pages/post/View"
import Edit from "./pages/post/Edit"
import Create from "./pages/post/Create"
import FilesPage from "./pages/FilesPage"

function Logout(){
  localStorage.clear()
  return <Navigate to="/"/>
}

function App() {
  return (
    <BrowserRouter >
      <Routes>
        {/* Layout general */}
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/community" element={<Community />} />
          <Route path="/transcript" element={<TranscriptPage />} />
          <Route path="/letter" element={<LetterPage />} />
          <Route path="/airag" element={<AIRagPage />} />
          <Route path="/files" element={<FilesPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>}>
          <Route index element={<Statics />} /> {/* Página principal del dashboard */}
          <Route path="/admin/statics" element={<Statics />} />
          <Route path="/admin/author" element={<Author />} />
          <Route path="/admin/recipient" element={<Recipient />} />
          <Route path="/admin/period" element={<Period />} />
          <Route path="/admin/institution" element={<Institution />} />
          <Route path="/admin/location" element={<Location />} />
          <Route path="/admin/type" element={<Type />} />
          <Route path="/admin/post" element={<Post />} />
          <Route path="/admin/post/create" element={<Create />} />
          <Route path="/admin/post/:slug" element={<View />} />
          <Route path="/admin/post/edit/:slug" element={<Edit />} />
        </Route>



      </Routes>
    </BrowserRouter>
  )
}

export default App
