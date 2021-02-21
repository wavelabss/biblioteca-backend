import express, { Application } from 'express'
import './module-alias'
import logger from './logger'
import routes from './routes'

import * as db from './database'

export class SetupServer {
  private app: Application
  constructor (private port: number) {
    this.app = express()
  }

  public async init(): Promise<void> {
    this.setupExpress()
    await this.setupDatabase()
  }

  public start(): void {
    this.app.listen(this.port, () => logger.info(`Server listening on port ${this.port}`))
  }

  public async close(): Promise<void> {
    await db.close()
  }

  private setupExpress(): void {
    this.app.use(express.json())
    this.app.use(routes)
  }

  private async setupDatabase(): Promise<void> {
    await db.connect()
  }
}
