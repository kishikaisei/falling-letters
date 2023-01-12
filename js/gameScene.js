class GameScene extends Phaser.Scene {
  constructor (){
    super({key: 'gameScene'})
    this.timer = null
    this.timedEvent = null
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
    for (let i = 0; i < this.letters.length; i++) {
      var currentLetter = this.letters[i];
      this.load.image(currentLetter+"regular" , 'assets/regular/'.concat(currentLetter,'.png'));
    } 

    for (let i = 0; i < this.letters.length; i++) {
      var currentLetter = this.letters[i];
      this.load.image(currentLetter+"rare" , 'assets/rare/'.concat(currentLetter,'.png'));
    } 
  }

  create ()
  {
    this.timer = this.time.delayedCall(6000);
    this.fallingLetter = this.physics.add.group()
    this.timedEvent = this.time.addEvent({ delay: 500, callback: this.onEvent, callbackScope: this, loop: true });

    for (var i = 0; i < this.letters.length; i++){
      this.currentFallingLetters.set(this.letters[i], [])
    };
    this.input.keyboard.on('keydown', function (event) {
        console.log(event.key);
    });
  }

  updateCounter() {
    total++;
  }

  update() {
    if (this.timer.getElapsedSeconds() >= 5){
      this.timer.remove()
      this.scene.switch('gameOver')
    }
    this.fallingLetter.children.each(function (item){
      if (item.y>700){
        //var letterKey = item.texture.key.slice(0,1)
        //var letterValue = item.texture.key.slice(1)
        //var keyValue = this.currentFallingLetters.get(letterKey)
        //var firstFound = keyValue.find(element => element == letterValue);
        //keyValue = keyValue.splice(firstFound, 1);
        //this.currentFallingLetters.set(letterKey, keyValue)
        
        item.destroy()
      }
    })
  }

  onEvent(){
    var createdLetter = this.letters[Math.floor(Math.random() * 26)]
    var isRare = "regular"
    if (Math.floor(Math.random()*10) == 1){
      isRare = "rare"
    }
    const newLetter = this.physics.add.sprite(
      Math.floor(Math.random() * 580) + 10,
      0, 
      createdLetter+isRare
    )
    this.fallingLetter.add(newLetter)

    var arrayValue = this.currentFallingLetters.get(createdLetter)
    arrayValue = arrayValue.push(isRare)
    //console.log(this.currentFallingLetters)
  }
}

export default GameScene

