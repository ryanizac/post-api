export type CacheUseCase<
  U extends CacheUseCase.UseCase,
  Args extends CacheUseCase.InferArgs<U> = CacheUseCase.InferArgs<U>,
  Result extends CacheUseCase.InferResult<U> = CacheUseCase.InferResult<U>,
> = {
  get(args: Args): Promise<Result | null>;
  set(args: Args, data: Result): Promise<void>;
};

export namespace CacheUseCase {
  export type UseCase = {
    execute(args: any, auth?: any): Promise<any>;
  };

  export type InferArgs<U extends UseCase> = Parameters<U["execute"]>[0];

  export type InferResult<U extends UseCase> = Awaited<
    ReturnType<U["execute"]>
  >;
}
