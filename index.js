const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");
const [a, b, c, d] = process.argv;
const videoUrl = c.indexOf("watch") >= 0? c: `http://www.youtube.com/watch?v=${c}`;
const combineFFmpeg = require("./combine");
const audioFFmpeg = require("./audio");
const cookie = require("./cookie");

const requestOptions = {
  headers: {
    "x-client-data": "CIS2yQEIpbbJAQjBtskBCKmdygEIlqzKAQiNucoBCPjHygEI+M/KAQiJgMsBCOOcywEIqZ3LAQigoMsBCPTwywEI3fLLARjN8ssB",
    cookie,
  }
}


const run = async() => {
  const info = await ytdl.getInfo(videoUrl);
  const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio', requestOptions});
  const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', requestOptions});
  const title = info.player_response.videoDetails.title
  .replace(/\//gim, "_")
  .replace(/(\"|\+|\|)/gim, "");

  const audio = ytdl(videoUrl, {format: audioFormat, requestOptions});
  
  console.log(d);
  if(d == "audio") {
    if (!fs.existsSync("audio")) fs.mkdirSync("audio");
    return audioFFmpeg(audio, `audio/${title}.mp3`);
  } else {
    const video = ytdl(videoUrl, {format: videoFormat, requestOptions});

    if (!fs.existsSync("video")) fs.mkdirSync("video");
    return combineFFmpeg(audio, video, `video/${title}.mp4`);
  }
}

run();