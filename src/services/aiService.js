import supabase from '../lib/supabase'

// Mock AI service for pattern generation
// In a real implementation, this would call an actual AI service API
export const aiService = {
  // Generate a pattern from a prompt
  async generatePattern(prompt, options = {}) {
    console.log('Generating pattern with prompt:', prompt, options)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real implementation, this would call an AI API
    const settings = generatePatternSettings(prompt, options)
    
    return {
      prompt,
      settings,
      success: true
    }
  },
  
  // Enhance an existing pattern
  async enhancePattern(settings, enhancementType) {
    console.log('Enhancing pattern:', enhancementType, settings)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Clone and modify existing settings
    const enhancedSettings = { ...settings }
    
    switch (enhancementType) {
      case 'colorRefinement':
        enhancedSettings.colors = refineColors(settings.colors)
        break
      case 'complexityBoost':
        enhancedSettings.complexity = Math.min(10, (settings.complexity || 5) * 1.3)
        break
      case 'harmonize':
        enhancedSettings.colors = harmonizeColors(settings.colors)
        enhancedSettings.harmony = (settings.harmony || 0.5) + 0.2
        break
      case 'contrast':
        enhancedSettings.contrast = (settings.contrast || 0.5) + 0.3
        break
      default:
        // Random enhancement
        enhancedSettings.scale = (settings.scale || 1) * (0.8 + Math.random() * 0.4)
        enhancedSettings.rotation = (settings.rotation || 0) + (Math.random() * 45 - 22.5)
    }
    
    return {
      settings: enhancedSettings,
      success: true
    }
  },
  
  // Generate pattern variations
  async generateVariations(settings, count = 3) {
    console.log('Generating variations:', settings)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    // Create multiple variations of the pattern
    const variations = []
    for (let i = 0; i < count; i++) {
      const variation = { ...settings }
      
      // Modify properties to create variations
      variation.complexity = Math.max(1, Math.min(10, settings.complexity + (Math.random() * 4 - 2)))
      variation.scale = Math.max(0.5, Math.min(2, settings.scale * (0.8 + Math.random() * 0.4)))
      variation.rotation = (settings.rotation || 0) + (Math.random() * 60 - 30)
      
      // Slightly modify colors
      if (settings.colors && settings.colors.length) {
        variation.colors = settings.colors.map(color => {
          return shiftColorSlightly(color)
        })
      }
      
      variations.push(variation)
    }
    
    return {
      variations,
      success: true
    }
  },
  
  // Suggest colors based on a prompt
  async suggestColors(prompt, count = 5) {
    console.log('Suggesting colors for prompt:', prompt)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Generate color schemes based on the prompt
    const colorSchemes = []
    
    // Analyze prompt for color hints
    const hasNature = prompt.match(/nature|forest|garden|plant|leaf|tree|flower/i)
    const hasOcean = prompt.match(/ocean|sea|water|wave|blue|aqua/i)
    const hasWarm = prompt.match(/warm|hot|fire|autumn|fall|sunset|red|orange/i)
    const hasCool = prompt.match(/cool|cold|winter|ice|snow|night|blue|cyan/i)
    const hasVibrant = prompt.match(/vibrant|bright|colorful|rainbow/i)
    const hasMuted = prompt.match(/muted|subtle|soft|pastel|gentle/i)
    const hasDark = prompt.match(/dark|night|black|shadow/i)
    const hasLight = prompt.match(/light|bright|white|day/i)
    
    // Generate appropriate color schemes
    if (hasNature) {
      colorSchemes.push(['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#B7E4C7'])
    }
    
    if (hasOcean) {
      colorSchemes.push(['#03045E', '#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8'])
    }
    
    if (hasWarm) {
      colorSchemes.push(['#9D0208', '#DC2F02', '#E85D04', '#F48C06', '#FAA307'])
    }
    
    if (hasCool) {
      colorSchemes.push(['#7400B8', '#6930C3', '#5E60CE', '#5390D9', '#4EA8DE'])
    }
    
    if (hasVibrant) {
      colorSchemes.push(['#FF0075', '#172774', '#77D970', '#FDFF00', '#0496FF'])
    }
    
    if (hasMuted) {
      colorSchemes.push(['#EDEDE9', '#D6CCC2', '#F5EBE0', '#E3D5CA', '#D5BDAF'])
    }
    
    if (hasDark) {
      colorSchemes.push(['#10002B', '#240046', '#3C096C', '#5A189A', '#7B2CBF'])
    }
    
    if (hasLight) {
      colorSchemes.push(['#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD'])
    }
    
    // If no specific schemes matched, generate some defaults
    if (colorSchemes.length === 0) {
      colorSchemes.push(['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'])
      colorSchemes.push(['#606C38', '#283618', '#FEFAE0', '#DDA15E', '#BC6C25'])
      colorSchemes.push(['#8ECAE6', '#219EBC', '#023047', '#FFB703', '#FB8500'])
    }
    
    // Fill up to the requested count
    while (colorSchemes.length < count) {
      // Generate a random color scheme if we need more
      const baseHue = Math.floor(Math.random() * 360)
      const scheme = []
      
      // Generate a 5-color scheme
      for (let i = 0; i < 5; i++) {
        const hue = (baseHue + i * 30) % 360
        const saturation = 70 + Math.floor(Math.random() * 30)
        const lightness = 40 + Math.floor(Math.random() * 40)
        scheme.push(hslToHex(hue, saturation, lightness))
      }
      
      colorSchemes.push(scheme)
    }
    
    return {
      colorSchemes: colorSchemes.slice(0, count),
      success: true
    }
  }
}

