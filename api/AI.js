import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that recieve a list of ingredient that a user has and suggests a recipe they could make with some or all of the ingredientts. You don't need to use every ingredients mention in your recipe. The recipe can include additional ingredients they didn't mention but try not to include too many extra ingredients.  Format your response in markdown to mark it render to a web page
`;

const apikey = import.meta.env.VITE_RECIPE_API_KEY;
const hf = new HfInference(apikey);

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await hf.chatCompletion({
      model: "deepseek-ai/DeepSeek-V4-Flash-0731",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 2048,
    });
    return response.choices[0].message.content ?? "No recipe generated.";
  } catch (error) {
    console.error("Recipe generation failed:", error);
    throw error;
  }
}
