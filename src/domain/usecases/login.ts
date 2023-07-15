import { ClientError } from "../errors";
import { Auth } from "../structs";
import { AuthGenerator, PasswordEncryptor, UserRepository } from "./ports";
import { LoginArgsValidator } from "./validators";

export class Login {
  private readonly authGenerator: AuthGenerator;
  private readonly userRepository: UserRepository;
  private readonly passwordEncryptor: PasswordEncryptor;

  constructor(ports: Login.Ports) {
    this.authGenerator = ports.authGenerator;
    this.userRepository = ports.userRepository;
    this.passwordEncryptor = ports.passwordEncryptor;
  }

  async execute(rawArgs: Login.Args): Promise<Login.Result> {
    const args = LoginArgsValidator.validate(rawArgs);

    if (args instanceof Error) {
      throw new ClientError(args.message);
    }

    const { email, password } = args;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ClientError("User not found");
    }

    const isValidPassword = await this.passwordEncryptor.isValid(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new ClientError("User not found");
    }

    const auth = await this.authGenerator.generate({
      id: user.id,
      email: user.email,
    });

    return { auth };
  }
}

export namespace Login {
  export type Ports = {
    userRepository: UserRepository;
    authGenerator: AuthGenerator;
    passwordEncryptor: PasswordEncryptor;
  };

  export type Args = {
    email: string;
    password: string;
  };

  export type Result = {
    auth: Auth;
  };
}
