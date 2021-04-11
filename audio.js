const audio = (audio, fileName) => {
    const {spawn} = require("child_process");
    
    const ffmpegProcess = spawn("ffmpeg.exe", [
        "-y",
        "-i", "pipe:4",  
        fileName
    ], {
        windowsHide: true,
        stdio: [
          /* Standard: stdin, stdout, stderr */
          'inherit', 'inherit', 'inherit',
          /* Custom: pipe:3, pipe:4, pipe:5 */
          'pipe', 'pipe',
        ],
      });
    
    ffmpegProcess.stdio[3].on('data', chunk => {
        console.log(chunk);
    });

    audio.pipe(ffmpegProcess.stdio[4]);
}

module.exports = audio;