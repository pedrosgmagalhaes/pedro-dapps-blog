// Servidor estático mínimo para o Railway (usa $PORT injetado pelo Railway).
import sirv from 'sirv';
import { createServer } from 'node:http';

const port = Number(process.env.PORT || 3000);
const serve = sirv('dist', { single: true, etag: true, gzip: true });

createServer((req, res) => {
  serve(req, res, () => {
    res.statusCode = 404;
    res.end('404 — página não encontrada');
  });
}).listen(port, () => {
  console.log(`Pedro dApps Blog → http://localhost:${port}`);
});
