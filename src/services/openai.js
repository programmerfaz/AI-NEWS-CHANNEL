import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateNewsContent = async (category = 'general') => {
  try {
    const prompt = `Generate 5 realistic tech news items for ${category}. Each item should include:
    - title: A compelling headline
    - summary: 2-3 sentence summary
    - category: One of [ML Models, Startups, Open Source, Research, Product Launches, AI Ethics]
    - trending: boolean indicating if it's trending
    - timestamp: Current timestamp
    - source: Realistic tech publication name
    - tags: Array of relevant tags
    
    Focus on current AI/ML developments, new model releases, tech innovations, and industry updates.
    Return as valid JSON array.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating news:', error);
    return getFallbackNews();
  }
};

export const summarizeArticle = async (content) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Summarize this tech article in 2-3 sentences, focusing on key insights: ${content}`
      }],
      temperature: 0.3,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error summarizing:', error);
    return content.substring(0, 200) + '...';
  }
};

const getFallbackNews = () => [
  {
    id: 1,
    title: "OpenAI Releases GPT-4 Turbo with Enhanced Reasoning",
    summary: "The latest iteration shows significant improvements in mathematical reasoning and code generation. Performance benchmarks indicate 40% better accuracy on complex problem-solving tasks.",
    category: "ML Models",
    trending: true,
    timestamp: new Date().toISOString(),
    source: "TechCrunch",
    tags: ["OpenAI", "GPT-4", "Language Models"]
  },
  {
    id: 2,
    title: "Meta's LLaMA 3 Achieves State-of-the-Art Performance",
    summary: "The open-source model demonstrates competitive results against proprietary alternatives. Researchers highlight its efficiency in few-shot learning scenarios.",
    category: "Open Source",
    trending: true,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    source: "AI Research",
    tags: ["Meta", "LLaMA", "Open Source"]
  },
  {
    id: 3,
    title: "Google's Gemini Pro Integrates Multimodal Capabilities",
    summary: "The updated model can now process text, images, and audio simultaneously. Early tests show promising results for creative applications and content generation.",
    category: "Product Launches",
    trending: false,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    source: "Google AI Blog",
    tags: ["Google", "Gemini", "Multimodal"]
  },
  {
    id: 4,
    title: "Anthropic Introduces Constitutional AI Framework",
    summary: "The new approach aims to make AI systems more helpful, harmless, and honest. The framework includes built-in ethical guidelines and safety measures.",
    category: "AI Ethics",
    trending: false,
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    source: "Anthropic Research",
    tags: ["Anthropic", "AI Safety", "Ethics"]
  },
  {
    id: 5,
    title: "Startup Raises $50M for Edge AI Computing Platform",
    summary: "The company focuses on bringing AI inference to edge devices with minimal latency. Their proprietary chips promise 10x performance improvements for mobile AI applications.",
    category: "Startups",
    trending: false,
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    source: "VentureBeat",
    tags: ["Startup", "Edge AI", "Hardware"]
  }
];