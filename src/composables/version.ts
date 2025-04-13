import { computed } from 'vue'
import packageJson from '../../package.json'

export const useVersion = () => ({
  version: computed(() => packageJson.version),
})
