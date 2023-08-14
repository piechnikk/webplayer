<template>
  <div id="app">
    <div id="top">
      <div id="leftBar">
        <div id="playList" @click="changeToPlaylist()">playlist</div>
      </div>
      <div id="left">
        <cover
          v-for="i in json.dirs"
          :key="i"
          :path="i"
          :url="url"
          :fetchx="fetchServe"
        ></cover>
      </div>
      <div id="right">
        <h1>mp3 player</h1>
        <item
          v-for="i in json.files"
          :key="i.id"
          :actual="json.actual"
          :files="i"
          :changeSng="changeSong"
          :songNum="songNr"
          :smallPlay="smallBtnFunction"
        >
        </item>
      </div>
    </div>
    <div id="down">
      <div id="progressBar">
        <input
          type="range"
          name="progressRange"
          id="progressRange"
          :value="progressValue"
          max="1000"
          @input="setCurrentTime()"
        />
      </div>
      <div class="title">{{ actualTitle }}</div>
      <div id="player">
        <img src="./assets/prev.png" id="prev" class="smallBt" @click="prevSong()"/>
        <img src="./assets/play.png" id="play" @click="play()"/>
        <img src="./assets/next.png" id="next" class="smallBt" @click="nextSong()"/>
      </div>
      <div class="timer">
        <span id="actualTime">00:00</span>/<span id="allTime">00:00</span>
      </div>
    </div>
    <audio id="audio">
      <source id="audio_src" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
import Cover from "./components/Cover.vue";
import Item from "./components/Item.vue";
import pauseImg from "./assets/pause.png";
import playImg from "./assets/play.png";

const url = "http://localhost:3000"

