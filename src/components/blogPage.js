// BlogPage.js
"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: posts, error } = await supabase
        .from("blogs")
        .select("*")
        .order("date", { ascending: false });
      if (error) console.error("Error fetching posts:", error);
      else setPosts(posts);
    };

    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchPosts();
    fetchUser();
  }, []);

  return (
    <div className="container py-5 mt-5 blog-page">
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-6 col-lg-12 mb-4">
            <div className="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary-emphasis">
                  {post.category || "World"}
                </strong>
                <h3 className="mb-0">{post.title}</h3>
                <div className="mb-1 text-body-secondary">
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <p className="card-text mb-auto">
                  {post.content.slice(0, 100)}...
                </p>
                <Link href={`/blog/${post.id}`}>Read more</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {user && (
        <div className="text-center mt-4">
          <Link href="/add-blog">
            <a className="btn btn-outline-light">Add Blog</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
