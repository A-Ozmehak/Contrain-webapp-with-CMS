interface TypewriterText {
    id: number;
    Text: string;
  }
  
  interface HeroProps {
    BackgroundImage: string;
    Title: string;
    SubText: string;
    TypewriterTexts: string[];
  }

  interface TypewriterText {
    id: number;
    Text: string;
  }
  
  interface HeroData {
    id: number;
    Title: string;
    SubText: string;
    ButtonLabel: string;
    BackgroundImage: string;
    TypewriterTexts: TypewriterText[];
  }
  
  interface HomepageData {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Hero: HeroData;
  }

  export type { HeroProps, HeroData, HomepageData, TypewriterText };