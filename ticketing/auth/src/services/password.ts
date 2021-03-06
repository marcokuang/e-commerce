import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// use `promisify` to convert the scrypt callback implementation to a promise based implementation
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buff = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buff.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buff = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    // console.log(hashedPassword, buff.toString("hex"));

    return buff.toString("hex") === hashedPassword;
  }
}
