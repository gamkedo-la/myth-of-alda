/* global Phaser */
import Boot from './src/scenes/Boot.js'
import Credits from './src/scenes/Credits.js'
import GameScene from './src/scenes/Game.js'
import GameComplete from './src/scenes/GameComplete.js'
import GameOver from './src/scenes/GameOver.js'
import Options from './src/scenes/Options.js'
import Preloader from './src/scenes/Preloader.js'
import Title from './src/scenes/Title.js'
import UserInterface from './src/scenes/UIScene.js'

const scenes = [
  Boot,
  Credits,
  GameScene,
  GameComplete,
  GameOver,
  Options,
  Preloader,
  Title,
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
  pixelArt: true,
  parent: 'game',
  dom: {
    createContainer: true
  }
})

export default Game
