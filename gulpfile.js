const pref = "toys4";
const { src, dest, parallel, series, watch } = require("gulp");
const del = require("del");
const jimp = require("gulp-jimp-wrapper");
// for more features see - https://www.npmjs.com/package/jimp
const rename = require("gulp-rename");
const concat = require("gulp-concat");

function articles() {
  return src(["article/header.txt", "article/main.txt", "article/footer.txt"])
    .pipe(concat("article.out.txt"))
    .pipe(dest("article/"));
}

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
exports.articles = articles;
exports.images = series(cleandest, images, articles);
exports.cleandest = cleandest;
exports.default = series(cleandest, images, articles);
exports.images = parallel(cleandest, images);
exports.cleandest = cleandest;
exports.default = parallel(cleandest, images);