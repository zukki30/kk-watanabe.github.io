const fs = require("fs");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const browserSync = require("browser-sync");
const del = require("del");

//baseディレクトリの指定
const Base = {
  Src: "src",
  Dest: "docs"
};

//assetsディレクトリの指定
const Assets = {
  Src: Base.Src + "/assets/",
  Dest: Base.Dest + "/assets/"
};

//pashの指定
const PathSetting = {
  Base: {
    Src: Base.Src,
    Dest: Base.Dest
  },
  Sass: {
    Src: Assets.Src + "sass/**/*.s+(a|c)ss",
    Dest: Assets.Dest + "css/"
  },
  Script: {
    Src: Assets.Src + "js/",
    Dest: Assets.Dest + "js/"
  },
  Image: {
    Src: Assets.Src + "img/**/*.+(jpg|jpeg|png|gif|svg)",
    Dest: Assets.Dest + "img/"
  },
  Include: {
    Src: Assets.Src + "inc/**/**.ejs"
  },
  Json: {
    Src: Assets.Src + "json/*.json"
  },
  Svg: {
    Src: Assets.Src + "svg/*.svg"
  },
  Html: {
    Src: [Base.Src + "/ejs/**/*.ejs", "!" + Assets.Src + "inc/**/_*.ejs"],
    Dest: Base.Dest
  },
  MetaData: Base.Src + "/meta_data.json"
};

// meta
const meta = JSON.parse(fs.readFileSync(PathSetting.MetaData));

// image setting
const imageminOptions = [
  $.imagemin.jpegtran({ progressive: true }),
  $.imagemin.optipng({ optimizationLevel: 5 }),
  $.imagemin.svgo({
    plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
  })
];

function getFolderPass(data) {
  const pathTxt = "../";

  let addPath = "";

  for (var i = 0; i < data.length; i++) {
    addPath = addPath + pathTxt;
  }

  return addPath;
}

// browser sync
gulp.task("browser-sync", () => {
  return browserSync.init({
    server: {
      baseDir: Base.Dest
    },
    port: 4000,
    reloadOnRestart: true
  });
});

// reload
gulp.task("reload", done => {
  browserSync.reload();
  done();
});

// EJS
gulp.task("ejs", () => {
  return gulp
    .src(PathSetting.Html.Src)
    .pipe(
      $.data(file => {
        //フォルダのパスを取得し整形
        const all_path = file.path.split("\\").join("/");
        const all_paths = all_path.split("/ejs/");
        const path_data = all_paths[1].replace(".ejs", "").split("/");
        const path_url = all_paths[1].replace(".ejs", ".html");

        return {
          fileUrl: "/" + path_url,
          fileName: path_data,
          folderPath: getFolderPass(path_data)
        };
      })
    )
    .pipe($.ejs({ meta }, { rmWhitespace: true }, { ext: ".html" }))
    .pipe($.rename({ extname: ".html" }))
    .pipe(gulp.dest(PathSetting.Html.Dest));
});

// SASS
gulp.task("sass", () => {
  return gulp
    .src(PathSetting.Sass.Src, { sourcemaps: true })
    .pipe($.plumber({ errorHandler: $.notify.onError("<%= error.message %>") }))
    .pipe($.sass({ outputStyle: "compressed" }))
    .pipe(
      gulp.dest(PathSetting.Sass.Dest),
      { sourcemaps: "./maps" }
    )
    .pipe(
      $.postcss([
        require("autoprefixer")({
          grid: true,
          cascade: false
        }),
        require("css-mqpacker"),
        require("cssnano")({ autoprefixer: false })
      ])
    )
    .pipe(
      gulp.dest(PathSetting.Sass.Dest),
      { sourcemaps: "./maps" }
    )
    .pipe(browserSync.stream());
});

// SVG
gulp.task("svg", () => {
  return gulp
    .src(PathSetting.Svg.Src)
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      })
    )
    .pipe(
      $.svgmin(file => {
        const prefix = $.path.basename(
          file.relative,
          $.path.extname(file.relative)
        );

        const option = [
          {
            cleanupIDs: {
              prefix: prefix + "-",
              minify: true
            }
          }
        ];

        return { plugins: option };
      })
    )
    .pipe($.svgstore({ inlineSvg: true }))

    .pipe(
      $.cheerio({
        run: $ => {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("style").remove();
          $("title").remove();
          $("svg").attr("style", "display:none");
        },
        parserOptions: { xmlMode: true }
      })
    )
    .pipe(gulp.dest(PathSetting.Image.Dest));
});

// copy images
gulp.task("copy-images", done => {
  gulp
    .src(PathSetting.Image.Src)
    .pipe($.imagemin(imageminOptions))
    .pipe(gulp.dest(PathSetting.Image.Dest));
  done();
});

// copy js
gulp.task("copy-js", done => {
  gulp.src(PathSetting.Script.Src).pipe(gulp.dest(PathSetting.Script.Dest));
  done();
});

// clean
gulp.task("clean", done => {
  del(PathSetting.Base.Dest);
  done();
});

// watch
gulp.task("watch", done => {
  gulp.watch(PathSetting.Sass.Dest, gulp.series("sass", "ejs", "reload"));
  gulp.watch(PathSetting.Html.Src, gulp.series("ejs", "reload"));
  done();
});

// scripts tasks
gulp.task("default", gulp.parallel("watch", "browser-sync"));

gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.series(
      "sass",
      gulp.series(
        "ejs",
        gulp.series("svg", gulp.parallel("copy-images", "copy-js"))
      )
    )
  )
);
