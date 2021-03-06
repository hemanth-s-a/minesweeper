var webpack = require("webpack");
var webpackCompression = require("compression-webpack-plugin")

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
                    dest: "./dist/pre-webpack/client",
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
                    dest: "./dist/pre-webpack/client",
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
                    "dist/pre-webpack/client/**/*.js",
                    "dist/pre-webpack/client/**/*.jsx"
                ],
                tasks: ["webpack:dev"]
            }
        },
        webpack: {
            options: {
                entry: "./dist/pre-webpack/client/main.js",
                output: {
                    path: __dirname + "/dist/client/",
                    filename: "bundle.js"
                }
            },
            prod: {
                plugins: [
                    new webpack.DefinePlugin({
                        "process.env": {
                            NODE_ENV: JSON.stringify("production")
                        }
                    }),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),
                    new webpackCompression({
                        test: /\.js$/,
                        minRatio: 0.8
                    })
                ]
            },
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
