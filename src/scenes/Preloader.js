/* global Phaser */
import { Preloader, Boot } from '../globals/SceneKeys.js'
import { FontFamilies, StyleConfigs } from '../globals/FontKeys.js'
import GameManager from '../managers/gameManager.js'

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

  preload () {
    // Load all assets here
    // this.load.image('example', 'path/to/your/asset.png')

    // Load the webfont loading script. This is needed to load custom fonts.
    this.load.script('webfont', '../../public/fonts/webfont_loader.js')

    // Emit progress events
    this.load.on(Phaser.Loader.Events.PROGRESS, value => {
      this.scene.get(Boot).assetLoaded(value)
    })
  }

  create () {
    this.game.gameManager = new GameManager(this.game)

    // Load our custom web fonts, then start the main scene
    window.WebFont.load({
      custom: {
        families: [FontFamilies.MedievalSharpRegular, FontFamilies.TangerineRegular, FontFamilies.TangerineBold]
      },
      active: () => {
        // Start the main scene or any other scene after preloading is complete
        // this.scene.start(Title)
        this.scene.get(Boot).loadingComplete()
      },
      inactive: () => {
        console.error('Font failed to load')
      }
    })
  }
}

export default PreloaderScene