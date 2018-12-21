module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    ts: {
      default : {
        tsconfig: {
          tsconfig: './tsconfig.json',
          passThrough: true,
        }
      }
    },
    watch: {
      ts: {
        files: ['src/\*\*/\*.ts', '../../shared/src/\*\*/\*.ts'],
        tasks: ['ts']
       }
     },
  });
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-ts' );
  grunt.registerTask( 'default', ['ts'] );
};

