import "dotenv/config";
import { createServer, routes } from "./main";

async function main() {
  const PORT = process.env.PORT || 3000;
  const server = createServer();

  server.adaptRoutes(routes);

  server.start(PORT);
}

main();
