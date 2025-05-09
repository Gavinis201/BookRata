export interface BookWithRatings {
    bookId: number;
    title: string;
    overallTier?: string | number; // Added overallTier property
    author: string;
    languageTier: string;
    languageReasoning: string;
    sexTier: string;
    sexReasoning: string;
    violenceTier: string;
    violenceReasoning: string;
    healthTier: string;
    healthReasoning: string;
    religionTier: string;
    religionReasoning: string;
    lgbtqTier: string;
    lgbtqReasoning: string;
    bookSummary: string;
    publishDate: string; 
    tagName?: string[];
  }
  
  export interface Tags {
    tagId: number;
    tagName: string;
  }