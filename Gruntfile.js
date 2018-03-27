/* eslint-disable */
module.exports = grunt => {
  require("load-grunt-tasks")(grunt);
  const jsSrcFiles = ["src/js/**/*.js", "!src/js/authenticated.js"],
    htmlFiles = [
      "src/views/index.html",
      "src/views/about.html",
      "src/views/iframe.html"
    ],
    jsFiles = "src/**/*.js",
    styleFiles = ["dist/lib/**/*.css", "style/**/*.less"],
    pkg = grunt.file.readJSON("package.json"),
    npmTasks = [
      "grunt-contrib-uglify",
      "grunt-contrib-watch",
      "grunt-jscs",
      "grunt-contrib-imagemin",
      "grunt-inline",
      "grunt-browser-sync",
      "grunt-express-server",
      "grunt-githooks",
      "grunt-browserify"
    ];

  grunt.initConfig({
    pkg,
    githooks: {
      all: {
        "pre-push": "test"
      }
    },
    browserify: {
      prod: {
        src: ["src/js/examples/*.js", "src/js/index.js"],
        dest: "dist/src/es6-fiddle.js",
        options: {
          browserifyOptions: { debug: true },
          transform: [["babelify", { presets: ["env"] }]]
        }
      },
      sandbox: {
        src: ["src/js/sandbox/iframe.js"],
        dest: "dist/src/sandbox/iframe.js",
        options: {
          browserifyOptions: { debug: true },
          transform: [["babelify", { presets: ["env"] }]]
        }
      }
    },
    uglify: {
      compile: {
        files: {
          "dist/src/authenticated.js": ["src/js/authenticated.js"]
        }
      }
    },
    less: {
      production: {
        files: {
          "dist/style/es6-fiddle.css": ["dist/lib/**/*.css", "style/main.less"],
          "dist/style/profile.css": ["style/profile.less"],
          "dist/style/blog.css": ["style/blog.less"],
          "dist/style/about.css": ["style/about.less"]
        }
      }
    },
    watch: {
      options: {
        reload: true
      },
      style: {
        files: styleFiles,
        tasks: ["less", "inline"]
      },
      src: {
        files: jsFiles,
        tasks: ["browserify", "uglify", "eslint"]
      },
      html: {
        files: htmlFiles,
        tasks: ["inline"]
      }
    },
    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            src: ["images/*.{png,jpg,gif}"],
            dest: "dist/"
          }
        ]
      }
    },
    inline: {
      index: {
        src: "src/views/index.html",
        dest: "dist/index.html"
      },
      about: {
        src: "src/views/about.html",
        dest: "dist/about.html"
      },
      frame: {
        src: "src/views/iframe.html",
        dest: "dist/iframe.html"
      }
    },
    eslint: {
      options: {
        config: ".eslintrc"
      },
      target: ["src/**/*.js", "Gruntfile.js"]
    },
    lesslint: {
      options: {
        imports: ["style/**/*.less"],
        csslint: {
          "box-sizing": false,
          "adjoining-classes": false,
          "universal-selector": false,
          "font-sizes": false,
          "box-model": false,
          "unique-headings": false
        },
        failOnWarning: false
      },
      target: ["style/main.less"]
    },
    browserSync: {
      bsFiles: {
        src: [jsSrcFiles, styleFiles]
      },
      options: {
        watchTask: true,
        proxy: "http://localhost:3000",
        reloadOnRestart: true
      }
    },
    express: {
      dev: {
        options: {
          script: "server/app.js"
        }
      }
    }
  });

  npmTasks.forEach(task => grunt.loadNpmTasks(task));

  grunt.registerTask("default", ["githooks", "watch"]);
  grunt.registerTask("test", ["lesslint", "eslint"]);
  grunt.registerTask("build", [
    "less",
    "browserify",
    "uglify",
    "imagemin",
    "inline"
  ]);
  grunt.registerTask("dev", ["less", "express:dev", "browserSync", "watch"]);
};
