import React, { useState, useEffect } from 'react'
import { FaDollarSign, FaUsers, FaBox, FaChartBar } from 'react-icons/fa';
import { MdOutlinePublic } from 'react-icons/md';
import api from "./../../api";
import { MdCategory } from "react-icons/md";
import { TbTimelineEvent } from "react-icons/tb";
import { BsEnvelopeFill } from "react-icons/bs";
import { FaPenNib,FaUniversity, FaMapMarkerAlt, FaRegNewspaper } from "react-icons/fa";

export default function Statics() {
  const [author, setAuthor] = useState([])
  const [recipient, setRecipient] = useState([])
  const [period, setPeriod] = useState([])
  const [institution, setInstitution] = useState([])
  const [location, setLocation] = useState([])
  const [type, setType] = useState([])
  const [post, setPost] = useState([])


  const metricCards = [
    { title: "Weekly Sales", value: "714k", icon: <FaDollarSign className="text-xl" /> },
    { title: "New Users", value: "1.35m", icon: <FaUsers className="text-xl" /> },
    { title: "Item Orders", value: "1.72m", icon: <FaBox className="text-xl" /> },
    { title: "Buy Reports", value: "234", icon: <FaChartBar className="text-xl" /> },
  ];


  const getAuthors = () => {
    api.get("/api/author/")
      .then((res) => setAuthor(res.data))
      .catch((err) => alert("Error al cargar los periodos: " + err));
  }

  const getInstitution = () => {
    api.get("/api/institution/")
      .then((res) => setInstitution(res.data))
      .catch((err) => alert("Error institution: " + err));
  }

  const getLocation = () => {
    api.get("/api/sublocation/")
      .then((res) => setLocation(res.data))
      .catch((err) => alert("Error location: " + err));
  }

  const getPeriod = () => {
    api.get("/api/period/")
      .then((res) => setPeriod(res.data))
      .catch((err) => alert("Error al cargar los periodos: " + err));
  }

  const getPost = () => {
    api.get("/api/post/")
      .then((res) => setPost(res.data))
      .catch((err) => alert("Error post: " + err));
  }

  const getRecipient = () => {
    api.get("/api/recipient/")
      .then((res) => setRecipient(res.data))
      .catch((err) => alert("Error al cargar los periodos: " + err));
  }

  const getType = () => {
    api.get("/api/type/")
      .then((res) => setType(res.data))
      .catch((err) => alert("Error type: " + err));
  }

  useEffect(() => {
    getAuthors()
    getInstitution()
    getLocation()
    getPeriod()
    getPost()
    getRecipient()
    getType()
  }, []);

  return (
    <>
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
     
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold mb-2">{author.length}</p>
                <p className="text-gray-500">Authors</p>
              </div>
              <div className="text-blue-500 p-3 bg-blue-100 rounded-lg">
                <FaPenNib size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold mb-2">{recipient.length}</p>
                <p className="text-gray-500">Recipients</p>
              </div>
              <div className="text-blue-500 p-3 bg-blue-100 rounded-lg">
                <BsEnvelopeFill size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold mb-2">{period.length}</p>
                <p className="text-gray-500">Periods</p>
              </div>
              <div className="text-blue-500 p-3 bg-blue-100 rounded-lg">
                <TbTimelineEvent size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold mb-2">{institution.length}</p>
                <p className="text-gray-500">Institutions</p>
              </div>
              <div className="text-blue-500 p-3 bg-blue-100 rounded-lg">
                <FaUniversity size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold mb-2">{location.length}</p>
                <p className="text-gray-500">Locations</p>
              </div>
              <div className="text-blue-500 p-3 bg-blue-100 rounded-lg">
                <FaMapMarkerAlt size={20} />
              </div>
            </div>
          </div>
          

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold mb-2">{type.length}</p>
                <p className="text-gray-500">Types</p>
              </div>
              <div className="text-blue-500 p-3 bg-blue-100 rounded-lg">
                <MdCategory size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold mb-2">{post.length}</p>
                <p className="text-gray-500">Posts</p>
              </div>
              <div className="text-blue-500 p-3 bg-blue-100 rounded-lg">
                <FaRegNewspaper size={20} />
              </div>
            </div>
          </div>




       
      </div>

      {/* Website Visits Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Website Visits</h2>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">[+435]</span>
              <select className="bg-gray-100 px-3 py-1 rounded-lg">
                <option>2023</option>
              </select>
            </div>
          </div>
          <ul className="space-y-3">
            {['Item A', 'Item B', 'Item C'].map((item, index) => (
              <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-50">
                <span>{item}</span>
                <MdOutlinePublic className="text-gray-400" />
              </li>
            ))}
          </ul>
        </div>

        {/* Current Visits Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Current Visits</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-4">Active</h3>
              {['25%', '15%', '24%'].map((percent, index) => (
                <div key={index} className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full mb-1">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: percent }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{percent}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-medium mb-4">Avoided</h3>
              {['Europe', 'Africa'].map((region, index) => (
                <div key={index} className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full mb-1">
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: index === 0 ? '40%' : '30%' }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{region}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
