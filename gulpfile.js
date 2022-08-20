const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const clean = require("gulp-dest-clean");

function clear() {
  return gulp.src("./")
            .pipe(clean("./dist"));
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

exports.default = gulp.series(clear, run);
