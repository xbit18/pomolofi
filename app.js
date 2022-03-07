const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const http = require('http');
const fs = require('fs');
const header = {'Content-Type': 'text/html'};
const stream = require('youtube-audio-stream');
const uri = "https://www.youtube.com/watch?v=5qap5aO4i9A";
const path = require('path')

var static = require('node-static');

var file = new(static.Server)("./static/");

const send = (source, destination, status = 200, headers = header) => {
    destination.writeHead(status, headers);
    fs.createReadStream(source).pipe(destination);
  };

  

  try {
    http.createServer(demo).listen(80, "0.0.0.0")
    function demo (req, res) {
        const url = req.url;
        if (url === '/') {
            return fs.createReadStream(path.join(__dirname, './templates/pomodoro.html')).pipe(res)
          } else if (/youtube/.test(req.url)) {
            stream('http:/' + req.url).pipe(res)
          } else {
            file.serve(req, res);
          }
      }
  } catch (e) {console.error(e)}
  


