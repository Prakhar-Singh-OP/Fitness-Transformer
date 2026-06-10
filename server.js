const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const APP_HTML = path.join(PUBLIC_DIR, 'fitness_transformer.html');

const server = http.createServer((req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const urlPath = decodeURIComponent(requestUrl.pathname);

  let filePath = path.join(PUBLIC_DIR, urlPath);
  if (urlPath === '/' || urlPath === '/index.html' || urlPath === '/fitness_transformer.html') {
    filePath = APP_HTML;
  }

  if (urlPath.startsWith('/public/')) {
    const strippedPath = urlPath.substring('/public/'.length);
    filePath = path.join(PUBLIC_DIR, strippedPath);
  }

  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    if (stats.isDirectory()) {
      if (urlPath === '/' || urlPath === '/index.html' || urlPath === '/fitness_transformer.html') {
        fs.stat(APP_HTML, (appErr, appStats) => {
          if (appErr) {
            res.writeHead(404);
            res.end('Not Found');
            return;
          }

          serveFile(APP_HTML, appStats, req, res);
        });
        return;
      }

      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    serveFile(filePath, stats, req, res);
  });
});

function serveFile(filePath, stats, req, res) {
  // Set content type
  const ext = path.extname(filePath).toLowerCase();
  let contentType = 'application/octet-stream';
  if (ext === '.mp4') contentType = 'video/mp4';
  else if (ext === '.webm') contentType = 'video/webm';
  else if (ext === '.html') contentType = 'text/html';
  else if (ext === '.css') contentType = 'text/css';
  else if (ext === '.js') contentType = 'application/javascript';
  else if (ext === '.json') contentType = 'application/json';
  else if (ext === '.png') contentType = 'image/png';
  else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Length', stats.size);

  // Support range requests for video
  if (req.headers.range) {
    const parts = req.headers.range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
    const chunksize = end - start + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
    });

    fs.createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.writeHead(200);
    fs.createReadStream(filePath).pipe(res);
  }
}

server.listen(PORT, () => {
  console.log(`Static file server running on http://localhost:${PORT}`);
  console.log(`Serving files from: ${PUBLIC_DIR}`);
  console.log(`Access videos at: http://localhost:${PORT}/3D%20Animation%20Videos/`);
});
