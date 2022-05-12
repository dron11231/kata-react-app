const useSetTimer = (min = '00', sec = '00') => {
  if (min === '') {
    min = '00'
  }
  if (sec === '') {
    sec = '00'
  }
  let minutes = min
  let seconds = sec
  let newTime = []

  if (sec > 60) {
    seconds = 60
  }
  minutes = minutes.toString()
  seconds = seconds.toString()
  if (minutes.length < 2) {
    minutes = '0' + minutes
  }
  if (seconds.length < 2) {
    seconds = '0' + seconds
  }
  newTime.push(minutes, seconds)
  newTime = newTime.join(':')
  return newTime
}

export { useSetTimer }
