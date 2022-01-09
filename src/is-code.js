import { modulOperations } from "./language-detection.js";

export default async function (str) {
  return await modulOperations.runModel(str);
}
