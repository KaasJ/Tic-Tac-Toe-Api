import { JsonController, Get, Body, HttpCode, Post, Put, Param, NotFoundError, BadRequestError } from 'routing-controllers'
import Game from './entity'

const colors = ['red', 'blue', 'green', 'yellow', 'magenta']

const defaultBoard = [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
]

@JsonController()
export default class GameController {

    @Get('/games')
    async allPages() {
        const games = await Game.find()
        return { games }
    }

    @Post('/games')
    @HttpCode(201)
    createGame(
        @Body({validate: { skipMissingProperties: true }}) newGame: Game
    ) {
        const randomIndex = Math.floor(Math.random() * colors.length)
        newGame.color = colors[randomIndex]
        newGame.board = defaultBoard
        const game = Game.create(newGame)
        return game.save()
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body({ validate: { skipMissingProperties: true } }) {name, board, color}: Game
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game')
        if (name) game.name = name
        if (color) game.color = color
        if (board) {
            const moves = (board1, board2) =>
                board1
                    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
                    .reduce((a, b) => a.concat(b))
                    .length
            if(moves(game.board, board) > 1) {
                throw new BadRequestError('Multiple moves are not allowed')
            }
            game.board = board
        }
        return game.save()
    }
}



