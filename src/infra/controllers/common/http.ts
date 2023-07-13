export namespace Http {
  export type Request = {
    body: any;
    query: any;
    params: any;
    headers: any;
  };

  export type Response =
    | { code: number; data: any }
    | { code: number; error: string };
}
