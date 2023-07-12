const Env = require("./env");
const baseOptions = require("../esbuild.json");
const esbuild = require("esbuild");
const NodemonPlugin = require("./nodemon-plugin");
const LogPlugin = require("./log-plugin");

/** @param {esbuild.BuildOptions} baseOptions */
async function devBuild(baseOptions) {
  const ctx = await esbuild.context({
    ...baseOptions,
    plugins: [LogPlugin(), NodemonPlugin(baseOptions.outfile)],
  });

  await ctx.watch();
}

/** @param {esbuild.BuildOptions} baseOptions */
async function build(baseOptions) {
  await esbuild.build({ ...baseOptions });
}

async function main() {
  const isDevMode = Env.compare("mode", "dev");
  const buildFunction = isDevMode ? devBuild : build;
  await buildFunction(baseOptions);
}

main();
