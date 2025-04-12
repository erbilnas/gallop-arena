import { ref } from 'vue'

export function useSound() {
  const horseSound = ref<HTMLAudioElement | null>(null)

  const initSound = () => {
    horseSound.value = new Audio('/src/assets/sounds/horse-running.mp3')
    horseSound.value.volume = 0.1
    horseSound.value.loop = true
  }

  const playHorseSound = () => {
    if (!horseSound.value) {
      initSound()
    }

    if (horseSound.value) {
      // Reset the sound to the beginning
      horseSound.value.currentTime = 0

      // Play the sound
      horseSound.value.play().catch((error) => {
        console.error('Error playing sound:', error)
      })
    }
  }

  const stopHorseSound = () => {
    if (horseSound.value) {
      horseSound.value.pause()
      horseSound.value.currentTime = 0
    }
  }

  return {
    playHorseSound,
    stopHorseSound,
  }
}
