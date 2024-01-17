import './pages.css'
import React, { useState, useEffect, useContext } from "react";
import { serverRequests } from "../Api";
import Post from '../componnents/Post';
import { userContext } from "../App";
import reset from "../pictures/clear.png";

function Posts() {
  const userData = useContext(userContext);
  const [myPosts, setMyPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [isMyPost, setIsMyPost] = useState(true);

  useEffect(() => {
    const fetchDataOfAllPosts = async () => {
      try {
        await serverRequests('GET', `posts`, null).then((foundTodos) => {
          setAllPosts(foundTodos);

        })
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchDataOfAllPosts();
  }, []);

  useEffect(() => {
    setMyPosts(
      allPosts.filter((post) => post.userId === userData.id)
    )
    setSearchPosts(myPosts)

  }, [allPosts]);

  const handleSearchChange = (event) => {
    const newSearch = event.target.value;
    setSelectedSearch(newSearch);
    switch (newSearch) {
      case "postNumber":
        const postNumber = prompt("Enter post Id:");
        if (postNumber !== null) {
          const foundPost = searchPosts.find((post) => post.id === parseInt(postNumber));
          if (foundPost) {
            setSearchPosts([foundPost]);
            setSelectedSearch('')
          } else {
            alert("Post with the specified id not found");
            setSelectedSearch('')
          }
        }
        break;
      case "title":
        const postTitle = prompt("Enter post title:");
        if (postTitle !== null) {
          const foundPost = searchPosts.find((post) => post.title === postTitle);
          if (foundPost) {
            setSearchPosts([foundPost]);
            setSelectedSearch('')
          } else {
            alert("Post with the specified title not found");
            setSelectedSearch('')
          }
        }
        break;
      default:
        break;
    }
  }

  const handleDeletePost = (deletePost) => {
    serverRequests('DELETE', `posts/${deletePost.id}`, deletePost).then(() => {
      setSearchPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletePost.id));
      setMyPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletePost.id))
    })
  };

  const UpdateDataOfPost = (updatePost) => {
    serverRequests('PUT', `posts/${updatePost.id}`, updatePost)
      .then((foundPost) => {
        setSearchPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === foundPost.id ? { ...post, title: foundPost.title, body: foundPost.body } : post
          )
        );
        setMyPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === foundPost.id ? { ...post, title: foundPost.title, body: foundPost.body } : post
          ));
      })
      .catch((error) => {
        console.error('Error updating posts:', error);
      });
  };

  const handleAddPost = (newTitlePost, newBody) => {
    const newPost = { userId: userData.id, title: newTitlePost, body: newBody }
    serverRequests('POST', 'posts', newPost).then((newPost) => {
      setSearchPosts((prevPosts) => [
        ...prevPosts, newPost])

      setMyPosts((prevPosts) => [
        ...prevPosts, newPost]);

    })
  };

  return (
    <>
      <br />
      <div className="postButtonsDiV">
        <label >
          Search by:
          <select value={selectedSearch} onChange={handleSearchChange}>
            <option value="">👇</option>
            <option value="postNumber" >Post Id</option>
            <option value="title">Title</option>
          </select>
        </label>

        <img className="clear" src={reset} onClick={() => { isMyPost ? setSearchPosts(myPosts) : setSearchPosts(allPosts) }}></img>
        <button className="allPostButton" onClick={() => { setSearchPosts(allPosts), setIsMyPost(false) ,setSelectedSearch('')}}>All Posts</button>
        <button className="myPostButton" onClick={() => { setSearchPosts(myPosts), setIsMyPost(true),setSelectedSearch('') }}>My Posts</button>
        <button
        
          className="postAddButton"
          onClick={() => {
            const newTitlePost = prompt("Enter a title for the new post:");
            if (newTitlePost !== undefined && newTitlePost !== null && newTitlePost !== "") {
              const newBody = prompt("Enter a body for the new post:");
              if (newBody !== undefined && newBody !== null && newBody !== "") {
                handleAddPost(newTitlePost, newBody);
              } else {
                alert("post must have body");
              }
            } else {
              alert("post must have title");
            }
          }}
        >
          Add Post
        </button>

      </div>
      <div className="postsDiv">
        {searchPosts.length !== 0 ? (
          <>
            {
              searchPosts.map((post, index) => (
                <Post
                  key={post.id}
                  post={post}
                  index={index + 1}
                  handleDeletePost={handleDeletePost}
                  UpdateDataOfPost={UpdateDataOfPost}
                />
              ))
            }
          </>
        ) : (
          <div className="noPosts">
            <br />
            <h1>NO Posts Yet...</h1>
            <br />
            <h3>to add more click above👆</h3>
          </div>
        )
        }
      </div>
    </>
  );
}
export default Posts;