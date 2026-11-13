export interface PhilosophyEntry {
  id: string;
  topic: string;
  topicSlug: string;
  philosopher: string;
  philosopherEn: string;
  title: string;
  quote: string;
  context: string;
  significance: string;
  era: string;
}

export interface TopicCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Ionicons name
}