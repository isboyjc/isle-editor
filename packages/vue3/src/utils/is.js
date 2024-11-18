export function isMacOS() {
  if (typeof navigator === 'undefined') return false
  
  if (navigator.userAgentData?.platform) {
    return navigator.userAgentData.platform === 'macOS'
  }
  
  return /macintosh|mac os x/i.test(navigator.userAgent)
}