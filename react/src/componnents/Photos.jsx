import React, { useState, useEffect } from "react";
import { serverRequests } from "../Api";
import del from "../pictures/delete.png";
import update from "../pictures/update.png";

function Photos({ albumId }) {
    const [photos, setPhotos] = useState([]);
    const [arrayOfObjectOf6Photos, setArrayOfObjectOf6Photos] = useState([]);
    const [currentDiv, setCurrentDiv] = useState(1);
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await serverRequests('GET', `photos?albumId=${albumId}`, null);
                setPhotos(response);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };
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
    const handleAddPhoto = (newTitle,newUrl) => {
        console.log(albumId)
        const newPhoto={albumId:albumId,title:newTitle, thumbnailUrl:newUrl}
        serverRequests('POST', 'photos', newPhoto).then((newPhoto)=>{
            console.log(newPhoto)

            setPhotos((photos)=>[...photos,newPhoto]);
        })
          
      };
    return (
        <div>
            <h2>Photos for Album {albumId}</h2>
            <button className="todoAddButton"
                        onClick={() => {
                            const newTitlePhoto = prompt("Enter a title for the new photo:");
                            if (newTitlePhoto !== null) {
                              const newUrl = prompt("Enter a url for the new photo:");
                              if (newUrl !== null)
                                handleAddPhoto(newTitlePhoto, newUrl);
                        }}}
                    >
                        Add Photo
                    </button>
            <div >
            {arrayOfObjectOf6Photos.map((photosObject, index) => (
                currentDiv === index + 1 && <div className="currentPhotos" key={index + 1}>
                    {Object.keys(photosObject).map((key) => (
                        <div key={key}>
                            <label>{photosObject[key].title}</label>
                            <img className="photosDiv" src={photosObject[key].thumbnailUrl} />
                        </div>
                    ))}
                </div>
            ))}
            </div>
            {
                arrayOfObjectOf6Photos.map((photosObject, index) =>
                (
                    <label className="numDiv" key={index + 1} onClick={() => setCurrentDiv(index + 1)}> {index + 1} </label>
                ))

            }
        </div>
    );
}

export default Photos;
