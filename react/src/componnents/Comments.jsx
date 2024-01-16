import React, { useState, useEffect, useContext } from "react";
import { serverRequests } from "../Api";
import del from "../pictures/delete-photo.png";
import update from "../pictures/update.png";
import { userContext } from '../App';
import addComment from "../pictures/addComment.png";



function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useContext(userContext);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await serverRequests('GET', `comments?postId=${postId}`, null);
                setComments(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setLoading(false);
            }
        };
        setLoading(true);
        fetchComments();
    }, [postId]);


    function handleAddComment(newNameComment, newBody) {
        const newComment = { postId: postId, name: newNameComment, email: userData.email, body: newBody }
        serverRequests('POST', 'comments', newComment)
            .then((addedComment) => {
                setComments((prevComments) => [...prevComments, addedComment])
            })
            .catch((error) => {
                console.error('Error adding comment:', error);
            });

    }
    function handleDeleteComments(deletedComment) {
        if (deletedComment.email === userData.email) {
            serverRequests('DELETE', `comments/${deletedComment.id}`, deletedComment).then(() => {
                setComments((prevComments) => prevComments.filter((comment) => comment.id !== deletedComment.id));
            })
        }
        else {
            alert("can't delete other's comments")
            return;
        }
    }

    function UpdateDataOfcomment(updateComment) {
        serverRequests('PUT', `comments/${updateComment.id}`, updateComment)
            .then((foundComment) => {
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.id === foundComment.id ?
                            { ...comment, name: foundComment.name, body: foundComment.body }
                            : comment
                    )
                );
            })
            .catch((error) => {
                console.error('Error updating comments:', error);
            });

    };

    return (
        <>
            <div className="comments">
                <div className="addComment">
                    <img className='deleteImage' src={addComment} onClick={() => {
                        const newNameComment = prompt("Enter a name for the new comment:");
                        if (newNameComment !== null) {
                            const newBody = prompt("Enter a body for the new comment:");
                            if (newBody !== null)
                                handleAddComment(newNameComment, newBody);
                            else
                                alert("comment must have body")

                        }
                        else {
                            alert("comment must have name")
                            return;
                        }

                    }}></img>
                </div>
                {comments.length != 0 ? (
                    <>
                        {comments.map((comment, index) =>
                            <div className="todoDiv" key={index}>
                                <span className="todoIndex task">{index}</span>
                                <br />
                                <span className="task">id: {comment.id}</span>
                                <br />
                                <span className="task">name: {comment.name}</span>
                                <br />
                                <label className="task">Email: {comment.email}</label>
                                <br />
                                <label className="task">body: {comment.body}</label>

                                <br />
                                {<div className="updateAndDelete">
                                    <img className='deleteImage' src={del} onClick={() => handleDeleteComments({ ...comment })}></img>
                                    <img className='updateImage' src={update} onClick={() => {
                                        if (userData.email === comment.email) {
                                            const newName = prompt("Enter new name:", comment.name);
                                            if (newName !== null) {
                                                const newBody = prompt("Enter new body:", comment.body);
                                                if (newBody !== null) {
                                                    UpdateDataOfcomment({ ...comment, name: newName, body: newBody });
                                                }
                                            }
                                        }
                                        else {
                                            alert("can't update other's comments")
                                            return;
                                        }
                                    }}
                                    ></img>
                                </div>}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <br />
                        <h1>NO comments Yet...</h1>
                        <h3>to add more click above👆</h3>
                    </>
                )}
            </div>
        </>
    )
}

export default Comments;
