const http = require('http');
const { Command } = require('commander');
const program = new Command();

// Налаштування командного рядка
program
  .requiredOption('-h, --host <host>', 'адреса сервера')
  .requiredOption('-p, --port <port>', 'порт сервера')
  .requiredOption('-c, --cache <cache>', 'шлях до директорії для кешування');

program.parse(process.argv);

// Отримання значень аргументів
const { host, port, cache } = program.opts();

console.log(`Host: ${host}`);
console.log(`Port: ${port}`);
console.log(`Cache directory: ${cache}`);

// Створення HTTP сервера
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Server is working\n');
});

// Запуск сервера
server.listen(port, host, () => {
  console.log(`Сервер запущено за адресою http://${host}:${port}/`);
  console.log(`Кеш файли знаходяться в: ${cache}`);
});

// Обробка помилок
server.on('error', (err) => {
  console.error('Помилка сервера:', err);
});
