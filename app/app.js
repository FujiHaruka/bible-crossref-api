const koa = require('koa')
const logger = require('koa-logger')
const route = require('koa-route')
const controller = require('./helper/controller')
const { URL_PREFIX } = require('../env')
let app = module.exports = koa()

app.use(route.get(URL_PREFIX + '/:book/:chapter/:verse', controller.fetchRef))

if (!module.parent) {
  app.use(logger())
  app.listen(3000)
}
