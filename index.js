const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");
const [a, b, c] = process.argv;
const videoUrl = `http://www.youtube.com/watch?v=${c}`
const combine = require("./combine");

const run = async() => {
  if (!fs.existsSync("videos")) fs.mkdirSync("videos");
  
  const info = await ytdl.getInfo(videoUrl);
  const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
  const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
  const title = info.player_response.videoDetails.title;

  const audio = ytdl(videoUrl, {format: audioFormat});
  const video = ytdl(videoUrl, {format: videoFormat});

  combine(audio, video, `videos/${title}.mp4`);
}

run();