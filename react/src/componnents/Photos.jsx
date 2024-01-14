import React, { useState, useEffect } from "react";
import { serverRequests } from "../Api";

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

    return (
        <div>
            <h2>Photos for Album {albumId}</h2>
            {
                arrayOfObjectOf6Photos.map((photosObject, index) =>
                (
                    <label key={index + 1} onClick={() => setCurrentDiv(index + 1)}>{index + 1} </label>
                ))

            }
            {arrayOfObjectOf6Photos.map((photosObject, index) => (
                currentDiv === index + 1 && <div key={index + 1}>
                    {Object.keys(photosObject).map((key) => (
                        <div key={key}>
                            {photosObject[key].title}
                            <img className="photosDiv" src={photosObject[key].thumbnailUrl} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Photos;
