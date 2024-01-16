import React, { useState } from "react";
import './componnents.css'
import { Link, useNavigate } from 'react-router-dom';
import Photos from "./Photos";
import Modal from 'react-modal';
Modal.setAppElement(document.body);

function Album({ index, album }) {

    const [isPhoto, setIsPhoto] = useState(false);
    const navigate = useNavigate();

    function closeModal() {
        setIsPhoto(false);
        navigate('.')
    }

    
    return (
        <div className="albumDiv">
            <span className="albumIndex album">{index}</span>
            <br />
            <span className="album">id: {album.id}</span>
            <br />
            <Link onClick={() => setIsPhoto(true)}
                to={`${album.id}/photos`}
            >
                <label className="album"> {album.title}</label>
            </Link>
            <br />
            {isPhoto &&
                < Modal
                    isOpen={isPhoto}
                    onRequestClose={closeModal}
                    className='photoModal'
                >
                    <span className="close" onClick={closeModal} >&times;</span>
                    <Photos albumId={album.id} />
                    <br />
                </Modal>
            }

        </div >
    );
}

export default Album;

