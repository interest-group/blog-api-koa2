const gulp = require('gulp')
const eslint = require('gulp-eslint')
const filter = require('gulp-filter')
const friendlyFormatter = require('eslint-friendly-formatter')
const nodemon = require('gulp-nodemon')
const { toApiJson } = require('./docs')

function lint (aims) {
  return gulp.src(aims)
    .pipe(eslint({ configFile: './.eslintrc.js' }))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.results(results => {
      console.log(`- [Results]:${results.length}  [Warnings]:${results.warningCount}  [Errors]:${results.errorCount}`)
      console.log('Finished eslint')
    }))
}

function docs (aims) {
  return gulp.src(aims).pipe(toApiJson()).pipe(filter('*.json')).pipe(gulp.dest('ddoc'))
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
