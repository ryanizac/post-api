export type UserRepository = {
  exists(email: string): Promise<boolean>;
  create(data: UserRepository.Data): Promise<void>;
  findById(id: string): Promise<UserRepository.Data | null>;
};

export namespace UserRepository {
  export type Data = {
    id: string;
    createAt: Date;
    updateAt: Date;
    name: string;
    email: string;
    password: string;
  };
}
