/* global Phaser */
import { GameScene as Game } from '../globals/SceneKeys.js'
import UIAttributes from '../globals/UIAttributes.js'
import InputManager from '../managers/inputManager.js'

class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: Game })

    this.display = null
    this.playerInput = null
    this.inputManager = null
  }

  preload () {
  }

  create () {
    this.display = createTextDisplay(this)
    this.playerInput = buildPlayerInput(this)
    this.inputManager = new InputManager(this)
    //  Need to retrieve the initial text (description) for the current room and append it to the display
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
    overflowY: 'hidden',
    padding: '10px',
    position: 'relative'
  })

  // Method to append new text at the bottom
  element.appendText = function (newText) {
    const newElement = document.createElement('div')
    newElement.style.position = 'absolute'
    newElement.style.bottom = '0'
    newElement.innerHTML = newText
    this.node.appendChild(newElement)
  
    // Get the height of the new element
    const newElementHeight = newElement.offsetHeight
  
    // Adjust the position of all previously appended elements
    const children = this.node.children
    for (let i = 0; i < children.length - 1; i++) {
      const child = children[i]
      const currentBottom = parseInt(child.style.bottom, 10) || 0
      child.style.bottom = `${currentBottom + newElementHeight}px`
    }
  }

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
    const inputText = element.node.value
    if (inputText.trim() !== '') {
      // Do something with the player input (compromise.js...)
      scene.display.appendText(inputText)
      element.node.value = '' // Clear the input field
    }
  })

  return element
}

export default GameScene