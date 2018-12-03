module.exports = function(grunt) {
    "use strict";
  
    grunt.initConfig({
      ts: {
        app: {
          files: [{
            src: ["./src/\*\*/\*.ts", "../shared/src/\*\*/\*.ts"], // , "!src/.baseDir.ts"
            dest: "./dist"
          }],
          options: {
            module: "commonjs",
            target: "es6",
            sourceMap: false,
            rootDir: ".."
          }
        }
      },
      watch: {
        ts: {
          files: ["server/src/\*\*/\*.ts", "shared/src/\*\*/\*.ts"],
          tasks: ["ts"]
        }
      }
    });
  
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
  
    grunt.registerTask("default", [
//      "copy",
      "ts"
    ]);
  
  };