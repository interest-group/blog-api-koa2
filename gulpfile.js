const gulp = require('gulp')
const eslint = require('gulp-eslint')
const friendlyFormatter = require('eslint-friendly-formatter')
const nodemon = require('gulp-nodemon')

function lint (aims) {
  return gulp.src(aims)
    .pipe(eslint({ configFile: './.eslintrc.js' }))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.results(results => {
      console.log(`- [Results]:${results.length}  [Warnings]:${results.warningCount}  [Errors]:${results.errorCount}`)
      console.log('Finished eslint')
    }))
}

gulp.task('ESlint', () => {
  return lint(['src/*.js'])
})

gulp.task('nodemon',  () => {
  return nodemon({
    script: './dev-server.js',
    execMap: {
      js: 'node'
    },
    tasks: (aims) => {
      lint(aims)
      return []
    },
    verbose: true,
    ignore: [
      'dist/*.js',
      '.git',
      'node_modules/**/node_modules',
      'gulpfile.js'
    ],
    env: {
      NODE_ENV: 'development'
    },
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

gulp.task('default', gulp.series('ESlint', 'nodemon'))
