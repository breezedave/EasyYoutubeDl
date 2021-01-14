const fs = require("fs");
const youtubedl = require("youtube-dl");
const [a, b, c] = process.argv;
const videoUrl = `http://www.youtube.com/watch?v=${c}`

if (!fs.existsSync("videos")) fs.mkdirSync("videos", 0744);

youtubedl.getInfo(videoUrl, null, (err, info) => {
  const filename = info._filename;
  const video = youtubedl(videoUrl, [], {cwd:__dirname});
 
  video.on('info', function(info) {
    console.log('Download started');
    console.log('filename: ' + info._filename);
    console.log('size: ' + info.size);	
  });
 
  video.pipe(fs.createWriteStream(`videos\\${filename}`));
});