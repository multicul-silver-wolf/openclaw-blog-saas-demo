import type { GeneratedPost, PublishedPost } from "@/lib/mock-types";

const generatedPosts: Record<string, GeneratedPost> = {};
const publishedPosts: Record<string, PublishedPost> = {};

function randomId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function searchPosts(query: string) {
  const q = query.trim().toLowerCase();

  const seed = [
    { id: "blog_001", title: "Mock result 1", excerpt: "AI SEO starter patterns." },
    { id: "blog_002", title: "Mock result 2", excerpt: "OpenClaw skill integration notes." },
  ];

  const generated = Object.values(generatedPosts).map((post) => ({
    id: post.id,
    title: post.topic,
    excerpt: post.content.slice(0, 120),
  }));

  const all = [...seed, ...generated];
  if (!q) return all;

  return all.filter((item) => `${item.title} ${item.excerpt}`.toLowerCase().includes(q));
}

export function createGeneratedPost(input: {
  topic: string;
  style: string;
  length: number;
  language: string;
}) {
  const id = randomId("gen");
  const content = `# ${input.topic}\n\nThis is a mocked ${input.style} blog draft in ${input.language}.\n\nTarget length: ${input.length} words.`;

  const post: GeneratedPost = {
    id,
    topic: input.topic,
    style: input.style,
    length: input.length,
    language: input.language,
    content,
    state: "generated",
    createdAt: new Date().toISOString(),
  };

  generatedPosts[id] = post;
  return post;
}

export function publishGeneratedPost(id: string, platform: string) {
  const source = generatedPosts[id];
  if (!source) return null;

  source.state = "published";

  const publishId = randomId("pub");
  const published: PublishedPost = {
    publishId,
    sourceId: id,
    platform,
    url: `/mock-published/${publishId}`,
    state: "published",
    publishedAt: new Date().toISOString(),
  };

  publishedPosts[publishId] = published;
  return published;
}

export function getStatus(id: string) {
  const source = generatedPosts[id];
  if (!source) return null;

  return { id, state: source.state };
}
