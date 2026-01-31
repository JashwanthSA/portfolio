"use client";

import Fuse from "fuse.js";

type KnowledgeEntry = {
  category: string;
  question: string;
  keywords: string;
  answer: string;
  details?: string;
};

type KnowledgeBase = {
  entries: KnowledgeEntry[];
};

type ChatbotResponse = {
  answer: string;
  details?: string;
  category?: string;
  confidence: number;
};

export class ChatbotEngine {
  private knowledgeBase: KnowledgeEntry[] = [];
  private vocabulary = new Set<string>();
  private idfScores: Record<string, number> = {};
  private fuse: Fuse<KnowledgeEntry> | null = null;

  async loadKnowledgeBase(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = (await response.json()) as KnowledgeBase;
      this.knowledgeBase = data.entries ?? [];
      this.buildVocabulary();
      this.calculateIDF();
      this.buildFuse();
    } catch (error) {
      console.error("Failed to load knowledge base:", error);
      this.initializeFallbackData();
    }
  }

  private initializeFallbackData() {
    this.knowledgeBase = [
      {
        category: "general",
        question: "What do you do?",
        keywords: "role profession job work",
        answer:
          "I'm Jashwanth SA, a full‑stack developer and Computer Science undergraduate.",
        details: "I focus on scalable web apps and data‑driven systems.",
      },
      {
        category: "skills",
        question: "What are your skills?",
        keywords: "skills technologies programming languages",
        answer:
          "I work with React, Node.js, Python, and have experience in ML and cloud tooling.",
        details: "Full‑stack development with modern technologies.",
      },
    ];
    this.buildVocabulary();
    this.calculateIDF();
    this.buildFuse();
  }

  private buildVocabulary() {
    this.vocabulary.clear();
    this.knowledgeBase.forEach((item) => {
      const text = `${item.keywords} ${item.question}`.toLowerCase();
      const words = this.tokenize(text);
      words.forEach((word) => this.vocabulary.add(word));
    });
  }

  private calculateIDF() {
    const totalDocs = this.knowledgeBase.length || 1;
    this.idfScores = {};
    this.vocabulary.forEach((word) => {
      const docsWithWord = this.knowledgeBase.filter((item) => {
        const text = `${item.keywords} ${item.question}`.toLowerCase();
        return this.tokenize(text).includes(word);
      }).length;
      this.idfScores[word] = Math.log(totalDocs / (docsWithWord + 1));
    });
  }

  private buildFuse() {
    if (this.knowledgeBase.length === 0) {
      this.fuse = null;
      return;
    }
    this.fuse = new Fuse(this.knowledgeBase, {
      includeScore: true,
      threshold: 0.35,
      ignoreLocation: true,
      keys: ["question", "keywords", "answer", "category"],
    });
  }

  private tokenize(text: string) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 1);
  }

  private calculateTFIDF(text: string) {
    const words = this.tokenize(text);
    const tf: Record<string, number> = {};
    const vector: Record<string, number> = {};

    words.forEach((word) => {
      tf[word] = (tf[word] || 0) + 1;
    });

    this.vocabulary.forEach((word) => {
      const termFreq = tf[word] || 0;
      const idf = this.idfScores[word] || 0;
      vector[word] = termFreq * idf;
    });

    return vector;
  }

  private cosineSimilarity(
    vec1: Record<string, number>,
    vec2: Record<string, number>
  ) {
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    this.vocabulary.forEach((word) => {
      const val1 = vec1[word] || 0;
      const val2 = vec2[word] || 0;
      dotProduct += val1 * val2;
      norm1 += val1 * val1;
      norm2 += val2 * val2;
    });

    if (norm1 === 0 || norm2 === 0) return 0;
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
  }

  private keywordScore(query: string, entry: KnowledgeEntry) {
    const queryTokens = new Set(this.tokenize(query));
    const keywordTokens = this.tokenize(entry.keywords);
    const questionTokens = this.tokenize(entry.question);

    let hits = 0;
    keywordTokens.forEach((word) => {
      if (queryTokens.has(word)) hits += 2;
    });
    questionTokens.forEach((word) => {
      if (queryTokens.has(word)) hits += 1;
    });

    const total = keywordTokens.length * 2 + questionTokens.length || 1;
    return hits / total;
  }

  findBestMatch(userQuery: string): ChatbotResponse {
    if (this.knowledgeBase.length === 0) {
      return {
        answer:
          "I'm having trouble answering your question. Please ask about my projects, skills, experience, or education.",
        confidence: 0,
      };
    }

    const queryVector = this.calculateTFIDF(userQuery);
    let bestMatch: KnowledgeEntry | null = null;
    let bestScore = 0;

    const fuseResults = (this.fuse ? this.fuse.search(userQuery) : []) as Array<{
      item: KnowledgeEntry;
      score?: number;
    }>;
    const fuseScoreMap = new Map<KnowledgeEntry, number>();
    fuseResults.forEach((result) => {
      if (typeof result.score === "number") {
        fuseScoreMap.set(result.item, result.score);
      }
    });
    const candidates: KnowledgeEntry[] =
      fuseResults.length > 0
        ? fuseResults.slice(0, 8).map((result) => result.item)
        : this.knowledgeBase;

    candidates.forEach((item) => {
      const itemText = `${item.keywords} ${item.question}`;
      const itemVector = this.calculateTFIDF(itemText);
      const semanticScore = this.cosineSimilarity(queryVector, itemVector);
      const keywordBoost = this.keywordScore(userQuery, item);
      const fuseScore = fuseScoreMap.get(item);
      const fuseBoost =
        typeof fuseScore === "number" ? Math.max(0, 1 - fuseScore) : 0;
      const combined =
        semanticScore * 0.35 + fuseBoost * 0.45 + keywordBoost * 0.2;

      if (combined > bestScore) {
        bestScore = combined;
        bestMatch = item;
      }
    });

    if (!bestMatch || bestScore < 0.12) {
      return {
        answer:
          "I'm not sure about that. You can ask about skills, projects, experience, or education.",
        confidence: bestScore,
      };
    }

    const match = bestMatch as KnowledgeEntry;
    return {
      answer: match.answer,
      details: match.details,
      category: match.category,
      confidence: bestScore,
    };
  }

  getWelcomeMessage() {
    return {
      answer:
        "Hi there! 👋 How can I help you learn about me today?",
    };
  }
}

