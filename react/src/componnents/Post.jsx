import React from "react";
import del from "../pictures/delete.png";
import update from "../pictures/update.png";
import './componnents.css';

function Post({index,post,handleDeletePost,UpdateDataOfPost}) {
    return (
        <div className="postDiv">
            <span className="postIndex post">{index}</span>
            <br />
            <span className="post">id: {post.id}</span>
            <br />
            <label className="post"> {post.title}</label>
            <br />
            <div className="updateAndDelete">
                <img className='deleteImage' src={del} onClick={() => handleDeletePost({ ...post })}></img>
                <img className='updateImage' src={update} onClick={() => {
                    const newTitle = prompt("Enter new title:", post.title);
                    if (newTitle !== null) {
                        UpdateDataOfPost({ ...post, title: newTitle });
                    }
                }}></img>
            </div>
        </div>
    );
}
export default Post;