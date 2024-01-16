import React, { useState, useEffect, useContext } from "react";
import Album from '../componnents/Album';
import { userContext } from "../App";
import { serverRequests } from "../Api";
import reset from "../pictures/clear.png";

function Albums() {
  const userData = useContext(userContext);
  const [albums, setAlbums] = useState([]);
  const [searcAlbums, setSearcAlbums] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");


  useEffect(() => {
    const fetchDataOfAlbums = async () => {
      try {
        const response = await serverRequests('GET', `users/${JSON.stringify(userData.id)}/albums`, null);
        const foundAlbums = response;
        setAlbums(foundAlbums);
        setSearcAlbums(foundAlbums);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    fetchDataOfAlbums();
  }, []);



  const handleSearchChange = (event) => {
    const newSearch = event.target.value;
    setSelectedSearch(newSearch);
    switch (newSearch) {
      case "albumId":
        const albumId = prompt("Enter Album Id:");
        if (albumId !== null) {
          const foundAlbums = albums.find((album) => album.id === parseInt(albumId));
          if (foundAlbums) {
            setSearcAlbums([foundAlbums]);
          } else {
            alert("Album with the specified number not found");
          }
        }
        break;
      case "title":
        const albumTitle = prompt("Enter Album title:");
        if (albumTitle !== null) {
          const foundAlbums = albums.find((album) => album.title === albumTitle);
          if (foundAlbums) {
            setSearcAlbums([foundAlbums]);
          } else {
            alert("Album with the specified title not found");
          }
        }
        break;
      default:
        break;
    }
  };
  const handleAlbumClick = (albumId) => {
    setSelectedAlbum(albumId);
  };
  const handleAddAlbum = (newTitle) => {
    const newAlbum = { userId: userData.id, title: newTitle }
    serverRequests('POST', 'albums', newAlbum).then((newAlbum) => {
      setSearcAlbums((prevAlbums) => [
        ...prevAlbums, newAlbum]

      )
      setAlbums((prevAlbums) => [
        ...prevAlbums, newAlbum]

      )
    })
  };

  return (
    <>
      <br />
      <div className="albumsButtonsDiV">
        <label >
          Search by:
          <select value={selectedSearch} onChange={handleSearchChange} >
            <option value="">👇</option>
            <option value="albumId" >Album Id</option>
            <option value="title">Title</option>
          </select>
        </label>
        <img className="clear" src={reset} onClick={() => setSearcAlbums(albums)}></img>
        <button className="albumAddButton"
          onClick={() => {
            const newAlbum = prompt("Enter a new Album:");
            if (newAlbum !== null) {
              handleAddAlbum(newAlbum);
            }
          }}
        >
          Add Album
        </button>
      </div>

      <div className="albumsDiv">
        {searcAlbums.length !== 0 ? (
          <>
            {searcAlbums.map((album, index) => (
              <Album
                key={album.id}
                album={album}
                index={index + 1}
                handleAlbumClick={handleAlbumClick}
                selectedAlbum={selectedAlbum}
              />
            ))}
          </>
        ) : (
          <>
           <div className="noAlbums">
            <br />
            <h1>NO Albums Yet...</h1>
            <br />
            <h3>to add more click above👆</h3>
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default Albums;
