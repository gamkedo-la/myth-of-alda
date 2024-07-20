/* global Phaser */
import { Boot, Preloader } from '../globals/SceneKeys.js'

class BootScene extends Phaser.Scene {
  constructor () {
    super ({ key: Boot })
  }

  preload () {
    // Load the minimum assets needed to show a progress bar while the Preloader Scene loads the rest of the assets
  }

  create () {
    // Create the progress bar
    const { width, height } = this.cameras.main
    const progressBarWidth = 400
    const progressBarHeight = 30
    const progressBarX = (width / 2) - (progressBarWidth / 2)
    const progressBarY = (height / 2) - (progressBarHeight / 2)

    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight)

    const progressBar = this.add.graphics()

    // Listen for progress events from the Preloader Scene
    this.load.on('progress', (value) => {
      progressBar.clear()
      progressBar.fillStyle(0x0000ff, 1)
      progressBar.fillRect(progressBarX, progressBarY, progressBarWidth * value, progressBarHeight)
    })

    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
    })

    // Start the Preloader Scene
    this.scene.start(Preloader)
  }
}

export default BootScene