/* global Phaser */
import { Preloader, Boot, Title } from '../globals/SceneKeys.js'

class PreloaderScene extends Phaser.Scene {
  constructor () {
    super({ key: Preloader })
  }

  preload () {
    // Load all assets here
    this.load.image('example', 'path/to/your/asset.png')

    // Emit progress events
    this.load.on('progress', (value) => {
      this.scene.get(Boot).events.emit('progress', value)
    })

    this.load.on('complete', () => {
      this.scene.get(Boot).events.emit('complete')
    })
  }

  create () {
    // Start the main scene or any other scene after preloading is complete
    this.scene.start(Title)
  }
}

export default PreloaderScene