// Helper functions for pattern generation

function generatePatternSettings(prompt, options) {
  // Analyze prompt to determine pattern type and settings
  const hasGeometric = prompt.match(/geometric|polygon|square|circle|triangle|line/i)
  const hasOrganic = prompt.match(/organic|flow|natural|curve|wave/i)
  const hasAbstract = prompt.match(/abstract|random|chaotic|modern/i)
  const hasComplex = prompt.match(/complex|intricate|detailed|elaborate/i)
  const hasSimple = prompt.match(/simple|minimal|clean|basic/i)
  const hasDense = prompt.match(/dense|packed|full|heavy/i)
  const hasSparse = prompt.match(/sparse|light|airy|minimal/i)
  
  // Generate base settings
  const settings = {
    patternType: hasGeometric ? 'geometric' : hasOrganic ? 'organic' : hasAbstract ? 'abstract' : 'mixed',
    complexity: hasComplex ? 7 + Math.random() * 3 : hasSimple ? 2 + Math.random() * 3 : 4 + Math.random() * 4,
    scale: hasGeometric ? 0.8 + Math.random() * 0.4 : hasOrganic ? 1 + Math.random() * 0.5 : 0.7 + Math.random() * 0.6,
    density: hasDense ? 0.7 + Math.random() * 0.3 : hasSparse ? 0.2 + Math.random() * 0.3 : 0.4 + Math.random() * 0.3,
    rotation: Math.random() * 360,
    layerCount: hasComplex ? 3 + Math.floor(Math.random() * 3) : 2 + Math.floor(Math.random() * 2),
    harmony: 0.5 + Math.random() * 0.5,
    contrast: 0.4 + Math.random() * 0.4,
    noise: hasOrganic ? 0.3 + Math.random() * 0.4 : 0.1 + Math.random() * 0.2,
  }
  
  // Generate colors based on prompt
  settings.colors = generateColorsFromPrompt(prompt)
  
  // Apply any override options
  return { ...settings, ...options }
}

