import "dotenv/config";
import { createServer } from "./main";

async function main() {
  const PORT = process.env.PORT || 3000;
  const server = createServer();

  server.start(PORT);
}

main();
