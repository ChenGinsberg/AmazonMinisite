module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        concurrent: {
            dev: [
                'nodemon'
            ],
            options: {
                logConcurrentOutput: true
            }
        },
        nodemon: {
            script: 'bin/www',
            ignore: ['Gruntfile.js']
        }

    });

    grunt.registerTask('default', 'concurrent');

}