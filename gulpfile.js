const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const clean = require("gulp-dest-clean");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");

function clear() {
  return gulp.src("./").pipe(clean("./dist"));
}

function js() {
  return gulp.src("js/*.js").pipe(uglify()).pipe(gulp.dest("./dist/js"));
}

function css() {
  return gulp
    .src("style/*.css")
    .pipe(
      cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      })
    )
    .pipe(gulp.dest("./dist/css/"));
}

function image() {
  return gulp.src("./").pipe(imagemin()).pipe(gulp.dest("./dist"));
}

function run() {
  return gulp
    .src("./*.ejs")
    .pipe(
      ejs({
        title: "Hello Gulp!",
        path: "./abc/123",
      })
    )
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("./dist"));
}

exports.default = gulp.series(clear, image, js, css, run);
