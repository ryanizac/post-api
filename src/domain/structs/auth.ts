export type Auth = {
  token: string;
};

export namespace Auth {
  export type Payload = {
    id: string;
    email: string;
  };
}
