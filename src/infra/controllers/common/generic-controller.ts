import { Http } from "./http";

export abstract class GenericController {
  abstract handle(request: Http.Request): Promise<Http.Response>;
}
