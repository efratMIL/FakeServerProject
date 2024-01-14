import React, { useState } from "react";
import './componnents.css'
import { Link } from "react-router-dom";
import Photos from "./Photos";
import Modal from 'react-modal';
Modal.setAppElement(document.body);

function Album({ index, album, handleAlbumClick, selectedAlbum }) {
    const [isPhoto, setIsPhoto] = useState(false);

    function closeModal() {
        setIsPhoto(false);
    }
    function handlelinkClick() {
        handleAlbumClick(album.id)
        setIsPhoto(true)
    }
    
    return (
        <div className="albumDiv">
            <span className="albumIndex album">{index}</span>
            <br />
            <span className="album">id: {album.id}</span>
            <br />
            <Link onClick={handlelinkClick}>
                <label className="album"> {album.title}</label>
            </Link>
            <br />
            {isPhoto &&
                <Modal
                    isOpen={isPhoto}
                    onRequestClose={closeModal}
                    className='photoModal'
                >
                    <span className="close" onClick={closeModal}>&times;</span>
                    <Photos albumId={album.id} />
                    <br />
                </Modal>
            }

        </div>
    );
}

export default Album;

