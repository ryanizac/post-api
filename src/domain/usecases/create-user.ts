import { User } from "../entities";
import { ClientError } from "../errors";
import { IdGenerator, PasswordEncryptor, UserRepository } from "./ports";
import { CreateUserArgsValidator } from "./validators";

export class CreateUser {
  private readonly idGenerator: IdGenerator;
  private readonly userRepository: UserRepository;
  private readonly passwordEncryptor: PasswordEncryptor;

  constructor(ports: CreateUser.Ports) {
    this.idGenerator = ports.idGenerator;
    this.userRepository = ports.userRepository;
    this.passwordEncryptor = ports.passwordEncryptor;
  }

  async execute(raw: CreateUser.Args): Promise<CreateUser.Result> {
    const args = CreateUserArgsValidator.validate(raw);

    if (args instanceof Error) {
      throw new ClientError(args.message);
    }

    const { name, email, password: initialPassword } = args;

    const exists = await this.userRepository.exists(email);

    if (exists) {
      throw new ClientError("The email is already in use");
    }

    const id = this.idGenerator.generate();
    const createAt = new Date();
    const updateAt = createAt;
    const password = await this.passwordEncryptor.encrypt(initialPassword);

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
    passwordEncryptor: PasswordEncryptor;
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
