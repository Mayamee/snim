const pref = "toys4";
const { src, dest, parallel, series, watch } = require("gulp");
const del = require("del");
const jimp = require("gulp-jimp-wrapper");
// for more features see - https://www.npmjs.com/package/jimp
const rename = require("gulp-rename");
function images() {
  return src("img/src/*.{jpg,png,svg,gif,ico,webp}")
    .pipe(rename({ prefix: pref + "-" }))
    .pipe(
      jimp((image) => image.cover(510, 510).flip(true, false), {
        extname: ".conv.png",
      })
    )
    .pipe(dest("img/dest"));
}
function cleandest() {
  return del("img/dest/**/*", { force: true });
}
exports.images = parallel(cleandest, images);
exports.cleandest = cleandest;
exports.default = parallel(cleandest, images);
