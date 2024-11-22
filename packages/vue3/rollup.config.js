import { baseConfig } from "shared/rollup";
import pkg from "./package.json" assert { type: "json" };

export default baseConfig({ input: "src/index.js", pkg });
