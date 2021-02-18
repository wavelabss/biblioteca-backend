import { SetupServer } from './server'

enum ExitStatus {
  Failure = 1,
  Success = 0
}

try {
  const server = new SetupServer(3333)

  server.init()
  server.start()
} catch (error) {
  console.error(`App exited with error: ${error}`)
  process.exit(ExitStatus.Failure)
}
