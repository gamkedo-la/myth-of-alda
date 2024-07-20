/* global Phaser */
import { Preloader, Boot } from '../globals/SceneKeys.js'
import { FontFamilies, StyleConfigs } from '../globals/FontKeys.js'
import GameManager from '../managers/gameManager.js'
import ImageKeys from '../globals/ImageKeys.js'
import AudioKeys from '../globals/AudioKeys.js'

class PreloaderScene extends Phaser.Scene {
  constructor () {
    super({ key: Preloader })
  }

  init () {
    this.visible = false
    for (const config of StyleConfigs) {
      const element = document.createElement('style')
      document.head.appendChild(element)
      const sheet = element.sheet  
      const styles = config
      sheet.insertRule(styles, 0)
    }
  }

  preload () { // Load all assets here
    // Load images
    for (const imageKey of Object.keys(ImageKeys)) {
      this.load.image(imageKey, ImageKeys[imageKey])
    }

    // Load audio
    for (const audioKey of Object.keys(AudioKeys)) {
      this.load.audio(audioKey, AudioKeys[audioKey])
    }

    // Load the webfont loading script. This is needed to load custom fonts.
    this.load.script('webfont', '../../public/fonts/webfont_loader.js')

    // Emit progress events
    this.load.on(Phaser.Loader.Events.PROGRESS, value => {
      // Notify the Boot Scene of the progress so it can update the loading progress bar
      this.scene.get(Boot).assetLoaded(value)
    })
  }

  create () {
    this.game.gameManager = new GameManager(this.game)

    // Load our custom web fonts last so we can start the title scene when they are finished loading
    window.WebFont.load({
      custom: {
        families: [FontFamilies.MedievalSharpRegular, FontFamilies.TangerineRegular, FontFamilies.TangerineBold]
      },
      active: () => {
        // Assuming loading the fonts is the last thing we need to do before starting the title scene
        this.scene.get(Boot).loadingComplete()
      },
      inactive: () => {
        console.error('Font failed to load')
      }
    })
  }
}

export default PreloaderScene