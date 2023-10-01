import { llmChat } from './llm-chat';

async function main() {
  const prompt = 'What is the best dog food?';

  // Call our llmChat twice with the same prompts.
  const response1 = await llmChat(prompt);
  const response2 = await llmChat(prompt);

  if (response1 !== response2) {
    throw new Error('Responses do not match.');
  }

  console.log(`Responses match. We've got caching 🚀`);
  console.log({ response1, response2 });
}

main()
  .then(() => console.log('Done.'))
  .catch((err) => {
    // If the cache does not work, we'll get an error here.
    console.error(err);
  });
