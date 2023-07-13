import { GenericController } from "../../../infra";

export type Route = [
  path: string,
  method: Route.Method,
  makeController: () => GenericController,
];

export namespace Route {
  export type Method = "get" | "post" | "put" | "delete";
}
