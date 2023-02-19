import { Configuration, OpenAIApi } from "openai";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generateChatQA(req: Request, res: Response) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const question = req.body.question || "";
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(question),
      temperature: 0,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["Human:", "AI:"],
    });
    res.status(200).json({ result: completion.data });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(question: string) {
  return `The following is a conversation with an AI assistant. The assistant is helpful,creative,
    clever, and very friendly.
    Human: Hello, who are you?
    AI: I am an AI created by open AI. How can I help today?
    Human:${question}.
    AI:`;
}
