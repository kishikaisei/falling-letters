class GameOver extends Phaser.Scene {
  constructor () {
    super({ key: 'gameOver' })
    this.score = 0 
  }

  init (data) {
    // Initialise the passed data
    console.log('Starting gameOver scene')
    this.score = data.score
  }

  preload () {
  }

  create () {
    //delete previous scene and add the score
    this.scene.remove('gameScene')
    this.add.text(
      this.cameras.main.centerX, 
      this.cameras.main.centerY, 
      this.score, 
      { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' }
    );
  }

  update () {
  }

  end () {
  }
}

export default GameOver

