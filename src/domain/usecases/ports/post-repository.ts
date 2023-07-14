export type PostRepository = {
  exists(title: string): Promise<boolean>;
  create(data: PostRepository.Data): Promise<void>;
};

export namespace PostRepository {
  export type Data = {
    id: string;
    createAt: Date;
    updateAt: Date;
    title: string;
    content: string;
    userId: string;
  };
}
