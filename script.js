// Quick client edits: update the sample name and sign-off here.
const recipient = 'Amara'
const sender = 'Yours, always'

document.querySelectorAll('[data-recipient]').forEach((node) => { node.textContent = recipient })
document.querySelectorAll('[data-sender]').forEach((node) => { node.textContent = sender })

const envelope = document.querySelector('#envelope')
const letter = document.querySelector('#letter')
const response = document.querySelector('#response')
const caption = document.querySelector('#envelope-caption')

function revealLetter() {
  const isOpen = envelope.getAttribute('aria-expanded') === 'true'
  if (isOpen) {
    letter.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  envelope.setAttribute('aria-expanded', 'true')
  envelope.classList.add('is-open')
  envelope.setAttribute('aria-label', 'Letter opened')
  caption.textContent = 'Your letter is open'
  letter.hidden = false
  response.hidden = false
  startMusic()
  window.setTimeout(() => letter.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500)
}

envelope.addEventListener('click', revealLetter)
document.querySelector('#open-letter').addEventListener('click', revealLetter)

document.querySelector('#show-promises').addEventListener('click', (event) => {
  const button = event.currentTarget
  const promises = document.querySelector('#promises')
  const expanded = button.getAttribute('aria-expanded') === 'true'
  button.setAttribute('aria-expanded', String(!expanded))
  button.innerHTML = expanded ? 'Read my promises <span aria-hidden="true">↓</span>' : 'Hide my promises <span aria-hidden="true">↑</span>'
  promises.hidden = expanded
  if (!expanded) promises.scrollIntoView({ behavior: 'smooth', block: 'center' })
})

document.querySelectorAll('[data-answer]').forEach((button) => {
  button.addEventListener('click', () => {
    const reply = document.querySelector('#reply')
    reply.textContent = button.dataset.answer === 'yes'
      ? 'Thank you for hearing me. I’ll meet you with care.'
      : 'I understand. Take all the time and space you need.'
    reply.hidden = false
    document.querySelector('#response-actions').hidden = true
  })
})

const musicButton = document.querySelector('#music-toggle')
const musicPlayerWrap = document.querySelector('#spotify-player-wrap')
let spotifyController = null
let spotifyIsReady = false
let playWhenReady = false

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  IFrameAPI.createController(
    document.querySelector('#spotify-embed'),
    { width: '100%', height: '152', uri: 'spotify:track:7qiZfU4dY1lWllzX7mPBI3' },
    (controller) => {
      spotifyController = controller
      controller.addListener('ready', () => {
        spotifyIsReady = true
        if (playWhenReady) {
          playWhenReady = false
          try { controller.play() } catch { /* Spotify controls remain available. */ }
        }
      })
    },
  )
}

function startMusic() {
  musicPlayerWrap.classList.remove('is-concealed')
  musicPlayerWrap.setAttribute('aria-hidden', 'false')
  musicButton.setAttribute('aria-expanded', 'true')
  musicButton.querySelector('#music-label').textContent = 'Shape of You · Spotify'
  if (spotifyController && spotifyIsReady) {
    try { spotifyController.play() } catch { /* Spotify controls remain available. */ }
  } else {
    playWhenReady = true
  }
}

musicButton.addEventListener('click', startMusic)
const spotifyApi = document.createElement('script')
spotifyApi.src = 'https://open.spotify.com/embed/iframe-api/v1'
spotifyApi.async = true
document.body.append(spotifyApi)
