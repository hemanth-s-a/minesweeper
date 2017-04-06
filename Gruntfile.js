var webpack = require("webpack");

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: "./client",
                    src: ["**/*.html", "**/*.css"],
                    dest: "./dist/client"
                }]
            }
        },
        babel: {
            options: {
                presets: ["es2015", "react"]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: "./client",
                    src: ["**/*.js"],
                    dest: "./dist/client",
                    ext: ".js"
                }, {
                    expand: true,
                    cwd: "./server",
                    src: ["**/*.js"],
                    dest: "./dist/server",
                    ext: ".js"
                }, {
                    expand: true,
                    cwd: "./client",
                    src: ["**/*.jsx"],
                    dest: "./dist/client",
                    ext: ".jsx"
                }]
            }
        },
        watch: {
            copy: {
                files: [
                    "client/**/*.html",
                    "client/styles/**/*.css"
                ],
                tasks: ["copy"]
            },
            babel: {
                files: [
                    "client/**/*.js",
                    "client/**/*.jsx",
                    "server/**/*.js"
                ],
                tasks: ["babel"]
            },
            webpack: {
                files: [
                    "dist/client/bundle.js",
                    "dist/client/**/*.js",
                    "dist/client/**/*.jsx"
                ],
                tasks: ["webpack"]
            }
        },
        webpack: {
            options: {
                entry: "./dist/client/main.js",
                output: {
                    path: __dirname + "/dist/client/",
                    filename: "bundle.js"
                },
                plugins: [
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    })
                ]
            },
            prod: {},
            dev: {
                devtool: "eval-source-map"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-webpack");

    grunt.registerTask("default", [
        "copy", "babel", "webpack:prod"
    ]);

    grunt.registerTask("dev", [
        "copy", "babel", "webpack:dev", "watch"
    ]);
};
