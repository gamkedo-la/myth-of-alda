import nlp from '../compromise/src/three.js'

export default class InputManager {
  constructor (scene) {
    this.scene = scene
    let doc = nlp('she sells seashells by the seashore.')
    console.log(doc.sentences().out())
  }

  processInput (inputText) {

  }
}