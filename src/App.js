import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  
  // Tamil Songs Playlist
  const playlist = [
    { id: 1, title: "Annan Ennada", artist: "Tamil Song", src: "/music/02ANNAN ENNADA.mp3" },
    { id: 2, title: "Yaarai Nambi", artist: "Tamil Song", src: "/music/03YAARAI NAMBI.mp3" },
    { id: 3, title: "Alazgedra", artist: "Tamil Song", src: "/music/042 Alazgedra.mp3" },
    { id: 4, title: "Satti Suttadhada", artist: "Tamil Song", src: "/music/04SATTI SUTTADHADA.mp3" },
    { id: 5, title: "Muruganai", artist: "Tamil Song", src: "/music/050 Muruganai.mp3" },
    { id: 6, title: "Senthoor Kandhaiyya", artist: "Tamil Song", src: "/music/052 Senthoor Kandhaiyya!!s.mp3" },
    { id: 7, title: "Un Kannil Neer", artist: "Tamil Song", src: "/music/10UN KANNIL NEER.mp3" },
    { id: 8, title: "Mayakkam Enadhu", artist: "Tamil Song", src: "/music/12MAYAKKAM ENADHU.mp3" },
    { id: 9, title: "Yen Piranthai", artist: "Tamil Song", src: "/music/30YEN PIRANTHAI.mp3" },
    { id: 10, title: "Adi Jumpa", artist: "Tamil Song", src: "/music/Adi-Jumpa-MassTamilan.com.mp3" },
    { id: 11, title: "Anbe Neeyene", artist: "Tamil Song", src: "/music/Anbe-Neeyene-MassTamilan.com.mp3" },
    { id: 12, title: "Easan Adi Potri Sivapuranam", artist: "Tamil Song", src: "/music/Easan Adi Potri Sivapuranam.mp3" },
    { id: 13, title: "Ennulea Ennulea", artist: "Tamil Song", src: "/music/Ennulea-Ennulea-MassTamilan.com.mp3" },
    { id: 14, title: "Iraivanukke Nee", artist: "Tamil Song", src: "/music/Iraivanukke_Nee_[Pagalworlds.Me]_[128].mp3" },
    { id: 15, title: "Kaavaalaa", artist: "Tamil Song", src: "/music/Kaavaalaa-MassTamilan.dev.mp3" },
    { id: 16, title: "Maanin Iru Kangal", artist: "Tamil Song", src: "/music/Maanin-Iru-Kangal-MassTamilan.io.mp3" },
    { id: 17, title: "Maarugo Maarugo", artist: "Tamil Song", src: "/music/Maarugo-Maarugo-MassTamilan.com.mp3" },
    { id: 18, title: "Machan Meesai", artist: "Tamil Song", src: "/music/Machan-Meesai.mp3" },
    { id: 19, title: "Mainaru Vetti Katti", artist: "Tamil Song", src: "/music/Mainaru-Vetti-Katti-MassTamilan.dev.mp3" },
    { id: 20, title: "Malai Kovil Vaasal", artist: "Tamil Song", src: "/music/Malai-Kovil-Vaasal.mp3" },
    { id: 21, title: "Uzhaippali-illatha", artist: "Tamil Song", src: "/music/Uzhaippali-illatha.mp3" },

  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', nextSong);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', nextSong);
      };
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentSong].src;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => setCurrentSong((prev) => (prev + 1) % playlist.length);
  const prevSong = () => setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="App">
      <div className="background-animation"></div>
      
      <div className="music-container">
        <div className="player-section">
          <div className="album-art">
            <div className="vinyl-record">
              <div className="vinyl-center"></div>
            </div>
          </div>
          
          <div className="song-info">
            <h2 className="song-title">{playlist[currentSong].title}</h2>
            <p className="artist-name">{playlist[currentSong].artist}</p>
          </div>
          
          <div className="progress-container">
            <span className="time-display">{formatTime(currentTime)}</span>
            <div className="progress-bar" onClick={handleProgressClick}>
              <div 
                className="progress-fill" 
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              ></div> 
            </div>
            <span className="time-display">{formatTime(duration)}</span>
          </div>
          
          <audio ref={audioRef} />
          
          <div className="controls">
            <button className="control-btn" onClick={prevSong}>⏮</button>
            <button className="play-btn" onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="control-btn" onClick={nextSong}>⏭</button>
          </div>
        </div>
        
        <div className="playlist-section">
          <h3 className="playlist-title">Playlist</h3>
          <div className="playlist">
            {playlist.map((song, index) => (
              <div 
                key={song.id} 
                className={`playlist-item ${index === currentSong ? 'active' : ''}`}
                onClick={() => setCurrentSong(index)}
              >
                <div className="song-details">
                  <span className="song-name">{song.title}</span>
                  <span className="song-artist">{song.artist}</span>
                </div>
                <span className="song-duration">♪</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
