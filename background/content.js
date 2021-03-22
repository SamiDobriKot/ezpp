chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'GET_BEATMAP_INFO') {
    try {
      const activeTabHref = document
        .querySelector('.beatmapTab.active')
        .getAttribute('href')
      const graphImageSrc = document
        .querySelector('img[src^="/pages/include/beatmap-rating-graph.php"]')
        .getAttribute('src')
      const [, beatmapId] = activeTabHref.match(/\/b\/(\d+)/i) || []
      const [, beatmapSetId] = graphImageSrc.match(/=(\d+)$/i) || []
      sendResponse({
        status: 'SUCCESS',
        beatmapId,
        beatmapSetId,
      })
    } catch (error) {
      sendResponse({
        status: 'ERROR',
        error: {
          message: error.message,
          arguments: error.arguments,
          type: error.type,
          name: error.name,
          stack: error.stack,
        },
      })
    }
  }
  if (request.action === 'GET_BEATMAP_STATS') {
    try {
      const beatmapSet = JSON.parse(
        document.getElementById('json-beatmapset').textContent
      )
      const beatmap = beatmapSet.beatmaps.find(
        (map) => map.id.toString() === request.beatmapId.toString()
      )

      sendResponse({
        status: 'SUCCESS',
        beatmap,
      })
    } catch (error) {
      sendResponse({
        status: 'ERROR',
        error: {
          message: error.message,
          arguments: error.arguments,
          type: error.type,
          name: error.name,
          stack: error.stack,
        },
      })
    }
  }
})
