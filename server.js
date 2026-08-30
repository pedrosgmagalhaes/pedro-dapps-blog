// Servidor estático mínimo para o Railway (usa $PORT injetado pelo Railway).
import sirv from 'sirv';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, normalize } from 'node:path';

const port = Number(process.env.PORT || 3000);
const distDir = normalize(join(process.cwd(), 'dist'));

// Sem `single: true`: URLs inexistentes DEVEM retornar 404 de verdade
// (nada de servir a home com status 200 para rotas aleatórias — soft-404).
const serve = sirv('dist', { etag: true, gzip: true });

createServer(async (req, res) => {
  serve(req, res, async () => {
    // Arquivo não encontrado → tenta servir a página 404 customizada (404.html)
    try {
      const notFound = await readFile(join(distDir, '404.html'));
      res.statusCode = 404;
      res.setHeader('content-type', 'text/html; charset=utf-8');
      res.end(notFound);
    } catch {
      res.statusCode = 404;
      res.end('404 — página não encontrada');
    }
  });
}).listen(port, () => {
  console.log(`Pedro dApps Blog → http://localhost:${port}`);
});
