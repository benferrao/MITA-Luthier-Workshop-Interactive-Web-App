export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('Base64 length:', body.image?.length)
  console.log('Premiers caractères:', body.image?.substring(0, 50))
  
  const response = await fetch(
    'https://serverless.roboflow.com/sekou-cisse-oibkm/workflows/detect-and-classify-4',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.ROBOFLOW_API_KEY,
        inputs: {
          image: {
            type: "base64",
            value: body.image
          }
        }
      })
    }
  )

  const result = await response.json()
  return result.outputs[0].classification_predictions.predictions
})