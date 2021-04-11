const combine = (audio, video, fileName) => {
    const {spawn} = require("child_process");
    
    const ffmpegProcess = spawn("ffmpeg.exe", [
        "-y",
        "-i", "pipe:4", 
        "-i", "pipe:5", 
        "-map", "0:a",
        "-map", "1:v", 
        "-c:v", 
        "copy", fileName
    ], {
        windowsHide: true,
        stdio: [
          /* Standard: stdin, stdout, stderr */
          'inherit', 'inherit', 'inherit',
          /* Custom: pipe:3, pipe:4, pipe:5 */
          'pipe', 'pipe', 'pipe',
        ],
      });
    
    ffmpegProcess.stdio[3].on('data', chunk => {
        console.log(chunk);
    });

    audio.pipe(ffmpegProcess.stdio[4]);
    video.pipe(ffmpegProcess.stdio[5]);
}

module.exports = combine;