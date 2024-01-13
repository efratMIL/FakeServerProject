import React, { useState, useEffect } from "react";
import { serverRequests } from "../Api";

function Photos({ albumId }) {
    const [photos, setPhotos] = useState([]);

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

    return (
        <div>
            <h2>Photos for Album {albumId}</h2>
            <ul>
                {photos.map((photo) => (
                    <li key={photo.id}>{photo.title}
                        <img src={photo.thumbnailUrl}></img>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Photos;
