import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

function Home() {
  // var [response, setResponse] = useState([]);
  var [songDetails, setSongDetails] = useState({ name: "test" });
  var [songSelected, setSongSelected] = useState(false);
  var [openPlaylist, setOpenPlaylist] = useState(false);
  var [playlist, setPlayList] = useState([]);
  var [tamilsong, setTamilSong] = useState([]);
  var [englishsong, setEnglishSong] = useState([]);
  var [telugusong, setTeluguSong] = useState([]);
  const navigate = useNavigate();
  // var  a="";

  const playSong = (songDetails) => {
    setSongDetails(songDetails);

    setSongSelected(true);
  };

  useEffect(() => {
    axios
      .get("http://online-musicplayer.herokuapp.com/song/getsong")
      .then((res) => {
        songarray(res.data);
      })
      .catch((er) => {
        console.log(er);
      });

    // }
    // fetchget();
  }, []);
  function songarray(songs) {
    songs.forEach((song) => {
      if (song.Language === "Tamil") {
        setTamilSong([...tamilsong], tamilsong.push(song));
      } else if (song.Language === "Telugu") {
        setTeluguSong([...telugusong], telugusong.push(song));
      } else if (song.Language === "English") {
        setEnglishSong([...englishsong], englishsong.push(song));
      }
    });
  }

  const handlePlayList = (song) => {
    var temp = playlist;

    // if(!temp.includes(song)){
    temp.push(song);
    // }
    setPlayList(temp);

    setOpenPlaylist(true);
  };
  const showsong = (song) => {
    return (
      <Grid item key={song._id}>
        <div>
          <Card
            sx={{ maxWidth: 300, minWidth: 300, minHeight: 250 }}
            className="mouse"
          >
            <CardMedia
              onClick={() => {
                playSong(song);
              }}
              component="img"
              height="200"
              image={song.img}
              alt={song.name}
            />
            <CardContent
              onClick={() => {
                playSong(song);
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {song.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {song.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  playSong(song);
                }}
              >
                Play
              </Button>
              {!playlist.includes(song) ? (
                <Button
                  size="small"
                  onClick={() => {
                    handlePlayList(song);
                  }}
                >
                  Add to Playlist
                </Button>
              ) : (
                <></>
              )}
            </CardActions>
          </Card>
        </div>
      </Grid>
    );
  };

  return (
    <div className="home">
      {localStorage.getItem("token") != null && (
        <div>
          <AppBar
            position="static"
            style={{ backgroundColor: "black", opacity: "0.7" }}
          >
            <div style={{ display: "flex" }}>
              {/* <TextField label="Search" variant="outlined" color="secondary" className="white" style={{alignItems:"center", margin: "" , color:"white"}}/>
               */}
              <input type="text" placeholder="Search" className="white" />
              <Typography
                variant="h5"
                component="div"
                sx={{
                  flexGrow: 1,
                  padding: 4,
                  display: { xs: "none", sm: "block" },
                }}
              >
                Music Player
              </Typography>

              {!openPlaylist && (
                <Button
                  style={{ color: "red" }}
                  onClick={() => {
                    setOpenPlaylist(true);
                  }}
                >
                  PlayList
                </Button>
              )}

              <Button
                variant="h6"
                // noWrap
                component="div"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                LogOut
              </Button>

              {openPlaylist && (
                <Button
                  style={{ color: "red" }}
                  onClick={() => {
                    setOpenPlaylist(false);
                  }}
                >
                  Home
                </Button>
              )}
            </div>
          </AppBar>

          <Grid
            alignContent="center"
            justifyContent="center"
            container
            style={{ marginTop: 10 }}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {}
            {!openPlaylist && (
              <Grid item style={{ width: "100vw" }}>
                <h2>Tamil Songs</h2>
              </Grid>
            )}

            {!openPlaylist &&
              tamilsong.map((song) => {
                return showsong(song);
              })}

            {!openPlaylist && (
              <Grid item style={{ width: "100vw" }}>
                <h2>Telugu Songs</h2>
              </Grid>
            )}
            {!openPlaylist &&
              telugusong?.map((song) => {
                return showsong(song);
              })}

            {!openPlaylist && (
              <Grid item style={{ width: "100vw" }}>
                <h2>English Songs</h2>
              </Grid>
            )}
            {!openPlaylist &&
              englishsong?.map((song) => {
                return showsong(song);
              })}

            {openPlaylist &&
              playlist?.map((song) => {
                return (
                  <Grid item key={song._id}>
                    <Card
                      sx={{ maxWidth: 345, minWidth: 300, minHeight: 250 }}
                      onClick={() => {
                        playSong(song);
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={song.img}
                        alt={song.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {song.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {song.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Play</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
          <Modal
            open={songSelected}
            onClose={() => {
              setSongSelected(false);
            }}
            style={{ backgroundColor: "red", margin: "10% 30%" }}
            className="app"
          >
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{ maxWidth: 800, minWidth: 600, minHeight: 250 }}
                style={{ textAlign: "center" }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={songDetails.img}
                  alt={songDetails.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Album:{songDetails.name}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    Language: {songDetails.Language}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    Artists: {songDetails.Artist}
                  </Typography>
                </CardContent>

                <audio
                  src={songDetails?.path}
                  style={{ width: "100%" }}
                  controls
                  autoPlay
                />
              </Card>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Home;
