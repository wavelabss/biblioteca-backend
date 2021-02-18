import path from 'path'
import moduleAlias from 'module-alias'

moduleAlias.addAlias('@src', path.resolve(__dirname))
