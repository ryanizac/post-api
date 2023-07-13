import express from "express";
import cors from "cors";
import { Route } from "../routes";
import { adaptRoute } from "./adapt-route";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  function adaptRoutes(routes: Route[]) {
    for (const route of routes) {
      adaptRoute(app, route);
    }
  }

  function start(port: string | number) {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }

  return { app, start, adaptRoutes };
}
