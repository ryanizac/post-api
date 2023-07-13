import { Express } from "express";

import { Route } from "../routes";

export function adaptRoute(
  app: Express,
  [path, method, makeController]: Route,
) {
  const controller = makeController();

  app[method](path, async (req, res) => {
    const result = await controller.handle({
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
    });

    if ("error" in result) {
      return res.status(result.code).json({ error: result.error });
    }

    return res.status(result.code).json(result.data);
  });
}
