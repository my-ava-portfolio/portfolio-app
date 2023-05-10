const gulp = require("gulp");
const sharpResponsive = require("gulp-sharp-responsive");

const compress = () =>
  gulp.src("assets/images/*.gif")
  .pipe(
    sharpResponsive({
      formats: [
        // avif
        {  format: "webp", sharp: {  animated: true }, rename: { prefix: "md-" }},
        {  format: "webp", sharp: { animated: true } },
      ],
    })
  )
  .pipe(gulp.dest("src/assets/images/"));

  gulp.src("assets/images/*.{png,jpg}")
    .pipe(
      sharpResponsive({
        formats: [
          // avif
          { width: 512, format: "avif", rename: { prefix: "md-" } },
          { format: "avif" },
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

    gulp.src("assets/images/*.svg")
    .pipe(gulp.dest("src/assets/images/"));

    gulp.src("assets/tech/*.{png,jpg}")
    .pipe(
      sharpResponsive({
        formats: [
          // avif
          { width: 512, format: "avif" },
        ],
      })
    )
    .pipe(gulp.dest("src/assets/tech"));

module.exports = {
  compress
};

