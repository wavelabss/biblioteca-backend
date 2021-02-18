import express, { Application } from 'express'
import './module-alias'
import logger from './logger'

export class SetupServer {
  private app: Application

  constructor(
    private port: number = 3333
  ) {
    this.app = express()
  }

  public init(): void {
    this.setupExpress()
  }

  public start(): void {
    this.app.listen(this.port, () => logger.info(`Server listening on port: ${this.port}`))
  }

  private setupExpress(): void {
    this.app.use(express.json())
  }
}
