const gulp = require("gulp");
const sharpResponsive = require("gulp-sharp-responsive");

const compress = () =>
  gulp.src("assets/images/*.gif")
  .pipe(
    sharpResponsive({
      formats: [
        // avif
        {  format: "webp", sharp: {  animated: true }, rename: { suffix: "-md" }},
        {  format: "webp", sharp: { animated: true }, rename: { suffix: "-large" }},
      ],
    })
  )
  .pipe(gulp.dest("src/assets/images/"));

  gulp.src("assets/images/*.{png,jpg}")
    .pipe(
      sharpResponsive({
        formats: [
          // avif
          { width: 512, format: "avif", rename: { suffix: "-md" } },
          { width: 2048, format: "avif", rename: { suffix: "-large" } },
        ],
      })
    )
    .pipe(gulp.dest("src/assets/images"));

    gulp.src("assets/logo/*.{png,jpg}")
    .pipe(
      sharpResponsive({
        formats: [
          // avif
          { format: "avif" },
        ],
      })
    )
    .pipe(gulp.dest("src/assets/logo"));


module.exports = {
  compress
};

