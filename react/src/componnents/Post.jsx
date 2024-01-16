import React, { useState } from "react";
import del from "../pictures/delete.png";
import update from "../pictures/update.png";
import './componnents.css';
import Modal from 'react-modal';
Modal.setAppElement(document.body);

function Post({ index, post, handleDeletePost, UpdateDataOfPost }) {
    const [isPost, setIsPost] = useState(false);
    const [isClick,setIsClick]= useState(false);
    function closeModal() {
        setIsPost(false);
        setIsClick(false);
    }


    return (
        <div  className={`postDiv ${isClick ? "clickedPost" : ""}`}  onClick={()=>{setIsClick(!isClick)}}>
            <span className="postIndex post">{index}</span>
            <br />
            <span className="post">id: {post.id}</span>
            <br />
            <label className="post"> {post.title}</label>
            <button className='showMore' onClick={()=>setIsPost(true)}>Show More</button>
            <br />
            {isPost &&
                <Modal
                    isOpen={isPost}
                    onRequestClose={closeModal}
                    className='photoModal'
                >
                    <span className="close" onClick={closeModal}>&times;</span>
                    <span className="postIndex post">{index}</span>
                    <br />
                    <span className="post">id: {post.id}</span>
                    <br />
                    <label className="post"> {post.title}</label>
                    <br />
                    <label className="post" >{post.body}</label>
                    <br/>
                    <div className="updateAndDelete">
                        <img className='deleteImage' src={del} onClick={() => handleDeletePost({ ...post })}></img>
                        <img className='updateImage' src={update} onClick={() => {
                            const newTitlePost = prompt("Enter a new title for the post:");
                            if (newTitlePost === "") {
                              alert("post must have title")
                            }
                            else {
                              const newBody = prompt("Enter a new body for the post:");
                              if (newBody !== "")
                              UpdateDataOfPost({...post,title:newTitlePost,body:newBody});
                              else
                                alert("post must have body")
                
                            
                            }
                        }}></img>
                        <br />
                    </div>
                </Modal>
            }

        </div>
    );
}
export default Post;