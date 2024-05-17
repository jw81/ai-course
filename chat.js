import { openai } from './openai.js'
import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const newMessage = async (history, message) => {
  const results = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [...history, message]
  })

  return results.choices[0].message
}

const formatMessage = (userInput) => ({ role: 'user', content: userInput })
const chat = () => {
  const history = [
    {
      role: 'system',
      content: 'You are an AI assistant.  Please answer questions to the best of your ability.'
    }
  ]

  const start = () => {
    rl.question('You: ', async (userInput) => {
      if (userInput.toLowerCase() === 'exit') {
        rl.close()
        return
      }

      const message = formatMessage(userInput)
      const response = await newMessage(history, message)

      history.push(message, response)
      console.log(`\n\nAI: ${response.content}`)
      start()
    })
  }

  start()
}

console.log("Chatbot initialized.  Type 'exit' to end the chat.")
chat()
