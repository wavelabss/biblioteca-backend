import { SetupServer } from './server'
import logger from './logger'

enum ExitStatus {
  Failure = 1,
  Success = 0
}

try {
  const server = new SetupServer(3333)

  server.init()
  server.start()

  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']

  exitSignals.forEach(signal => {
    process.on(signal, () => {
      logger.info('App exited with success')
      process.exit(ExitStatus.Success)
    })
  })
} catch (error) {
  logger.error(`App exited with error: ${error}`)
  process.exit(ExitStatus.Failure)
}
