import "./App.css";
import { vocab } from "./vocabList";
import { useState, useEffect } from "react";
import { ImageList } from "@mui/material";
function App() {
    const randomNumber = Math.floor(Math.random() * Math.floor(vocab.length));
    const API_TOKEN = "34077297-1c0b852d674044e575914a384";
    const [word, setWord] = useState();
    const [wordDesc, setWordDesc] = useState();
    const [photos, setPhotos] = useState();
    const fetchedPhoto = async (word) => {
        const request = await fetch(`https://pixabay.com/api/?key=${API_TOKEN}&q=${word}&per_page=3`);
        const results = await request.json();

        if (!results) {
            throw new Error("Could not");
        } else {
            setPhotos(results.hits);
        }
    };
    useEffect(() => {
        setWord(vocab[randomNumber].FIELD1);
        setWordDesc(vocab[randomNumber].FIELD2);
        fetchedPhoto(vocab[randomNumber].FIELD1);
    }, []);

    console.log(photos);
    return (
        <div className="App">
            <h1>{word}</h1>
            <h3>{wordDesc}</h3>
            <div style={{ margin: "0 auto" }}>
                {photos === undefined
                    ? ""
                    : photos.map((el) => {
                          return (
                              <img
                                  style={{ height: "450px", width: "450px", margin: "15px" }}
                                  key={el.id}
                                  src={el.largeImageURL}
                                  alt={el.type}
                              />
                          );
                      })}
            </div>
        </div>
    );
}

export default App;
