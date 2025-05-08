declare module "streamifier" {
  import { Readable } from "stream";
  export function createReadStream(obj: Buffer | string): Readable;
}
