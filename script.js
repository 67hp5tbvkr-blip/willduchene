{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww15420\viewh11620\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0
\cf0 const API_KEY = "
\f1 \expnd0\expndtw0\kerning0
AIzaSyAWnHVIODi6O7PQpNAxSIBlM2LNNynY8H0
\f0 \kerning1\expnd0\expndtw0 ";\
\
const PLAYLISTS = \{\
  trailer: "PLJpwSH_unsgI39IXHReNTR9w0hScxuLki",\
  clip: "PLJpwSH_unsgJBZNUqjH7zSsms_QcwmWNc",\
  capture: "PLJpwSH_unsgJVCaxQdOiQ7UIJvl2SxKCV",\
  interview: "PLJpwSH_unsgIyofHxEz-kRSEgMPZia5DH",\
  showreel: "PLJpwSH_unsgIN3bCbNm-7RSkpsem3VbFM"\
\};\
\
let videos = [];\
let index = 0;\
const batch = 10;\
let currentFilter = "all";\
\
const grid = document.getElementById("grid");\
const loader = document.getElementById("loader");\
\
async function fetchPlaylist(id, category)\{\
  let res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=$\{id\}&key=$\{API_KEY\}`);\
  let data = await res.json();\
\
  return data.items.map(v => (\{\
    title: v.snippet.title,\
    id: v.snippet.resourceId.videoId,\
    thumb: v.snippet.thumbnails.medium.url,\
    category\
  \}));\
\}\
\
async function loadAll()\{\
  for(let cat in PLAYLISTS)\{\
    let data = await fetchPlaylist(PLAYLISTS[cat], cat);\
    videos.push(...data);\
  \}\
  render();\
\}\
\
function render()\{\
  let list = videos.filter(v => currentFilter === "all" || v.category === currentFilter);\
\
  let slice = list.slice(index, index + batch);\
\
  slice.forEach(v => \{\
    let div = document.createElement("div");\
    div.className = "card";\
    div.innerHTML = `<img src="$\{v.thumb\}"><p>$\{v.title\}</p>`;\
    div.onclick = () => openVideo(v.id);\
    grid.appendChild(div);\
  \});\
\
  index += batch;\
\}\
\
window.addEventListener("scroll", () => \{\
  if(window.innerHeight + window.scrollY > document.body.offsetHeight - 200)\{\
    render();\
  \}\
\});\
\
function openVideo(id)\{\
  document.getElementById("lightbox").style.display="flex";\
  document.getElementById("player").src=`https://www.youtube.com/embed/$\{id\}?autoplay=1`;\
\}\
\
document.getElementById("close").onclick = () => \{\
  document.getElementById("lightbox").style.display="none";\
  document.getElementById("player").src="";\
\};\
\
loadAll();}