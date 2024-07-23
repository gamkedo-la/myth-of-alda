import UIAttributes from '../globals/UIAttributes.js'

export default class TextDisplay {
  constructor (scene, x, y, width, height) {
    this.scene = scene
    this.isTyping = false
    this.element = scene.add.dom(x, y, 'div', {
      backgroundColor: UIAttributes.UIColor,
      borderRadius: '10px',
      font: UIAttributes.UIFontSize + ' ' + UIAttributes.UIFontFamily,
      textAlign: UIAttributes.LeftAlign,
      width: `${width}px`,
      height: `${height}px`,
      overflowY: 'hidden',
      padding: '10px',
      position: 'relative'
    })

    // Create a ResizeObserver to monitor changes to the child elements' height
    this.resizeObserver = new ResizeObserver(entries => {
      if (this.element.node.children.length < 2) return

      const entry = entries[entries.length - 1]
      const currentChild = this.element.node.children[this.element.node.children.length - 1]
      if (currentChild.previousHeight === entry.contentRect.height) return

      const delta = entry.contentRect.height - currentChild.previousHeight
      currentChild.previousHeight = entry.contentRect.height
      const children = this.element.node.children
      for (let i = 0; i < children.length - 1; i++) {
        const child = children[i]
        const currentBottom = parseInt(child.style.bottom, 10) || 0
        child.style.bottom = `${currentBottom + delta}px`
      }
    })
  }

  typeText (text) {
    if (Array.isArray(text)) {
      this.typeLine(text)
    } else {
      this.typeLine([text])
    }
  }

  typeLine (line, index = 0, lineNumber = 0) {
    if (index === 0) {
      this.isTyping = true
      const newElement = document.createElement('div')
      newElement.style.position = 'absolute'
      newElement.style.bottom = '0'
      newElement.innerHTML = line[lineNumber][index]
      newElement.previousHeight = newElement.offsetHeight // store original height of the element
      this.element.node.appendChild(newElement)

      // Attach the ResizeObserver to the new child element
      this.resizeObserver.observe(newElement)
    } else {
      const children = this.element.node.children
      const lastChild = children[children.length - 1]
      lastChild.innerHTML += line[lineNumber][index]
    }

    this.scene.time.delayedCall(16, () => {
      if (index < line[lineNumber].length - 1) {
        this.typeLine(line, index + 1, lineNumber)
      } else if (lineNumber < line.length - 1) {
        this.typeLine(line, 0, lineNumber + 1)
      } else {
        this.isTyping = false
      }
    })
  }

  appendText (text) {
    if (Array.isArray(text)) {
      text.forEach(line => this.appendLine(line))
    } else {
      this.appendLine(text)
    }
  }

  appendLine (line) {
    const newElement = document.createElement('div')
    newElement.style.position = 'absolute'
    newElement.style.bottom = '0'
    newElement.innerHTML = line
    newElement.previousHeight = newElement.offsetHeight // store original height of the element
    this.element.node.appendChild(newElement)
  
    // Get the height of the new element
    const newElementHeight = newElement.offsetHeight
  
    // Adjust the position of all previously appended elements
    const children = this.element.node.children
    for (let i = 0; i < children.length - 1; i++) {
      const child = children[i]
      const currentBottom = parseInt(child.style.bottom, 10) || 0
      child.style.bottom = `${currentBottom + newElementHeight}px`
    }
  }
}