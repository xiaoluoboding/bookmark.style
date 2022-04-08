import { ref } from "vue"
import domtoimage from "dom-to-image"

// improve the image quality
// relate issue: https://github.com/tsayen/dom-to-image/issues/69
const useRetinaImage = async (node: HTMLElement) => {
  const SCALE = 2
  // const scale = 750 / node.offsetWidth

  const imageBlob = ref()

  // const option = {
  //   height: node.offsetHeight * scale,
  //   width: node.offsetWidth * scale,
  //   style: {
  //     transform: 'scale(' + scale + ')',
  //     transformOrigin: 'top left',
  //     width: node.offsetWidth + 'px',
  //     height: node.offsetHeight + 'px'
  //   }
  // }

  const retinaOption = {
    quality: 1,
    height: node.offsetHeight * SCALE,
    width: node.offsetWidth * SCALE,
    style: {
      transform: `scale(${SCALE}) translate(${
        node.offsetWidth / 2 / SCALE
      }px, ${node.offsetHeight / 2 / SCALE}px)`,
    },
  }

  try {
    imageBlob.value = await domtoimage.toBlob(node, retinaOption)
  } catch (error) {
    console.error("oops, something went wrong!", error)
  }

  return {
    imageBlob,
  }
}

export { useRetinaImage }
