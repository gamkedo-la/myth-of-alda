/* global Phaser */
import { GameScene as Game } from '../globals/SceneKeys.js'
import UIAttributes from '../globals/UIAttributes.js'
import InputManager from '../managers/inputManager.js'
import TextDisplay from '../uiComponents/TextDisplay.js'

class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: Game })

    this.display = null
    this.playerInput = null
    this.inputManager = null
  }

  preload () {
    // load the JSON file containing the foyer room data from ../../public/dungeons/foyer.json
    this.load.json('foyer', '../../public/dungeons/foyer.json')

    // load the JSON files containing the room data for the other rooms associated with the current dungeon
    // this.game.gameManager.currentDungeon.rooms.forEach(room => {
    //   this.load.json(room.name, `../../public/dungeons/${this.game.gameManager.currentDungeon.name}/${room.name}.json`)
    // })
  }

  create () {
    this.display = new TextDisplay(this, (this.game.canvas.width / 2), (this.game.canvas.height / 2 - 40), this.game.canvas.width - 600, 775)
    this.playerInput = buildPlayerInput(this)
    this.inputManager = new InputManager(this)
    // Retrieve the description of the foyer and append it to the display
    const foyerData = this.cache.json.get('foyer')
    if (foyerData?.description) {
      this.display.typeText(foyerData.detailedDescription)
    }
  }
}

function buildPlayerInput (scene) {
  const element = scene.add.dom((scene.game.canvas.width / 2), scene.game.canvas.height - 50, 'input', {
    type: 'text',
    backgroundColor: UIAttributes.UIColor,
    borderRadius: '25px',
    font: UIAttributes.UIFontSize + ' ' + UIAttributes.UIFontFamily,
    textAlign: UIAttributes.LeftAlign,
    width: `${scene.game.canvas.width - 40}px`,
    lineHeight: `${2 * UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize)}px`,
    paddingLeft: '15px'
  })
  element.node.placeholder = 'What now?'
  // Create a keyboard object for the Enter key
  scene.enterKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

  // Add event listener for Enter key detection
  scene.enterKey.on('down', () => {
    const inputText = element.node.value
    if (inputText.trim() !== '') {
      scene.display.appendText(inputText)
      // Input Manager uses compromise to process the input text
      scene.inputManager.processInput(inputText)
      element.node.value = '' // Clear the input field
    }
  })

  return element
}

export default GameScene