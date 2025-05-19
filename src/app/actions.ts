"use server";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { ollama } from "ollama-ai-provider";

import { OpenApiToolkit } from "langchain/agents/toolkits";
import { JsonSpec } from "langchain/tools";

import { ChatOllama } from "@langchain/ollama";

export async function askQuestion(question: string) {
  const stream = createStreamableValue();

  const llm = new ChatOllama({
    model: "llama3",
    temperature: 0,
    maxRetries: 2,
  });

  const toolkit = new OpenApiToolkit(new JsonSpec({}), llm);

  //   const result = await toolkit.invoke({
  //     input:
  //       "Make a POST request to openai /completions. The prompt should be 'tell me a joke.'",
  //   });
  //   console.log(`Got output ${result.output}`);

  //   const aiMsg = await llm.invoke([
  //     [
  //       "system",
  //       "You are a helpful assistant that translates English to French. Translate the user sentence.",
  //     ],
  //     ["human", "I love programming."],
  //   ]);

  const textStream = streamText({
    model: ollama("llama3.2", { simulateStreaming: true }),
    prompt: `
        You are an AI code assistant who answers questions about the codebase. Your target audience is a technical intern who is looking to understand the codebase.
        AI assistant is a brand new, powerful, human-like artificial intelligence. The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.

        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.

        If the question is asking about code or a specific file, AI will provide the detailed answer, giving step by step instructions, including code snippets.

        START CONTEXT BLOCK
        END CONTEXT BLOCK

        START QUESTION BLOCK
        ${question}
        END QUESTION BLOCK

        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
        If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question."
        AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
        AI assistant will not invent anything that is not drawn directly from the context.
        Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering the question.
        `,
  });

  return {
    output: textStream.toDataStreamResponse(),
  };
}
