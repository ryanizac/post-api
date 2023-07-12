import { User } from "../entities";
import { ClientError } from "../errors";
import { IdGenerator, UserRepository } from "./ports";

export class CreateUser {
  private readonly idGenerator: IdGenerator;
  private readonly userRepository: UserRepository;

  constructor(ports: CreateUser.Ports) {
    this.idGenerator = ports.idGenerator;
    this.userRepository = ports.userRepository;
  }

  async execute(args: CreateUser.Args): Promise<CreateUser.Result> {
    const { name, email, password } = args;

    const exists = await this.userRepository.exists(email);

    if (exists) {
      throw new ClientError("The email is already in use");
    }

    const id = this.idGenerator.generate();
    const createAt = new Date();
    const updateAt = createAt;

    const user = new User({
      id,
      createAt,
      updateAt,
      name,
      email,
      password,
    });

    await this.userRepository.create(user.props);

    return {
      user: user.toPublic(),
    };
  }
}

export namespace CreateUser {
  export type Ports = {
    idGenerator: IdGenerator;
    userRepository: UserRepository;
  };

  export type Args = {
    email: string;
    name: string;
    password: string;
  };

  export type Result = {
    user: User.Public;
  };
}
