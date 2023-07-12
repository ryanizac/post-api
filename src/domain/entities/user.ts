export class User {
  constructor(private readonly _props: User.Props) {}

  get props() {
    return this._props;
  }

  toPublic(): User.Public {
    const { password, ...publicData } = this._props;
    return publicData;
  }
}

export namespace User {
  export type Props = {
    id: string;
    createAt: Date;
    updateAt: Date;
    name: string;
    email: string;
    password: string;
  };

  export type Public = Omit<Props, "password">;
}
