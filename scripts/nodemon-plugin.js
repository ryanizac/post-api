const esbuild = require("esbuild");
const nodemon = require("nodemon");

/**
 * @param {string} filename
 * @returns {esbuild.Plugin}
 */
function NodemonPlugin(filename) {
  const name = "nodemon-plugin";
  let started = false;

  /** @param {esbuild.PluginBuild} build */
  function setup(build) {
    build.onEnd(() => {
      if (started) {
        return;
      }

      started = true;

      nodemon({
        exec: "node " + filename,
        watch: filename,
      });
    });
  }

  return {
    name,
    setup,
  };
}

module.exports = NodemonPlugin;
