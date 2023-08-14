# webplayer

This is a web based music player built using JavaScript and Vue.js that plays songs provided by the Node.js server. The project was created in secondary school.

<details>
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#live-demo">Live Demo</a></li>
    <li><a href="#setup">Setup</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#technologies">Technologies</a></li>
  </ul>
</details>

## Live Demo

Explore the [live demo](https://piechnik.ct8.pl/webplayer/) of the webplayer website.

## Setup

To get a copy of this project up and running on your local machine, follow these steps:

1. Clone the repository: 
```
git clone https://github.com/piechnikk/webplayer.git
```
2. Navigate to the server directory: 
```
cd webplayer/SERVER
```
3. Install the server dependencies:
```
npm install
```
4. Run the Node.js server:
```
npm start
```
5. Open another terminal and navigate to the client directory: 
```
cd webplayer/CLIENT
```
4. Install the server dependencies and fix vulnerabilities:
```
npm install
npm audit fix --force
```
5. Run the Vue.js development server:
```
npm run serve
```

## Usage

Open your preferred web browser and navigate to `http://localhost:8080` to access the running application. You can add songs to your playlist by clicking on the plus next to the song.

To upload your mp3 files to the server navigate to `http://localhost:3000/admin` and drop your files. To add the album cover you need to add `cover.jpg` image to the album folder. Name of the album folder is displayed as the album name in webplayer.

- Server
![server page](https://github.com/piechnikk/webplayer/assets/51060535/34ecf825-b9e7-432c-ab25-077a91fd6a53)
![uploaded](https://github.com/piechnikk/webplayer/assets/51060535/7e3a84e0-f02e-4f6f-952f-c7b08dc4f38b)


- Client
![client main page](https://github.com/piechnikk/webplayer/assets/51060535/c4363e13-8287-44d2-87ec-018eaaf091f8)
![playlist](https://github.com/piechnikk/webplayer/assets/51060535/582d67df-fd0b-4c1a-b974-c78a80270f6a)


## Technologies

- Server
<div>
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript">
    <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/NeDB-244A64?style=for-the-badge" alt="NeDB">
</div>

- Client
<div>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"> 
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript">  
    <img src="https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" alt="Vue.js"> 
</div>

---

**Note**: This project was created in secondary school and serves as an example of a Vue.js app.
