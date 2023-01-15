class GameScene extends Phaser.Scene {
  constructor (){
    super({key: 'gameScene'})
    this.timer = null
    this.timedEvent = null
    this.score = 0
    this.currentFallingLetters = new Map()
    this.letters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  }

  init () {
    console.log('Starting game scene')
  }

  preload ()
  {
    // Loop through the letters and preload the assets for both regular and the rare golden assets
    for (let i = 0; i < this.letters.length; i++) {
      var currentLetter = this.letters[i];
      this.load.image(currentLetter+"regular" , 'assets/regular/'.concat(currentLetter,'.png'));
      this.load.image(currentLetter+"rare" , 'assets/rare/'.concat(currentLetter,'.png'));
    } 
  }

  create ()
  {
    // Prepare the timer
    this.timer = this.time.delayedCall(21000);
    this.timedEvent = this.time.addEvent({ delay: 500, callback: this.onEvent, callbackScope: this, loop: true });

    // Add physics to the items added to the fallingLetter pool to make them fall
    this.fallingLetter = this.physics.add.group()
    // Initialise a Map with all the letters as index, and an empty array as value
    for (var i = 0; i < this.letters.length; i++){
      this.currentFallingLetters.set(this.letters[i], [])
    };
    // Setup the logic for the pressing the key and destroying the letter and adding to the score depending on its value
    // since the letter assets are named "letter"+"rarirty", we splice the word to get the letter and rarity out,
    // and then add to the score and destroy the letter
    this.input.keyboard.on('keydown', event => {
      var foundFirstInstance = false
      this.fallingLetter.children.each( letter => {
        var letterKey = letter.texture.key.slice(0,1)
        var letterValue = letter.texture.key.slice(1)
        if (letterKey == event.key && !foundFirstInstance){
          var valueToAdd = (letterValue == "regular") ? 1 : 2;
          this.score += valueToAdd
          letter.destroy()
          foundFirstInstance = true
        }
      })
    });
  }

  updateCounter() {
    total++;
  }

  update() {
    // Every frame check if the time has elapsed, if so jump to the next scene while passing the score
    if (this.timer.getElapsedSeconds() >= 20){
      this.timer.remove()
      console.log(this.score)
      this.scene.start('gameOver', {score: this.score})
    }
    // Destroy and remove the Map the letters that go off screen
    this.fallingLetter.children.each(item => {
      if (item.y>800){
        var letterKey = item.texture.key.slice(0,1)
        var letterValue = item.texture.key.slice(1)
        var keyValue = this.currentFallingLetters.get(letterKey)
        var firstFound = keyValue.find(element => element == letterValue);
        keyValue = keyValue.splice(firstFound, 1);
        this.currentFallingLetters.set(String(letterKey), keyValue)
        item.destroy()
      }
    })

  }

  onEvent(){
    // Letter Generator and randomiser
    var createdLetter = this.letters[Math.floor(Math.random() * this.letters.length)]
    var isRare = (Math.floor(Math.random()*10) == 1) ? "rare" : "regular"
    // 580 and the 10 is to make sure that the letters only appeare betweeen x = 10 and 590
    const newLetter = this.physics.add.sprite(
      Math.floor(Math.random() * 580) + 10,
      0, 
      createdLetter+isRare
    )
    this.fallingLetter.add(newLetter)

    var arrayValue = this.currentFallingLetters.get(createdLetter)
    arrayValue = arrayValue.push(isRare)
  }
}

export default GameScene


