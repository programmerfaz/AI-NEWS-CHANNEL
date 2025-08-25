import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateNewsContent = async (category = 'general') => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const prompt = `Generate 5 realistic and current tech news items for ${category} as of ${currentDate}. Focus on very recent developments (within the last 30 days). Each item should include:
    - title: A compelling headline
    - summary: 2-3 sentence summary (keep it concise for card display)
    - content: Detailed 4-5 paragraph article content
    - category: One of [ML Models, Startups, Open Source, Research, Product Launches, AI Ethics]
    - trending: boolean indicating if it's trending
    - timestamp: Current timestamp
    - source: Realistic tech publication name
    - tags: Array of relevant tags
    - url: Generate a realistic URL slug based on the title
    
    Focus on CURRENT 2025 developments like:
    - Latest RAG (Retrieval-Augmented Generation) improvements and implementations
    - New LLM releases (GPT-5, Claude 4, Gemini Ultra updates)
    - Recent AI startup funding rounds and acquisitions
    - Latest open-source AI model releases
    - Current AI research breakthroughs
    - Recent product launches from major tech companies
    - Current AI ethics discussions and regulations
    
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
    title: "OpenAI Announces GPT-5 with Revolutionary Multimodal RAG Capabilities",
    summary: "The latest model integrates advanced RAG with real-time web search and multimodal understanding. Early benchmarks show 60% improvement in factual accuracy.",
    content: "OpenAI has unveiled GPT-5, marking a significant leap forward in artificial intelligence capabilities. The new model introduces revolutionary Retrieval-Augmented Generation (RAG) features that allow it to access and synthesize information from multiple sources in real-time.\n\nThe most notable improvement is the model's ability to perform dynamic knowledge retrieval while maintaining conversational context. Unlike previous iterations, GPT-5 can seamlessly integrate web search results, document databases, and multimodal content including images, videos, and audio files.\n\nPerformance benchmarks conducted by independent researchers show a 60% improvement in factual accuracy compared to GPT-4 Turbo. The model also demonstrates enhanced reasoning capabilities, particularly in complex problem-solving scenarios that require multiple steps and external knowledge validation.\n\nIndustry experts are calling this release a game-changer for enterprise applications, particularly in research, education, and content creation. The enhanced RAG capabilities are expected to significantly reduce hallucinations while providing more reliable and up-to-date information.\n\nOpenAI plans to roll out GPT-5 to API customers starting next month, with ChatGPT Plus subscribers gaining access in Q2 2025.",
    category: "ML Models",
    trending: true,
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    source: "TechCrunch",
    tags: ["OpenAI", "GPT-5", "RAG", "Multimodal AI"],
    url: "openai-gpt5-multimodal-rag-capabilities"
  },
  {
    id: 2,
    title: "Anthropic's Claude 4 Introduces Advanced RAG Architecture",
    summary: "The new model features improved retrieval mechanisms and can process 2M token contexts. Claude 4 shows remarkable performance in document analysis and research tasks.",
    content: "Anthropic has released Claude 4, featuring groundbreaking advances in Retrieval-Augmented Generation that set new standards for AI-powered research and analysis. The model introduces a sophisticated RAG architecture that can efficiently process and synthesize information from massive document collections.\n\nOne of the most impressive features is Claude 4's ability to handle context windows of up to 2 million tokens, allowing it to process entire books, research papers, and complex datasets in a single session. This expanded context window, combined with advanced retrieval mechanisms, enables unprecedented accuracy in document analysis and cross-referencing.\n\nThe model's RAG system employs a novel approach called 'Hierarchical Retrieval,' which organizes information into semantic clusters and retrieves relevant content at multiple levels of granularity. This allows Claude 4 to maintain coherence across long conversations while accessing specific details from vast knowledge bases.\n\nEarly adopters in academic and enterprise settings report significant improvements in research efficiency, with some institutions seeing 70% faster literature reviews and data analysis tasks. The model's ability to cite sources and provide detailed explanations for its reasoning has made it particularly valuable for scientific research.\n\nClaude 4 is now available through Anthropic's API, with enterprise customers gaining access to the full 2M token context window and advanced RAG features.",
    category: "Open Source",
    trending: true,
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    source: "Anthropic Blog",
    tags: ["Anthropic", "Claude 4", "RAG", "Long Context"],
    url: "anthropic-claude4-advanced-rag-architecture"
  },
  {
    id: 3,
    title: "Microsoft Copilot Gets Real-Time RAG Integration with Bing",
    summary: "The latest update enables Copilot to access live web data through advanced RAG. Users can now get current information and real-time analysis across all Microsoft 365 apps.",
    content: "Microsoft has announced a major update to Copilot that integrates real-time Retrieval-Augmented Generation (RAG) capabilities with Bing's search infrastructure. This enhancement allows Copilot to access and synthesize current web information directly within Microsoft 365 applications.\n\nThe new RAG integration represents a significant advancement in how AI assistants handle information retrieval. Unlike traditional models that rely on static training data, Copilot can now pull real-time information from the web, company databases, and user documents simultaneously, providing more accurate and current responses.\n\nKey features include dynamic fact-checking, where Copilot automatically verifies information against multiple sources, and contextual web search that understands the user's current task and retrieves relevant information without explicit search queries. The system also maintains privacy by ensuring that sensitive corporate data remains within the organization's security boundaries.\n\nEarly enterprise customers report dramatic improvements in productivity, particularly in research-heavy tasks, financial analysis, and content creation. The ability to combine internal company knowledge with real-time market data has proven especially valuable for strategic planning and decision-making.\n\nThe update is rolling out to Microsoft 365 Copilot subscribers globally, with full availability expected by the end of January 2025. Microsoft plans to extend these RAG capabilities to other products in the Copilot ecosystem throughout the year.",
    category: "Product Launches",
    trending: false,
    timestamp: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    source: "Microsoft Blog",
    tags: ["Microsoft", "Copilot", "RAG", "Bing Integration"],
    url: "microsoft-copilot-realtime-rag-bing-integration"
  },
  {
    id: 4,
    title: "Perplexity AI Raises $500M Series C, Valued at $9B",
    summary: "The AI search startup's valuation has tripled in six months, driven by its advanced RAG technology. Perplexity now processes over 100M queries monthly with real-time source attribution.",
    content: "Perplexity AI has successfully closed a $500 million Series C funding round, achieving a valuation of $9 billion and cementing its position as a leader in AI-powered search technology. The round was led by prominent venture capital firms and strategic investors, reflecting strong confidence in the company's RAG-based approach to information retrieval.\n\nThe startup's rapid growth has been fueled by its innovative use of Retrieval-Augmented Generation technology, which combines large language models with real-time web search to provide accurate, sourced answers to user queries. Unlike traditional search engines, Perplexity synthesizes information from multiple sources and provides clear citations, making it particularly valuable for research and fact-checking.\n\nSince its last funding round six months ago, Perplexity has seen explosive growth, now processing over 100 million queries monthly. The platform has gained significant traction among professionals, researchers, and students who value its ability to provide comprehensive, well-sourced answers to complex questions.\n\nThe new funding will be used to expand Perplexity's engineering team, enhance its RAG infrastructure, and develop new features including multimodal search capabilities and enterprise solutions. The company is also investing heavily in improving its real-time indexing capabilities to ensure users always receive the most current information available.\n\nPerplexity's success highlights the growing demand for AI-powered search solutions that can provide more nuanced and contextual responses than traditional keyword-based search engines.",
    category: "AI Ethics",
    trending: true,
    timestamp: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
    source: "VentureBeat",
    tags: ["Perplexity", "Funding", "AI Search", "RAG"],
    url: "perplexity-ai-500m-series-c-9b-valuation"
  },
  {
    id: 5,
    title: "Meta Open Sources Llama 3.1 with Enhanced RAG Capabilities",
    summary: "The latest open-source model features improved retrieval mechanisms and 405B parameters. Llama 3.1 demonstrates competitive performance with proprietary models in RAG benchmarks.",
    content: "Meta has released Llama 3.1, the latest iteration of its open-source large language model family, featuring significant enhancements in Retrieval-Augmented Generation capabilities. The flagship 405B parameter model represents one of the most powerful open-source AI systems ever released, with performance that rivals proprietary alternatives.\n\nThe new model introduces advanced RAG architectures that allow for more efficient and accurate information retrieval from external knowledge bases. Llama 3.1's retrieval system can handle diverse data types including structured databases, unstructured documents, and real-time web content, making it highly versatile for enterprise applications.\n\nBenchmark results show that Llama 3.1 achieves state-of-the-art performance on several RAG-specific tasks, including multi-hop reasoning, fact verification, and long-form question answering. The model's ability to maintain coherence while incorporating retrieved information has improved significantly compared to previous versions.\n\nThe open-source release includes comprehensive documentation, training recipes, and fine-tuning guides, enabling researchers and developers to customize the model for specific RAG applications. Meta has also provided pre-trained retrieval components and example implementations for common use cases.\n\nThis release is expected to accelerate innovation in the RAG space, as researchers and companies can now build upon a high-quality foundation model without the computational costs of training from scratch. The model is available under Meta's custom license, which allows for both research and commercial use with certain restrictions.",
    category: "Startups",
    trending: false,
    timestamp: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
    source: "Meta AI Blog",
    tags: ["Meta", "Llama 3.1", "Open Source", "RAG"],
    url: "meta-llama-31-enhanced-rag-capabilities"
  }
];