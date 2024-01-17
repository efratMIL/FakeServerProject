import React, { useState } from "react";
import del from "../pictures/delete-photo.png";
import { Link, useNavigate } from 'react-router-dom';
import update from "../pictures/update.png";
import './componnents.css';
import Modal from 'react-modal';
import Comments from "./Comments";
Modal.setAppElement(document.body);

function Post({ index, post, handleDeletePost, UpdateDataOfPost }) {
    const [isPost, setIsPost] = useState(false);
    const [isComments, setIsComments] = useState(false)

    function closeModal() {
        setIsPost(false);
        setIsComments(false);
    }


    return (

        <div className="postDiv"  >
            <div className="postFirstDetails">
                <span className="postIndex post">{index}</span>
                <span className="post">id: {post.id}</span>
                <label className="post"> {post.title}</label>
                <br />
            </div>
            <button className="postShowButton" onClick={() => setIsPost(true)}>Show More</button>
            <br />

            {isPost &&
                <Modal
                    isOpen={isPost}
                    onRequestClose={closeModal}
                    className='postModal'
                >
                    <span className="close" onClick={closeModal}>&times;</span>
                    <br />
                    <span className="post">id: {post.id}</span>
                    <br />
                    <br />
                    <label className="post">title: {post.title}</label>
                    <br />
                    <br />
                    <label className="post" >body:{post.body}</label>
                    <br />
                    <div className="updateAndDeleteInPost">
                        <img className='deleteImage' src={del} onClick={() => handleDeletePost({ ...post })}></img>
                        <img className='updateImage' src={update} onClick={() => {
                            const newTitle = prompt("Enter new title:", post.title);
                            if (newTitle !== null) {
                                const newBody = prompt("Enter a new body for the post:", post.body);
                                if (newBody !== null)
                                    UpdateDataOfPost({ ...post, title: newTitle, body: newBody });
                                else
                                    alert("post must have body")

                            }
                            else {
                                alert("post must have title")
                                return;
                            }
                        }}></img>
                        <br />
                    </div>
                    <br />
                    <button className="commentAddButton" onClick={() => setIsComments(!isComments)}>{isComments ? "Close Comments❌" : "To All Comments👇"}</button>
                    {isComments ? (
                        <Comments postId={post.id} />
                    ) : (
                        <>
                        </>
                    )

                    }
                </Modal>
            }

        </div>
    );
}
export default Post;