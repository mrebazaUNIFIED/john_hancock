import React, { useState, useEffect } from "react";
import api from "../../api";
import TablePost from "../../components/table/TablePost";

export default function Post() {

  const [posts, setPost] = useState([])

  useEffect(() => {
    getPost()
  }, []);

  const getPost = () => {
    api.get("/api/post/")
      .then((res) => setPost(res.data))
      .catch((err) => alert("Error post: " + err));
  }

  const refresh = () =>{
    getPost()
  }
    

  return (
    <div>
      <TablePost posts={posts} refresh={refresh} />
    </div>
  )
}
