const path = require( 'path' );
const febs = require( 'febs' );
const gulp = require( 'gulp' );

const outPath = path.join( febs.config.paths.OUT_ROOT, __dirname );

febs.addTask.common( __dirname, outPath );

gulp.task( 'watch', ( ) => {
    gulp.watch( ['../../components/**/*.*'], ['watchJs', 'watchLess'] );
} );

gulp.task( 'watchJs', ['compile-js', 'jshint'], ( ) => {
    gulp.watch( ['../../components/**/*.js'], ['compile-js','jshint'] );
} );

gulp.task( 'watchLess', ['compile-less'], ( ) => {
    gulp.watch( ['../../components/**/*.less'], ['compile-less'] );
} );

gulp.task( 'default', [
   febs.addTask.compileJs( __dirname, outPath, {
        es6: true
    } ),
    febs.addTask.compileLess( __dirname, outPath ),
    'jshint'
] );