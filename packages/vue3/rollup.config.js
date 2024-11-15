import { baseConfig } from '@isle-editor/shared'
import pkg from './package.json' assert { type: 'json' }


export default baseConfig({ input: 'src/index.js', pkg })
