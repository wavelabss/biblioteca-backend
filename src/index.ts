import dotenv from 'dotenv'
import { SetupServer } from './server'
import logger from './logger'

enum ExitStatus {
  Failure = 1,
  Success = 0
}

process.on('unhandledRejection', (reason, promise) => {
  logger.error(
    `App exiting due to an unhandled promise: ${promise} and reason ${reason}`
  )

  throw reason
})

process.on('uncaughtException', (error) => {
  logger.error(`App exiting due to an uncaught exception: ${error}`)
  process.exit(ExitStatus.Failure)
});

(async (): Promise<void> => {
  try {
    dotenv.config()

    const PORT = Number(process.env.PORT ?? 3333)
    const server = new SetupServer(PORT)

    await server.init()
    server.start()

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']

    exitSignals.forEach(signal => {
      process.on(signal, async () => {
        try {
          await server.close()
          logger.info('App exited with success')
          process.exit(ExitStatus.Success)
        } catch (error) {
          logger.info(`App exited with error: ${error}`)
          process.exit(ExitStatus.Failure)
        }
      })
    })
  } catch (error) {
    logger.error(`App exited with error: ${error}`)
    process.exit(ExitStatus.Failure)
  }
})()
