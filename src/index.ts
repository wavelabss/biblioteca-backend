import dotenv from 'dotenv'
import { SetupServer } from './server'
import logger from './logger'

enum ExitStatus {
  Failure = 1,
  Success = 0
}

(async () => {
  try {
    dotenv.config()

    const PORT = Number(process.env.PORT ?? 3333)
    const server = new SetupServer(PORT)

    server.init()
    server.start()

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']

    exitSignals.forEach(signal => {
      process.on(signal, async () => {
        try {
          await server.close()
          logger.info('App exited with success')
          process.exit(ExitStatus.Success)
        } catch (error) {
          logger.info(`App exited with error ${error}`)
          process.exit(ExitStatus.Failure)
        }
      })
    })
  } catch (error) {
    logger.error(`App exited with error: ${error}`)
    process.exit(ExitStatus.Failure)
  }
})()
