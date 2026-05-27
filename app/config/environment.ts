import { environment as devEnvironment } from "./environment.dev";
import { environment as prodEnvironment } from "./environment.prod";

const isProduction = process.env.NODE_ENV === "production";

export const environment = isProduction ? prodEnvironment : devEnvironment;
