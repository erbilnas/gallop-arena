import type { Ref } from 'vue'
import { ref } from 'vue'

interface SoundControls {
  playSound: (soundId: string, filePath?: string, config?: SoundConfig) => void
  stopSound: (soundId: string) => void
  setVolume: (soundId: string, volume: number) => void
}

interface SoundConfig {
  volume?: number
  loop?: boolean
}

export function useSound(): SoundControls {
  const sounds: Ref<Map<string, HTMLAudioElement>> = ref(new Map())

  const initSound = (soundId: string, filePath: string, config: SoundConfig = {}): void => {
    const audio = new Audio(filePath)
    audio.volume = config.volume ?? 0.1
    audio.loop = config.loop ?? false
    sounds.value.set(soundId, audio)
  }

  const playSound = (soundId: string, filePath?: string, config: SoundConfig = {}): void => {
    if (!sounds.value.has(soundId) && filePath) {
      initSound(soundId, filePath, config)
    }

    const sound = sounds.value.get(soundId)
    if (sound) {
      sound.currentTime = 0
      sound.play().catch((error: Error): void => {
        console.error(`Error playing sound ${soundId}:`, error)
      })
    }
  }

  const stopSound = (soundId: string): void => {
    const sound = sounds.value.get(soundId)
    if (sound) {
      sound.pause()
      sound.currentTime = 0
    }
  }

  const setVolume = (soundId: string, volume: number): void => {
    const sound = sounds.value.get(soundId)
    if (sound) {
      sound.volume = Math.max(0, Math.min(1, volume))
    }
  }

  return {
    playSound,
    stopSound,
    setVolume,
  }
}
