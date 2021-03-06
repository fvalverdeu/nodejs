import Koa from 'koa'
import cors from 'koa2-cors'
import helmet from 'koa-helmet'
import bodyParser from 'koa-bodyparser'
import yenv from 'yenv'
import log from 'fancy-log'

import {
  access as accessLogger,
  error as errorLogger,
} from './utils/api-logger'
import csp from './utils/csp'
import compress from './utils/compress'
import notFavicon from './utils/api-not-favicon'
import apiError from './utils/api-error'
import docs from './utils/api-docs'
import routes from './routes'
import AppGraphqlModule from './graphql'
import { ApolloServer } from 'apollo-server-koa'

const env = yenv()
const PORT = env.PORT

const { schema, context } = AppGraphqlModule
const server = new Koa()
const serverGraphql = new ApolloServer({ schema, context, introspection: true })

const options = {
  origin: '*',
}

server
  .use(accessLogger)
  .use(errorLogger)
  .use(helmet.contentSecurityPolicy(csp))
  .use(compress)
  .use(bodyParser())
  .use(notFavicon)
  .use(apiError)
  .use(docs)
  .use(cors(options))

routes.map(r => {
  server.use(r.routes())
  server.use(r.allowedMethods())
})

serverGraphql.applyMiddleware({ app: server })

/* istanbul ignore if  */
if (env.NODE_ENV !== 'test') {
  server
    .listen(PORT, '0.0.0.0', () =>
      log.info(`Server listening on PORT: ${PORT}`)
    )
    .on('error', log.error)
}

export default server
