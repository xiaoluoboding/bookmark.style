import { ref } from 'vue'
// import domtoimage from 'dom-to-image'
import html2canvas from 'html2canvas'

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

  // try {
  //   imageBlob.value = await domtoimage.toBlob(node, retinaOption)
  // } catch (error) {
  //   console.error("oops, something went wrong!", error)
  // }

  try {
    const canvas = await html2canvas(node, {
      scale: 2,
      allowTaint: true,
      useCORS: true,
      width: node.offsetWidth,
      height: node.offsetHeight,
      // x: getOffsetLeft(node),
      // y: getOffsetTop(node)
    })

    const base64Image = canvas.toDataURL('image/png')
    console.log(base64Image)
    // Split the base64 string in data and contentType
    const block = base64Image.split(";");
    // Get the content type
    const mimeType = block[0].split(":")[1];// In this case "image/png"
    // get the real base64 content of the file
    const realData = block[1].split(",")[1];// For example:  iVBORw0KGgouqw23....

    // Convert b64 to blob and store it into a constiable (with real base64 as value)
    const canvasBlob = b64toBlob(realData, mimeType)

    console.log(canvasBlob);
    imageBlob.value = canvasBlob

  } catch (error) {
    console.error("oops, something went wrong!", error)
  }

  return {
    imageBlob,
  }
}

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data: any, contentType: any, sliceSize?: any) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function getOffsetTop (el: any) {
  let top = el.offsetTop
  let parent = el.offsetParent
  while (parent) {
    top += parent.offsetTop
    parent = parent.offsetParent
  }
  return top
}

function getOffsetLeft (el: any) {
  let left = el.offsetLeft
  let parent = el.offsetParent
  while (parent) {
    left += parent.offsetLeft
    parent = parent.offsetParent
  }
  return left
}

export { useRetinaImage }
