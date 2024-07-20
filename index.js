/* global Phaser */
import Boot from './src/scenes/Boot.js'
import Preloader from './src/scenes/Preloader.js'
import Credits from './src/scenes/Credits.js'
import Options from './src/scenes/Options.js'
import GameOver from './src/scenes/GameOver.js'
import GameComplete from './src/scenes/GameComplete.js'
import UserInterface from './src/scenes/UIScene.js'

const scenes = [
  Boot,
  Preloader,
  Credits,
  Options,
  GameOver,
  GameComplete,
  UserInterface
]

const Game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1600,
  height: 900,
  scene: scenes,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  input: {
    keyboard: true
  },
  pixelArt: true
})

export default Game
