import React, { useState, useEffect } from "react";
import { serverRequests } from "../Api";
import del from "../pictures/delete-photo.png";
import update from "../pictures/update.png";

function Photos({ albumId }) {
    const [photos, setPhotos] = useState([]);
    const [arrayOfObjectOf6Photos, setArrayOfObjectOf6Photos] = useState([]);
    const [currentDiv, setCurrentDiv] = useState(1);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await serverRequests('GET', `photos?albumId=${albumId}`, null);
                setPhotos(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching photos:', error);
                setLoading(false);

            }
        };
        setLoading(true);
        fetchPhotos();
    }, [albumId]);

    useEffect(() => {
        setDivsForPhotos();
    }, [photos]);

    function setDivsForPhotos() {
        var newArray = [];

        for (var i = 0; i < photos.length; i += 6) {
            var newObject = {};

            for (var j = 0; j < 6; j++) {
                if (i + j < photos.length) {
                    newObject[`photo${j + 1}`] = photos[i + j];
                } else {
                    break;
                }
            }

            newArray.push(newObject);
        }

        setArrayOfObjectOf6Photos(newArray);
    }
    const handleAddPhoto = (newTitle, newUrl) => {
        const newPhoto = { albumId: albumId, title: newTitle, thumbnailUrl: newUrl }
        serverRequests('POST', 'photos', newPhoto).then((newPhoto) => {
            setPhotos((photos) => [...photos, newPhoto]);
        })

    };

    function handleDeletePhoto(deletedPhoto) {
        serverRequests('DELETE', `photos/${deletedPhoto.id}`, deletedPhoto).then(() => {
            setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== deletedPhoto.id));
        })
    }
    const UpdateDataOfPhoto = (updatePhoto) => {
        serverRequests('PUT', `photos/${updatePhoto.id}`, updatePhoto)
            .then((foundPhoto) => {
                setPhotos((prevPhotos) =>
                    prevPhotos.map((photo) =>
                        photo.id === foundPhoto.id ?
                            { ...photo, title: foundPhoto.title, thumbnailUrl: foundPhoto.thumbnailUrl }
                            : photo
                    )
                );
            })
            .catch((error) => {
                console.error('Error updating photos:', error);
            });
    };
    return (
        <div>
            <div className="modalHeader">
                <h4 className="photosHeader">Photos for Album {albumId}</h4>
                <button className="photoAddButton"
                    onClick={() => {
                        const newTitlePhoto = prompt("Enter a title for the new photo:");
                        if (newTitlePhoto !== null) {
                            const newUrl = prompt("Enter a url for the new photo:");
                            if (newUrl !== null)
                                handleAddPhoto(newTitlePhoto, newUrl);
                        }
                    }}
                >
                    Add Photo
                </button>
            </div>

            {arrayOfObjectOf6Photos.length!=0 ? (

                <div >
                    {arrayOfObjectOf6Photos.map((photosObject, index) => (

                        currentDiv === index + 1 && <div className="currentPhotos" key={index + 1}>
                            {Object.keys(photosObject).map((key) => (

                                <div className='photoDiv' key={key}>
                                    <div className="titleInDiv" >
                                        <label >{photosObject[key].title}</label>
                                    </div>
                                    <div className="photosInDiv" >
                                        <img className="photo" src={photosObject[key].thumbnailUrl} />
                                        <div className="updateAndDelete">
                                            <img className='deleteImage' src={del} onClick={() => handleDeletePhoto({ ...photosObject[key] })}></img>
                                            <img className='updateImage' src={update} onClick={() => {
                                                const newTitle = prompt("Enter new title:", photosObject[key].title);
                                                if (newTitle !== null) {
                                                    const newUrl = prompt("Enter new url of photo:", photosObject[key].thumbnailUrl);
                                                    if (newUrl !== null) {
                                                        UpdateDataOfPhoto({ ...photosObject[key], title: newTitle, thumbnailUrl: newUrl });
                                                    }
                                                }
                                            }}></img>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <>
                <br/>
                <h1>NO Photos Yet...</h1>
                <h3>to add more click above👆</h3>
                </>
            )}
            <div className="divsOfNumbers">
                {
                    arrayOfObjectOf6Photos.map((photosObject, index) =>
                    (
                        <label
                            key={index + 1}
                            className={`numDiv ${currentDiv === index + 1 ? 'selected' : ''}`}
                            onClick={() => setCurrentDiv(index + 1)}> {index + 1} </label>
                    ))
                }
            </div>
        </div>
    );
}

export default Photos;
