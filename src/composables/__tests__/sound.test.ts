import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSound } from '../sound'

// Mock HTMLAudioElement
vi.mock('vue', () => ({
  ref: vi.fn(() => ({
    value: new Map(),
  })),
}))

describe('useSound', () => {
  let soundControls: ReturnType<typeof useSound>
  const mockAudio = {
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
    volume: 0.1,
    currentTime: 0,
    loop: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    global.Audio = vi.fn().mockImplementation(() => mockAudio)
    soundControls = useSound()
  })

  describe('playSound', () => {
    it('should initialize and play a new sound', () => {
      const soundId = 'test-sound'
      const filePath = '/path/to/sound.mp3'
      const config = { volume: 0.5, loop: true }

      soundControls.playSound(soundId, filePath, config)

      expect(global.Audio).toHaveBeenCalledWith(filePath)
      expect(mockAudio.volume).toBe(0.5)
      expect(mockAudio.loop).toBe(true)
      expect(mockAudio.play).toHaveBeenCalled()
    })

    it('should play an existing sound', () => {
      const soundId = 'existing-sound'
      const filePath = '/path/to/sound.mp3'

      // First call to initialize
      soundControls.playSound(soundId, filePath)
      // Second call to play existing sound
      soundControls.playSound(soundId)

      expect(global.Audio).toHaveBeenCalledTimes(1)
      expect(mockAudio.play).toHaveBeenCalledTimes(2)
    })

    it('should handle play errors gracefully', async () => {
      const soundId = 'error-sound'
      const filePath = '/path/to/sound.mp3'
      const error = new Error('Playback failed')
      mockAudio.play.mockRejectedValueOnce(error)

      const consoleSpy = vi.spyOn(console, 'error')
      soundControls.playSound(soundId, filePath)

      // Wait for the next tick to allow the promise to resolve
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(consoleSpy).toHaveBeenCalledWith(`Error playing sound ${soundId}:`, error)
    })
  })

  describe('stopSound', () => {
    it('should stop a playing sound', () => {
      const soundId = 'stop-sound'
      const filePath = '/path/to/sound.mp3'

      soundControls.playSound(soundId, filePath)
      soundControls.stopSound(soundId)

      expect(mockAudio.pause).toHaveBeenCalled()
      expect(mockAudio.currentTime).toBe(0)
    })

    it('should handle non-existent sound gracefully', () => {
      const soundId = 'non-existent-sound'

      expect(() => {
        soundControls.stopSound(soundId)
      }).not.toThrow()
    })
  })

  describe('setVolume', () => {
    it('should set volume for an existing sound', () => {
      const soundId = 'volume-sound'
      const filePath = '/path/to/sound.mp3'
      const volume = 0.7

      soundControls.playSound(soundId, filePath)
      soundControls.setVolume(soundId, volume)

      expect(mockAudio.volume).toBe(volume)
    })

    it('should clamp volume between 0 and 1', () => {
      const soundId = 'clamp-sound'
      const filePath = '/path/to/sound.mp3'

      soundControls.playSound(soundId, filePath)

      // Test below 0
      soundControls.setVolume(soundId, -1)
      expect(mockAudio.volume).toBe(0)

      // Test above 1
      soundControls.setVolume(soundId, 2)
      expect(mockAudio.volume).toBe(1)
    })

    it('should handle non-existent sound gracefully', () => {
      const soundId = 'non-existent-sound'

      expect(() => {
        soundControls.setVolume(soundId, 0.5)
      }).not.toThrow()
    })
  })
})
