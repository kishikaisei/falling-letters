import TitleScene from './titleScene.js'
import GameScene from './gameScene.js'
import GameOver from './gameOver.js'

// Our scenes
const titleScene = new TitleScene()
const gameScene = new GameScene()
const gameOver = new GameOver()

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
}
const game = new Phaser.Game(config)

// load scenes
game.scene.add('titleScene', titleScene)
game.scene.add('gameScene', gameScene)
game.scene.add('gameOver', gameOver)

// start title
game.scene.start('titleScene')

