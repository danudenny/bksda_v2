import { successResponse, errorResponse } from "../utils/response";

export default defineEventHandler(async (event) => {
  const { content } = await readBody(event);

  // Validasi input
  if (!content || content.trim().length < 20) {
    return errorResponse("Content is too short to enhance.");
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return errorResponse("OpenRouter API key is not configured.");
  }

  const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const siteName = 'BKSDA Web Content Editor';

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
        // KITA GUNAKAN MODEL YANG SAMA DENGAN EXCERPT KARENA TERBUKTI BERHASIL
        model: 'qwen/qwen-2.5-7b-instruct', 
        messages: [
          {
            role: 'system',
            content: `You are a professional technical editor. Your task is to clean up, format, and professionally enhance HTML content in Bahasa Indonesia.

            Guidelines:
            1. **Formatting**: 
               - Break long paragraphs into smaller chunks using <p> tags.
               - Use <h3> for subheadings (useful for SEO).
               - Use <ul>/<li> for lists.
               - Use <strong> for emphasis on key details.
            
            2. **Content**: 
               - Fix grammar and typos.
               - Improve sentence flow to be more professional and journalistic.
               - Do NOT change the facts.
               - Do NOT remove the HTML structure, but improve it.
            
            3. **Output**:
               - Return ONLY the raw HTML string.
               - No markdown code blocks (\`\`\`html).`
          },
          {
            role: 'user',
            content: `Please enhance this HTML content:\n\n${content}`
          }
        ],
        temperature: 0.3, // Rendah agar fokus pada formatting
        top_p: 0.9,
      }
    });

    if (response.error) {
      throw new Error(response.error.message || "Unknown OpenRouter error");
    }

    let enhancedContent = response.choices?.[0]?.message?.content?.trim();
    
    if (!enhancedContent) {
      throw new Error("No content received from AI");
    }

    // CLEANUP: Hapus markdown code block jika AI masih membandel
    enhancedContent = enhancedContent
      .replace(/^```html\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '');

    return successResponse("Content enhanced successfully", { enhancedContent });

  } catch (error: any) {
    console.error("OpenRouter API error full object:", JSON.stringify(error.data || error, null, 2));
    
    let errorMessage = "Failed to enhance content.";
    
    if (error.data?.error?.message) {
        errorMessage = `AI Error: ${error.data.error.message}`;
    } else if (error.data?.message) {
        errorMessage = `AI Error: ${error.data.message}`;
    } else if (error.message) {
        errorMessage = error.message;
    }

    return errorResponse("Failed to enhance content.", errorMessage);
  }
});