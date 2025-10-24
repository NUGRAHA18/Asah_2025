async function startup() {
  function populateTakenPicture(image) {
    // TODO: show taken picture
  }

  async function getStream() {
    return await navigator.mediaDevices.getUserMedia({
      video: true,
    });
  }

  function cameraLaunch(stream) {
    // TODO: launch camera on video
  }

  function cameraTakePicture() {
    // TODO: draw video frame to canvas
  }

  async function init() {
    const stream = await getStream();
    console.log(stream);
  }

  init();
}

window.onload = startup;
