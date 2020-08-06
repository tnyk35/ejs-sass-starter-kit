const gulp = require("gulp")
const sass = require("gulp-sass")
const autoprefixer = require("gulp-autoprefixer")
const ejs = require("gulp-ejs")
const rename = require("gulp-rename")
const packageImporter = require("node-sass-package-importer")
const browserSync = require('browser-sync').create()

// Watch
gulp.task( "default", function () {
    browserSync.init({
        server: './dist',
    });

    gulp.watch( "sass/**/*.scss", gulp.series( "sass" ) ); // sassディレクトリ以下の.scssファイルの更新を監視
    gulp.watch('dist/css/style.css').on('change', browserSync.reload);
    gulp.watch( "ejs/**/*.ejs", gulp.series( "ejs" ) ); // ejsディレクトリ以下の.ejsファイルの更新を監視
    gulp.watch("dist/**/*.html").on('change', browserSync.reload);
});

// Sass
gulp.task( "sass", function () {
    return gulp.src( ["sass/**/*.scss", "!sass/**/_*.scss"] )
        .pipe( sass({
            importer: packageImporter({
                extensions: ['.scss', '.css']
            }),
            outputStyle: 'expanded',
        }).on( 'error', sass.logError ) )
        .pipe( autoprefixer( {
            cascade: false,
        }))
        .pipe( gulp.dest( './dist/css' ));
});

// EJS
gulp.task( "ejs", function () {
    return gulp.src(["ejs/**/*.ejs", "!ejs/**/_*.ejs"])
        .pipe(ejs({}))
        .pipe(rename({ extname: '.html' }))
        .pipe( gulp.dest( "./dist" ) );
});

// Babel