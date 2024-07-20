/* global Phaser */
import { Boot, Preloader, Title } from '../globals/SceneKeys.js'

class BootScene extends Phaser.Scene {
  constructor () {
    super ({ key: Boot })

    this.loadingText = null

    this.progressBarWidth = 400
    this.progressBarHeight = 30
    this.progressBarX = 0
    this.progressBarY = 0

    this.progressBar = null
    this.progressBox = null
  }

  preload () {
    // Load the minimum assets needed to show a progress bar while the Preloader Scene loads the rest of the assets
  }

  create () {
    // Create the loading text
    this.loadingText = this.add.text(this.game.canvas.width / 2 - 75, this.game.canvas.height / 2 - 50, 'Loading...', { fontSize: '32px', fill: '#fff', align: 'center' })
    // Create the progress bar
    const { width, height } = this.cameras.main
    this.progressBarX = (width / 2) - (this.progressBarWidth / 2)
    this.progressBarY = (height / 2) - (this.progressBarHeight / 2)

    this.progressBox = this.add.graphics()
    this.progressBox.fillStyle(0x222222, 0.8)
    this.progressBox.fillRect(this.progressBarX, this.progressBarY, this.progressBarWidth, this.progressBarHeight)

    this.progressBar = this.add.graphics()

    // Listen for progress events from the Preloader Scene
    this.load.on(Phaser.Loader.Events.PROGRESS, value => {
      console.log(value)
    })

    this.load.on(Phaser.Loader.Events.COMPLETE, () => {
      this.progressBar.destroy()
      this.progressBox.destroy()
    })

    // Start the Preloader Scene
    this.scene.launch(Preloader)
  }

  assetLoaded (totalProgress) {
    this.progressBar.clear()
    this.progressBar.fillStyle(0x0000ff, 1)
    this.progressBar.fillRect(this.progressBarX, this.progressBarY, this.progressBarWidth * totalProgress, this.progressBarHeight)  
  }

  loadingComplete () {
    this.scene.stop(Preloader)
    this.scene.start(Title)
    this.scene.stop(Boot)
  }
}

export default BootScene