function generateColorsFromPrompt(prompt) {
  const colors = []
  const colorCount = 4 + Math.floor(Math.random() * 3) // 4-6 colors
  
  // Extract specific colors mentioned in the prompt
  const colorNames = [
    { name: 'red', hex: '#FF0000' },
    { name: 'blue', hex: '#0000FF' },
    { name: 'green', hex: '#00FF00' },
    { name: 'yellow', hex: '#FFFF00' },
    { name: 'purple', hex: '#800080' },
    { name: 'orange', hex: '#FFA500' },
    { name: 'pink', hex: '#FFC0CB' },
    { name: 'brown', hex: '#A52A2A' },
    { name: 'black', hex: '#000000' },
    { name: 'white', hex: '#FFFFFF' },
    { name: 'gray', hex: '#808080' },
    { name: 'cyan', hex: '#00FFFF' },
    { name: 'magenta', hex: '#FF00FF' },
    { name: 'teal', hex: '#008080' },
    { name: 'navy', hex: '#000080' },
    { name: 'gold', hex: '#FFD700' },
    { name: 'silver', hex: '#C0C0C0' }
  ]
  
  // Check for mentioned colors in the prompt
  const mentionedColors = []
  colorNames.forEach(color => {
    if (prompt.toLowerCase().includes(color.name.toLowerCase())) {
      mentionedColors.push(color.hex)
    }
  })
  
  // Use mentioned colors or generate a color scheme
  if (mentionedColors.length > 0) {
    // Start with mentioned colors
    colors.push(...mentionedColors)
    
    // If we need more colors, generate complementary ones
    if (colors.length < colorCount) {
      const baseColor = colors[0]
      const hsl = hexToHSL(baseColor)
      
      // Add complementary and analogous colors
      for (let i = colors.length; i < colorCount; i++) {
        const offset = [180, 30, 60, 90, 120, 150][i % 6]
        const newHue = (hsl.h + offset) % 360
        colors.push(hslToHex(newHue, hsl.s, hsl.l))
      }
    }
  } else {
    // Generate a random color scheme
    const baseHue = Math.floor(Math.random() * 360)
    const scheme = prompt.includes('monochrome') ? 'monochrome' :
                  prompt.includes('analogous') ? 'analogous' :
                  prompt.includes('complementary') ? 'complementary' :
                  prompt.includes('triadic') ? 'triadic' :
                  ['monochrome', 'analogous', 'complementary', 'triadic', 'random'][Math.floor(Math.random() * 5)]
    
    for (let i = 0; i < colorCount; i++) {
      let hue, saturation, lightness
      
      switch (scheme) {
        case 'monochrome':
          hue = baseHue
          saturation = 70 + (i * 5)
          lightness = 40 + (i * 10)
          break
        case 'analogous':
          hue = (baseHue + (i * 30)) % 360
          saturation = 70 + Math.floor(Math.random() * 30)
          lightness = 40 + Math.floor(Math.random() * 40)
          break
        case 'complementary':
          hue = (baseHue + (i % 2 === 0 ? 0 : 180)) % 360
          saturation = 70 + Math.floor(Math.random() * 30)
          lightness = 40 + (i * 5)
          break
        case 'triadic':
          hue = (baseHue + (i % 3) * 120) % 360
          saturation = 70 + Math.floor(Math.random() * 30)
          lightness = 40 + Math.floor(Math.random() * 40)
          break
        default: // random
          hue = Math.floor(Math.random() * 360)
          saturation = 70 + Math.floor(Math.random() * 30)
          lightness = 40 + Math.floor(Math.random() * 40)
      }
      
      colors.push(hslToHex(hue, saturation, lightness))
    }
  }
  
  return colors
}

function refineColors(colors) {
  // Make small adjustments to colors to improve harmony
  return colors.map(color => {
    const hsl = hexToHSL(color)
    // Small random adjustments
    hsl.s = Math.min(100, Math.max(0, hsl.s + (Math.random() * 10 - 5)))
    hsl.l = Math.min(95, Math.max(5, hsl.l + (Math.random() * 10 - 5)))
    return hslToHex(hsl.h, hsl.s, hsl.l)
  })
}

function harmonizeColors(colors) {
  // Adjust colors to be more harmonious
  if (!colors || colors.length === 0) return colors
  
  // Extract the first color as our base
  const baseColor = hexToHSL(colors[0])
  
  // Create a harmonized palette
  return colors.map((color, index) => {
    if (index === 0) return color // Keep the base color
    
    const hsl = hexToHSL(color)
    // Adjust saturation and lightness to be more consistent
    hsl.s = (hsl.s + baseColor.s) / 2
    hsl.l = (hsl.l + baseColor.l) / 2
    return hslToHex(hsl.h, hsl.s, hsl.l)
  })
}

function shiftColorSlightly(color) {
  const hsl = hexToHSL(color)
  // Small random shifts
  hsl.h = (hsl.h + (Math.random() * 20 - 10)) % 360
  hsl.s = Math.min(100, Math.max(0, hsl.s + (Math.random() * 10 - 5)))
  hsl.l = Math.min(95, Math.max(5, hsl.l + (Math.random() * 10 - 5)))
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

// Color conversion utilities
function hexToHSL(hex) {
  // Remove the # if present
  hex = hex.replace(/^#/, '')
  
  // Parse the hex values
  let r = parseInt(hex.substring(0, 2), 16) / 255
  let g = parseInt(hex.substring(2, 4), 16) / 255
  let b = parseInt(hex.substring(4, 6), 16) / 255
  
  // Find min and max values
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  
  // Calculate HSL values
  let h = 0
  let s = 0
  let l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    
    h = Math.round(h * 60)
  }
  
  s = Math.round(s * 100)
  l = Math.round(l * 100)
  
  return { h, s, l }
}

function hslToHex(h, s, l) {
  h /= 360
  s /= 100
  l /= 100
  
  let r, g, b
  
  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}