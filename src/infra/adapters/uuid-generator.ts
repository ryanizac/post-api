import { v4 as uuid } from "uuid";
import { IdGenerator } from "../../domain";

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return uuid();
  }
}
