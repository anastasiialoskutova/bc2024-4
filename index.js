// index.js
const http = require('http');
const fs = require('fs').promises; // Використовуємо fs.promises
const path = require('path');
const { Command } = require('commander');

const program = new Command();

program
  .requiredOption('-h, --host <host>', 'адреса сервера')
  .requiredOption('-p, --port <port>', 'порт сервера')
  .requiredOption('-c, --cache <cache>', 'шлях до директорії для закешованих файлів');

program.parse(process.argv);

const options = program.opts();

// Перевірка на обов'язкові параметри
if (!options.host || !options.port || !options.cache) {
  console.error('All parameters (host, port, cache) are necessary.');
  process.exit(1);
}

const server = http.createServer(async (req, res) => {
  const urlPath = req.url.split('/')[1]; // Отримуємо код статусу з URL
  const filePath = path.join(options.cache, `${urlPath}.jpg`); // Формуємо шлях до файлу

  if (req.method === 'GET') {
    try {
      const image = await fs.readFile(filePath);
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(image);
    } catch (error) {
      if (error.code === 'ENOENT') {
try {
const response = await superagent.get(`https://http.cat/${httpCode}`);
const imageBuffer = response.body;
await fs.writeFile(filePath, imageBuffer);
res.writeHead(200, { 'Content-Type': 'image/jpeg' });
res.end(imageBuffer);
} catch (fetchError) {
res.writeHead(404, { 'Content-Type': 'text/plain' });
res.end('Not Found');
}
} else {
res.writeHead(500, { 'Content-Type': 'text/plain' });
res.end('Internal Server Error');
      }
    }
  } else if (req.method === 'PUT') {
    let body = [];

    req.on('data', chunk => body.push(chunk));
    req.on('end', async () => {
        try {
            await fs.writeFile(filePath, Buffer.concat(body));
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('Created');
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    });
}else if (req.method === 'DELETE') {
  try {
      await fs.unlink(filePath);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Deleted');
  } catch (error) {
      if (error.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
      } else {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
      }
  }
} 
else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
}

   
});

// Запуск сервера
server.listen(options.port, options.host, () => {
  console.log(`Сервер запущено на http://${options.host}:${options.port}`);
});

