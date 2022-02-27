import React, { useEffect, useState } from "react";
import axios from "axios";
// import song from "./music.mp3"

import ReactAudioPlayer from "react-audio-player";
// const song = require(`./Songs/music.mp3`);
// import { MultiSelectUnstyled } from "@mui/base";

// import { useState } from 'react'
// var fs=require("fs")
// const fs = require('fs');y

// console.log("song"+song)
function Home() {
  var [test1, setTest] = useState("./Songs/music.mp3");
  var test = "";
  var [response, setResponse] = useState();

  //  useEffect(async() => {
  //     // Update the document title using the browser API
  //     var a=await axios.get("")
  //     setResponse(a)
  //     //setResponse(response.data[0].path)

  //   });
  useEffect(() => {
    function fetchget() {
      axios
        .get("http://localhost:3001/song/getsong")
        .then((res) => {
          setResponse(res);

          setTest(res.data[0].path);
          // console.log(test1)
          // setTest(test)
        })
        .catch((er) => {
          console.log(er);
        });
    }
    fetchget();
    // console.log(require)
  }, []);
  const audio=new Audio(test1)

  // console.log(test1+"happening")

  const songs = async (event) => {
    event.preventDefault();

    // let buffer = response.data[0].file.buffer
    // fs.writeFileSync('binarytest123.mp3', buffer)
  };
  // var text=require(response.data[0].path)

  const testing = (data) => {
    console.log(data ? data.toString() : "");
    return data ? data.toString() : "";
  };
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={songs}>click here</button>
      <audio src={song} controls autoPlay />
      {testing(test1)}
      {/* <audio controls autoPlay>
       
        {/* src="/Users/divakardevaraji/Desktop/new.html/Final Project/final_music_frontend/src/Songs/music.mp3" type="audio/mpeg" 
        <source src={require(testing(test1))} type="audio/mpeg" />
      </audio> */}
      {}
    </div>
  );
}

export default Home;
