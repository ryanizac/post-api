import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  function start(port: string | number) {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }

  return { app, start };
}
