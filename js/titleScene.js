class TitleScene extends Phaser.Scene {
  constructor () {
    // Give the title scene a name a initialise the global variables
    super({ key: 'titleScene' })
    this.startButton = null
  }

  init () {
    console.log('Starting menu scene')
  }

  preload () {
    //Load assets
    this.load.image('start', 'assets/start.png')
  }

  create () {
    // Create a button and set the interaction funtion
    const startButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'start').setInteractive()
    startButton.on('pointerdown', () => this.clickButton())
  }

  update () {
  }

  end () {
  }

  // Button press logic
  clickButton () {
    console.log('Moving to game scene')
    this.scene.switch('gameScene')
  }
}

export default TitleScene

