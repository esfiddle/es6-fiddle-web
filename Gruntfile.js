module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var jsFiles = [
            'static/lib/jshint/**/*.js',
            'static/lib/codemirror/**/*.js',
            'src/es6-fiddle.js',
            'src/*-example.js',
            'src/add-examples.js'
        ],
        styleFiles = ['static/lib/**/*.css', 'style/*.styl'],
        lintFiles = ['app.js', 'api.js', 'src/*.js'],
        pkg = grunt.file.readJSON('package.json'),
        npmTasks = [
            'grunt-contrib-jshint',
            'grunt-contrib-stylus',
            'grunt-contrib-uglify',
            'grunt-contrib-watch',
            'grunt-jscs',
            'grunt-contrib-imagemin',
            'grunt-inline',
            'grunt-browser-sync',
            'grunt-express-server'
        ];

    grunt.initConfig({
        pkg: pkg,
        jscs: {
            all: lintFiles,
            options: {
                config: '.jscs.json',
                fix: true
            }
        },
        jshint: {
            all: lintFiles,
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            compile: {
                files: {
                    'static/src/es6-fiddle.js': jsFiles,
                    'static/lib/babel/babel.min.js' : ['static/lib/babel/*.js', '!static/lib/babel/babel.min.js']
                }
            }
        },
        stylus: {
            compile: {
                files: {
                    'static/style/es6-fiddle.css': styleFiles
                },
                options: {
                    import: ['nib']
                }
            }
        },
        watch: {
            options: {
                reload: true
            },
            style: {
                files: styleFiles,
                tasks: ['stylus', 'inline']
            },
            src: {
                files: jsFiles,
                tasks: ['uglify']
            },
            html: {
                files: 'src/index.html',
                tasks: ['inline']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    src: ['**/*.{png,jpg,gif}'],
                }]
            }
        },
        inline: {
            index: {
                src: 'src/index.html',
                dest: 'static/index.html'
            },
            about: {
                src: 'src/about.html',
                dest: 'static/about.html'
            }
        },
        eslint: {
            options: {
                config: '.eslintrc',
            },
            target: ['src/**/*.js', 'Gruntfile.js']
        },
        browserSync: {
            bsFiles: {
                src: [jsFiles, styleFiles],
            },
            options: {
                watchTask: true,
                proxy: 'http://localhost:3000',
                reloadOnRestart: true
            }
        },
        express: {
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        }
    });

    npmTasks.forEach(function(task) {
        grunt.loadNpmTasks(task);
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('test', ['jshint', 'jscs', 'eslint']);
    grunt.registerTask('build', ['stylus', 'uglify','imagemin', 'inline']);
    grunt.registerTask('dev', ['express:dev', 'browserSync', 'watch']);
};
