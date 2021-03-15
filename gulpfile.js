const pref = "toys4";
const { src, dest, parallel, series, watch } = require("gulp");
const del = require("del");
const jimp = require("gulp-jimp-wrapper");
// for more features see - https://www.npmjs.com/package/jimp
const rename = require("gulp-rename");
<<<<<<< HEAD
const concat = require("gulp-concat");

function articles() {
  return src(["article/header.txt", "article/main.txt", "article/footer.txt"])
    .pipe(concat("ready-article.txt"))
    .pipe(dest("article/"));
}

=======
>>>>>>> 36d12c50c5b78cd3d96553b30e3253d17983ba30
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
<<<<<<< HEAD
exports.articles = articles;
exports.images = series(cleandest, images, articles);
exports.cleandest = cleandest;
exports.default = series(cleandest, images, articles);
=======
exports.images = parallel(cleandest, images);
exports.cleandest = cleandest;
exports.default = parallel(cleandest, images);
>>>>>>> 36d12c50c5b78cd3d96553b30e3253d17983ba30
