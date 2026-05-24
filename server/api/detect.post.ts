export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const response = await fetch(
    'https://serverless.roboflow.com/sekou-cisse-oibkm/workflows/detect-and-classify-3',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: process.env.ROBOFLOW_API_KEY,
        inputs: {
          image: body.image
        }
      })
    }
  )

  const result = await response.json()

  return result
})