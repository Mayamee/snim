const pref = "toys4";
const headerFiles = 4;
const footerFiles = 1;

const { src, dest, parallel, series, watch } = require("gulp");
const del = require("del");
const jimp = require("gulp-jimp-wrapper");
// for more features see - https://www.npmjs.com/package/jimp
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const fs = require("fs");

const choose = {
  header: 0,
  footer: 0,
  rand: function (low, high) {
    return low + Math.floor((high - low + 1) * Math.random());
  },
  init: function () {
    this.header = this.rand(0, headerFiles - 1);
    this.footer = this.rand(0, footerFiles - 1);
  },
};
choose.init();
// const dir = "article/header";
// let index;
// fs.readdir(dir, (err, files) => {
//   index = files.length;
// }); УЧИ ПРОМИСЫ И АСИНХРОННОСТЬ
function articles() {
  return src([
    `article/header/header-${choose.header}.txt`,
    "article/main.txt",
    `article/footer/footer-${choose.footer}.txt`,
  ])
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
exports.default = parallel(cleandest, images, articles);
