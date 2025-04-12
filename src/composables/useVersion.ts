import { computed } from 'vue'
import packageJson from '../../package.json'

export const useVersion = () => {
  const version = computed(() => packageJson.version)

  return {
    version,
  }
}
