import React from "react";
import './componnents.css'
import { Link } from "react-router-dom";
import Photos from "./Photos";

function Album({ index, album ,handleAlbumClick,selectedAlbum}) {
    return (
        <div className="albumDiv">
            <span className="albumIndex album">{index}</span>
            <br />
            <span className="album">id: {album.id}</span>
            <br />
            <input
                type="checkbox"
                checked={album.completed}
                onChange={() => UpdateDataOfTodos({ ...album, completed: !album.completed })}
            />
            <Link onClick={() => handleAlbumClick(album.id)}>
                <label className="album"> {album.title}</label>
            </Link>
            <br />
            {selectedAlbum === album.id && <Photos albumId={album.id}/>}
            <br />
        </div>
    );
}

export default Album;

