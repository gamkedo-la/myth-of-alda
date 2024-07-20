/* global Phaser */
import { Title, GameScene } from '../globals/SceneKeys.js'
import UIAttributes from '../globals/UIAttributes.js'
import FontLabel from '../uiComponents/FontLabel.js'

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: Title })
  }

  preload () {
  }

  create () {
    this.text = new FontLabel(this, {
      x: this.game.canvas.width / 2,
      y: this.game.canvas.height / 2 - 32,
      title: 'Myth of Alda',
      fontFamily: UIAttributes.UIFontFamily,
      fontSize: UIAttributes.TitleFontSize,
      color: UIAttributes.UIColor,
      align: UIAttributes.CenterAlign,
      vertAlign: UIAttributes.MiddleAlign
    })

    const element = this.add.dom((this.game.canvas.width / 2), this.game.canvas.height - 50, 'input', {
      type: 'text',
      backgroundColor: UIAttributes.UIColor,
      borderRadius: '25px',
      font: UIAttributes.UIFontSize + ' ' + UIAttributes.UIFontFamily,
      textAlign: UIAttributes.LeftAlign,
      width: `${this.game.canvas.width - 40}px`,
      lineHeight: `${2 * UIAttributes.getFontSizeNumber(UIAttributes.UIFontSize)}px`,
      paddingLeft: '15px'
    })
    element.node.placeholder = '"Wake up" to start'
    // Create a keyboard object for the Enter key
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    // Add event listener for Enter key detection
    this.enterKey.on('down', () => {
      if (element.node.value === 'Wake up') {
        this.scene.start(GameScene)
      } else {
        element.node.value = ''
      }
    })
  }
}

export default TitleScene