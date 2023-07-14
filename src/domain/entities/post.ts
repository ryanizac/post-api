export class Post {
  constructor(private readonly _props: Post.Props) {}

  get props() {
    return this._props;
  }

  toPublic(): Post.Public {
    return this._props;
  }
}

export namespace Post {
  export type Props = {
    id: string;
    createAt: Date;
    updateAt: Date;
    title: string;
    content: string;
    userId: string;
  };

  export type Public = Props;
}