export default {
  components: { Cover, Item },
  name: "App",
  data: function () {
    return {
      json: { dirs: "", files: "" },
      actualTitle: "title",
      played: false,
      songNr: null,
      progressValue: 0,
      url: url,
    };
  },
  methods: {
    fetchServe: function (file) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({ info: "next", file: file }),
      };
      fetch(url+"/files", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.json = data;
          if (this.played) {
            this.play();
            this.songNr = null;
          }
        });
    },
    play: function () {
      let audio = document.getElementById("audio");
      let play = document.getElementById("play");
      if (this.songNr != null) {
        let button = document.getElementsByClassName("play")[this.songNr * 2];
        let displayActualTimeInterval = 0;
        if (this.played) {
          play.src = playImg
          button.innerText = "⏵";
          audio.pause();
          clearInterval(displayActualTimeInterval);
        } else {
          let dys = this;
          displayActualTimeInterval = setInterval(function () {
            dys.progressValue = Math.floor(
              (audio.currentTime / audio.duration) * 1000
            );
            let allTimeMin = Math.floor(audio.currentTime / 60);
            let allTimeSec = Math.round(audio.currentTime - allTimeMin * 60);
            if (allTimeSec < 10) allTimeSec = "0" + allTimeSec;
            if (allTimeMin < 10) allTimeMin = "0" + allTimeMin;
            document.getElementById("actualTime").innerText =
              allTimeMin + ":" + allTimeSec;
          }, 1000);
          play.src = pauseImg
          button.innerText = "⏸";
          audio.play();
        }
        this.played = !this.played;
      }
    },
    changeSong: function (id) {
      if (this.songNr != id) {
        this.songNr = id;
        let audio = document.getElementById("audio");

        let folder = this.json.actual;
        if (this.json.actual == null)
          folder = this.json.files[this.songNr].folder;
        this.actualTitle = folder + "/" + this.json.files[this.songNr].file;
        audio.src = url+"/mp3/" + this.actualTitle;
        setTimeout(function () {
          let allTimeMin = Math.floor(audio.duration / 60);
          let allTimeSec = Math.round(audio.duration - allTimeMin * 60);
          if (allTimeSec < 10) allTimeSec = "0" + allTimeSec;
          if (allTimeMin < 10) allTimeMin = "0" + allTimeMin;
          document.getElementById("allTime").innerText =
            allTimeMin + ":" + allTimeSec;
          document.getElementById("actualTime").innerText = "00:00";
        }, 100);
        if (this.played) this.play();
      }
    },
    nextSong: function () {
      if (this.songNr == null) {
        this.songNr = 0;
      } else if (this.songNr == this.json.files.length - 1) this.songNr;
      else {
        this.songNr++;
      }
      let audio = document.getElementById("audio");

      let folder = this.json.actual;
      if (this.json.actual == null)
        folder = this.json.files[this.songNr].folder;
      this.actualTitle = folder + "/" + this.json.files[this.songNr].file;
      audio.src = url+"/mp3/" + this.actualTitle;
      setTimeout(function () {
        let allTimeMin = Math.floor(audio.duration / 60);
        let allTimeSec = Math.round(audio.duration - allTimeMin * 60);
        if (allTimeSec < 10) allTimeSec = "0" + allTimeSec;
        if (allTimeMin < 10) allTimeMin = "0" + allTimeMin;
        document.getElementById("allTime").innerText =
          allTimeMin + ":" + allTimeSec;
        document.getElementById("actualTime").innerText = "00:00";
      }, 100);
      if (this.played) this.play();
    },
    prevSong: function () {
      if (this.songNr == null || this.songNr == 0) this.songNr = 0;
      else this.songNr--;
      let audio = document.getElementById("audio");

      let folder = this.json.actual;
      if (this.json.actual == null)
        folder = this.json.files[this.songNr].folder;
      this.actualTitle = folder + "/" + this.json.files[this.songNr].file;
      1;
      audio.src = url+"/mp3/" + this.actualTitle;
      setTimeout(function () {
        let allTimeMin = Math.floor(audio.duration / 60);
        let allTimeSec = Math.round(audio.duration - allTimeMin * 60);
        if (allTimeSec < 10) allTimeSec = "0" + allTimeSec;
        if (allTimeMin < 10) allTimeMin = "0" + allTimeMin;
        document.getElementById("allTime").innerText =
          allTimeMin + ":" + allTimeSec;
        document.getElementById("actualTime").innerText = "00:00";
      }, 100);
      if (this.played) this.play();
    },
    smallBtnFunction: function (id, action) {
      let playButtons = document.getElementsByClassName("play");
      let button = playButtons[id * 2];
      let button2 = playButtons[id * 2 + 1];
      if (action == "over" && id != this.songNr) {
        button.style.backgroundColor = "#393939";
        button.innerText = "⏵";
        button2.style.backgroundColor = "#393939";
        button2.innerText = "+";
      } else if (action == "out" && id != this.songNr) {
        button.style.backgroundColor = "";
        button.innerText = "";
        button2.style.backgroundColor = "";
        button2.innerText = "";
      } else if (action == "click") {
        setTimeout(this.play, 100);
      } else if (action == "add") {
        let folder = this.json.actual;
        if (this.json.actual == null) folder = this.json.files[id].folder;
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            folder: folder,
            file: this.json.files[id].file,
            size: this.json.files[id].size,
          }),
        };
        fetch(url+"/add", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      }
    },
    setCurrentTime: function () {
      let audio = document.getElementById("audio");
      let val = document.getElementById("progressRange").value;
      audio.currentTime = Math.round((val / 1000) * audio.duration);
    },
    changeToPlaylist: function () {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          get: "get",
        }),
      };
      fetch(url+"/getPlaylist", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.json.files = data;
          this.json.actual = null;
          console.log(data)
        });
    },
  },
  created() {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ info: "first" }),
    };
    fetch(url+"/files", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.json = data;
        console.log(data)
      });
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: #1e2021;
  color: white;
}
h1 {
  text-align: center;
  font-weight: normal;
  color: royalblue;
}
#top {
  width: 100vw;
  height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#leftBar {
  width: 5%;
}
#left {
  width: 15%;
  overflow: auto;
}
#right {
  width: 80%;
  overflow: auto;
}
#down {
  width: 100vw;
  height: 30vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: royalblue;
  position: relative;
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25vw;
  color: white;
}
.timer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25vw;
  color: white;
  font-size: 32px;
}
#player {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 40vw;
  margin-top: 20px;
}
.smallBt {
  width: 15vh;
  height: 15vh;
  cursor: pointer;
  filter:invert(1)
}
#play {
  width: 15vh;
  height: 15vh;
  cursor: pointer;
  filter:invert(1)
}
.play {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 40px;
  height: 40px;
  padding: 0px 1px 0px 1px;
}
#progressBar {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
#progressRange {
  width: 80vw;
}
#playList {
  width: 5vw;
  height: 5vw;
  background-color: #323232;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
}
</style>
