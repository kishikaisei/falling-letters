class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'titleScene' })

    this.startButton = null
  }

  init () {
    console.log('Starting menu scene')
  }

  preload () {
    this.load.image('start', 'assets/start.png')
  }

  create () {
    const startButton = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'start').setInteractive()
    startButton.on('pointerdown', () => this.clickButton())
  }

  update () {
  }

  end () {
  }

  clickButton () {
    console.log('Moving to game scene')
    this.scene.switch('gameScene')
  }
}

export default TitleScene

