import './pages.css'
import React, { useState, useEffect, useContext } from "react";
import { serverRequests } from "../Api";
import Post from '../componnents/Post';
import { userContext } from "../App";
import reset from "../pictures/clear.png";

function Posts() {
    const userData = useContext(userContext);
    const [posts, setPosts] = useState([]);
    const [searchPosts, setSearchPosts] = useState([]);
    const [selectedSearch, setSelectedSearch] = useState("toDoNumber");
    useEffect(() => {
        const fetchDataOfPosts = async () => {
            try {
                const response = await serverRequests('GET', `users/${JSON.stringify(userData.id)}/posts`, null);
                const foundTodos = response;
                setPosts(foundTodos);
                setSearchPosts(foundTodos);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchDataOfPosts();
    }, []);

    const handleSearchChange = (event) => {
        const newSearch = event.target.value;
        setSelectedSearch(newSearch);
        switch (newSearch) {
          case "postNumber":
              const postNumber = prompt("Enter post Id:");
              if (postNumber !== null) {
                const foundPost = posts.find((post) => post.id === parseInt(postNumber));
                if (foundPost) {
                  setSearchPosts([foundPost]);
                } else {
                  alert("Post with the specified id not found");
                }
              }
            break;
          case "title":
            const postTitle = prompt("Enter post title:");
            if (postTitle !== null) {
              const foundPost = posts.find((post) => post.title === postTitle);
              if (foundPost) {
                setSearchPosts([foundPost]);
              } else {
                alert("Post with the specified title not found");
              }
            }
            break;
        default:
             break;
        }
    }

    const handleDeletePost = (deletePost) => {
        serverRequests('DELETE', `posts/${deletePost.id}`, deletePost).then(()=>{
          setSearchPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletePost.id));})
        setPosts(posts)
      };

      const UpdateDataOfPost = (updatePost) => {
        serverRequests('PUT', `posts/${updatePost.id}`, updatePost)
          .then((foundPost) => {
            setSearchPosts((prevPosts) =>
              prevPosts.map((post) =>
                post.id === foundPost.id ? { ...post, title:foundPost.title} : post
              )
            );
            setPosts(searchPosts);
          })
          .catch((error) => {
            console.error('Error updating posts:', error);
          });
      };

      const handleAddPost = (newTitlePost,newBody) => {
        const newPost={userId: userData.id,title:newTitlePost,body:newBody}
        serverRequests('POST', 'posts', newPost).then((newPost)=>{
          setSearchPosts((prevPosts) => [
          ...prevPosts,newPost])})
          setPosts(posts);
      };
    return (
        <>
        <label >
        Search by:                     
        <select value={selectedSearch} onChange={handleSearchChange}>
          <option value="postNumber" >Post Id</option>
          <option value="title">Title</option>
        </select>
      </label>
      <img  className="clearTodo" src={reset} onClick={()=>setSearchPosts(posts)}></img>
      <button className="todoAddButton"
          onClick={() => {
            const newTitlePost = prompt("Enter a title for the new post:");
            if (newTitlePost !== null) {
                const newBody = prompt("Enter a body for the new post:");
                if(newBody!==null)
                handleAddPost(newTitlePost,newBody);
            }
          }}
        >
          Add Post
        </button>
        <div className="postsDiv">
            {searchPosts.map((post, index) => (
                <Post
                    key={post.id}
                    post={post}
                    index={index + 1}
                    handleDeletePost={handleDeletePost}
                    UpdateDataOfPost={UpdateDataOfPost}
                />
            ))}
        </div>
        </>
    );
}
export default Posts;