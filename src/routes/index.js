import api from './api'
import platform from './platform'

export default function (app) {
  app.use(api.routes())
  app.use(platform.routes())
  app.use(api.allowedMethods())
}
