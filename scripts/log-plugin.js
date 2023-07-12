/**
 * @param {string} filename
 * @returns {import("esbuild").Plugin}
 */
function LogPlugin() {
  return {
    name: "log-plugin",
    setup(build) {
      build.onStart(() => {
        console.log("[esbuild] build start");
      });

      build.onEnd(() => {
        console.log("[esbuild] build end");
      });
    },
  };
}

module.exports = LogPlugin;
