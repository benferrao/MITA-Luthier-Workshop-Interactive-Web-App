export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'The Violin Workshop',
      meta: [
        { name: 'description', content: 'Explore Cremona violin making tradition' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      // Add this script array right here:
      script: [
        {
          src: 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js',
          type: 'module'
        }
      ]
    }
  }
})
