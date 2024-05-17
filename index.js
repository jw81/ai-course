import 'dotenv/config'

import OpenAI from "openai"
const openai = new OpenAI()
const results = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    {
      role: 'user',
      content: 'Hi!'
    }
  ]
})

console.log(results.choices[0].message.content)
