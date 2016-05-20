const babel = require("gulp-babel");
const concat = require("gulp-concat");
const gulp = require("gulp");
const rimraf = require("gulp-rimraf");
const runSequence = require("run-sequence");
const uglify = require("gulp-uglify");

const SRC_PATH = "./src";
const DEST_PATH = "./public";
const ASSETS_PATH = `${DEST_PATH}/assets`;

gulp.task("default", [ "build" ]);

gulp.task("clean", () => {
    return gulp.src(DEST_PATH)
               .pipe(rimraf());
});

gulp.task("build", [ "clean" ], (cb) => {
    runSequence(
        "build-vendor",
        "build-js",
        "build-html",
        cb
    );
});

gulp.task("build-vendor", () => {
    return gulp.src([
        "./node_modules/jquery/dist/jquery.js",
        "./node_modules/jquery.transit/jquery.transit.js"
    ]).pipe(uglify())
      .pipe(concat("vendor.js"))
      .pipe(gulp.dest(ASSETS_PATH));
});

gulp.task("build-js", () => {
    return gulp.src(`${SRC_PATH}/**/*.js`)
               .pipe(babel({
                   sourceRoot : SRC_PATH,
                   presets : [
                       "es2015"
                   ]
               }))
               .pipe(uglify())
               .pipe(gulp.dest(ASSETS_PATH));
});

gulp.task("build-html", () => {
    return gulp.src(`${SRC_PATH}/index.html`)
               .pipe(gulp.dest(DEST_PATH));
});
