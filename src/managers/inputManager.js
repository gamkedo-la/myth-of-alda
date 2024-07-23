/* global nlp */

const POS = {
  Noun: '#Noun',
  Verb: '#Verb'
}

const Output = {
  Array: 'array'
}

export default class InputManager {
  constructor (scene) {
    this.scene = scene
  }

  processInput (inputText) {
    let doc = nlp(inputText)
    console.log(doc.verbs().out(Output.Array))
    console.log(doc.nouns().out(Output.Array))
    console.log(doc.match(POS.Noun).out(Output.Array))
  }
}