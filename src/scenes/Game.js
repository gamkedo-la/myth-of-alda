/* global Phaser */
import { GameScene as Game } from '../globals/SceneKeys.js'
import UIAttributes from '../globals/UIAttributes.js'

class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: Game })

    this.display = null
    this.playerInput = null
  }

  preload () {
  }

  create () {
    this.display = createTextDisplay(this)
    this.playerInput = buildPlayerInput(this)
  }
}

function createTextDisplay (scene) {
  const element = scene.add.dom((scene.game.canvas.width / 2), scene.game.canvas.height / 2 - 40, 'div', {
    backgroundColor: UIAttributes.UIColor,
    borderRadius: '10px',
    font: UIAttributes.UIFontSize + ' ' + UIAttributes.UIFontFamily,
    textAlign: UIAttributes.LeftAlign,
    width: `${scene.game.canvas.width - 600}px`,
    height: '775px',
    overflowY: 'scroll',
    padding: '10px'
  })
  element.node.innerHTML = 'This is a text display area.<br>It can show multiple lines of text.<br>It has a vertical scrollbar.'
  console.log(element.node)

  return element
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
    // Do something with the player input (compromise.js...)
  })

  return element
}

export default GameScene