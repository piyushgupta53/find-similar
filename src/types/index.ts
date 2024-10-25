export interface Product {
  highlightScores?: number[];
  highlights?: string[];
  id: string;
  score: number;
  title: string;
  url: string;
  image?: string;
  summary?: string;
}
