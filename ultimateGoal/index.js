import { EPS } from '../EPS/index.js'
const server = new EPS
server.use('ultimateGoal/public')
server.run()