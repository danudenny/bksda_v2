import { successResponse, errorResponse } from "../utils/response";

export default defineEventHandler(async (event) => {
  const { content } = await readBody(event);

  if (!content) {
    return errorResponse("Content is required to generate an excerpt.");
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return errorResponse("OpenRouter API key is not configured.");
  }

  const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const siteName = 'My Nuxt App'; // Ganti dengan nama aplikasimu

  try {
    const response: any = await $fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': siteUrl, 
        'X-Title': siteName,
      },
      body: {
        model: 'qwen/qwen-2.5-7b-instruct', 
        messages: [
          {
            role: 'system',
            content: 'You are an expert editor. Your task is to generate a concise and engaging excerpt in Bahasa Indonesia from the provided article content. The excerpt should be a single paragraph, between 20 and 40 words, and capture the main idea of the text. Do not use any markdown or special formatting. Respond only with the generated excerpt text.'
          },
          {
            role: 'user',
            content: `Generate an excerpt for the following article content:\n\n${content}`
          }
        ],
        max_tokens: 100,
        temperature: 0.7,
      }
    });

    if (response.error) {
      throw new Error(response.error.message || "Unknown OpenRouter error");
    }

    const excerpt = response.choices?.[0]?.message?.content?.trim();
    
    if (!excerpt) {
      throw new Error("No content received from AI");
    }

    return successResponse("Excerpt generated successfully", { excerpt });

  } catch (error: any) {
    console.error("OpenRouter API error:", error);
    
    let errorMessage = "Failed to generate excerpt.";
    
    if (error.data?.error?.message) {
        errorMessage = error.data.error.message;
        if (error.data?.error?.metadata) {
             console.error("Error Metadata:", error.data.error.metadata);
        }
    } else if (error.message) {
        errorMessage = error.message;
    }

    return errorResponse("Failed to generate excerpt.", errorMessage);
  }
});