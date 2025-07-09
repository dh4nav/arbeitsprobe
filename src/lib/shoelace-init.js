// This registers all components globally
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
// Add more as needed...

// Optionally import the setBasePath helper if you're loading assets (like icons)
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'

// Set base path to load Shoelace assets (like icons) from the correct location
setBasePath('/shoelace')
