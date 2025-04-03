import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api"; // Make sure this is the correct path
import DOMPurify from "dompurify";
import { Card, CardContent, CardHeader, Typography } from "@mui/material"; // Make sure to import from MUI

export default function View() {
  const { slug } = useParams(); // Capture the slug from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/api/post-rud/${slug}/`); // Fetch by slug
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Could not load the post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <Card>
        <CardHeader title={<Typography variant="h4" className="text-2xl font-bold">{post.title}</Typography>} />
        <Typography variant="body2" className="text-gray-500 text-center mb-4">Published on {post.date}</Typography>

        <CardContent>
          {post.image && (
            <img
              src={post.image} 
              alt="Post image"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}

          

          <div className="mt-6 text-gray-700">
            <p className="mb-2"><strong>Author:</strong> {post.author?.name} {post.author?.last_name}</p>
            <p className="mb-2"><strong>Recipient:</strong> {post.recipient?.name} {post.recipient?.last_name}</p>
            <p className="mb-2"><strong>Document:</strong> {post.document?.id}</p>
            <p className="mb-2"><strong>Institution:</strong> {post.institution?.name}</p>
            <p className="mb-2"><strong>Location:</strong> {post.sublocation?.name}</p>
            <p className="mb-4"><strong>Type:</strong> {post.type?.type}</p>
          </div>

          <div className="prose max-w-none mb-4">
            <h3 className="font-semibold text-lg">Content:</h3>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} />
          </div>
          
          {post.citeAs && (
            <div className="prose max-w-none italic text-gray-600 mb-4">
              <h3 className="font-semibold text-lg">Citation:</h3>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.citeAs) }} />
            </div>
          )}

          
        </CardContent>
      </Card>
    </div>
  );
}
