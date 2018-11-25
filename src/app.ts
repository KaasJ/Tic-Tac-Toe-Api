import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
import GameController from './games/controller'


export default createKoaServer({
  controllers: [
    GameController
  ],
})
