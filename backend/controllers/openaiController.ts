const { Configuration, OpenAIApi } = require('openai')

interface ImgProps {
  prompt: string
  n: number
  size: 'small' | 'medium' | 'large'
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const generateImage = async (req, res) => {
  const { prompt, n, size }: ImgProps = req.body

  const imgSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'

  try {
    const response = await openai.createImage({ prompt, n, size: imgSize })

    const imgUrls = response.data.data.map((data) => data.url)

    res.status(200).json({
      success: true,
      data: imgUrls,
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    })
    if (e.response) {
      console.log(e.response.status)
      console.log(e.response.data)
    } else {
      console.log(e.message)
    }
  }
}

module.exports = { generateImage }