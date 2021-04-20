const gulp = require('gulp')
const eslint = require('gulp-eslint')
const friendlyFormatter = require('eslint-friendly-formatter')
const nodemon = require('gulp-nodemon')
const { createDocs } = require('./doc')

function lint (aims) {
  return gulp.src(aims)
    .pipe(eslint({ configFile: './.eslintrc.js' }))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.results(results => {
      console.log(`- [Results]:${results.length}  [Warnings]:${results.warningCount}  [Errors]:${results.errorCount}`)
      console.log('Finished eslint')
    }))
}
var through = require('through2')
var gutil = require('gulp-util')
var PluginError = gutil.PluginError

// 常量
const PLUGIN_NAME = 'gulp-prefixer'

function prefixStream (prefixText) {
  var stream = through()
  console.log(stream)
  stream.write(prefixText)
  return stream
}

// 插件级别函数 (处理文件)
function gulpPrefixer (prefixText) {
  if (!prefixText) {
    throw new PluginError(PLUGIN_NAME, 'Missing prefix text!')
  }

  prefixText = new Buffer(prefixText) // 预先分配

  // 创建一个让每个文件通过的 stream 通道
  var stream = through.obj(function (file, enc, cb) {
    if (file.isBuffer()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'))
      return cb()
    }

    if (file.isStream()) {
      // 定义转换内容的 streamer
      var streamer = prefixStream(prefixText)
      // 从 streamer 中捕获错误，并发出一个 gulp的错误
      streamer.on('error', this.emit.bind(this, 'error'))
      // 开始转换
      file.contents = file.contents.pipe(streamer)
    }

    // 确保文件进去下一个插件
    this.push(file)
    // 告诉 stream 转换工作完成
    cb()
  })

  // 返回文件 stream
  return stream
}

function toJson (string) {
  const object = {}
  // 序列化成行
  const lines = string.replace(/^\s*?\/\*\*\s*|\s*\*\/$/g, '').split(/\r\n|\r|\n/g)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/^\s*?\*/g, '').trim()
    console.log(line)
  }
}

function packdoc () {
  return through.obj(function (file, encoding, callback) {
    console.log(file.cwd)
    console.log(file.dirname)
    console.log(file.base)
    console.log(file.path)
    const matchs = file.contents.toString('utf-8').match(/\/\*\*[\s\S]*?\*\//g)
    if (matchs) {
      const docs = matchs.map(data => toJson(data))
      console.log(docs)
    }
    // file.contents = new Buffer(JSON.stringify(data));
    // this.push(file);
    callback()
  })
}

function docs (aims) {
  return gulp.src(aims).pipe(packdoc())
}

gulp.task('ESlint', () => {
  return lint(['src/*.js'])
})

gulp.task('docs', () => {
  return docs(['src/*.js'])
})

gulp.task('nodemon', () => {
  return nodemon({
    script: './main.js',
    execMap: {
      js: 'node'
    },
    tasks: (aims) => {
      lint(aims)
      docs(aims)
      return []
    },
    verbose: true,
    env: {
      NODE_ENV: 'development'
    },
    watch: ['config', 'src'],
    ext: 'js json'
  })
    .on('restart', function () {
      // console.log('Application has restarted!')
    })
    .on('crash', function () {
      console.error('Application has crashed!\n')
      // stream.emit('restart', 20)  // restart the server in 20 seconds
    })
})

gulp.task('default', gulp.series('ESlint', 'docs', 'nodemon'))
