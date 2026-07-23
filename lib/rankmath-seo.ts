export interface RankMathAnalysisResult {
  score: number;
  grade: 'Bad' | 'Good' | 'Great';
  gradeColor: string;
  tests: {
    id: string;
    title: string;
    passed: boolean;
    recommendation: string;
  }[];
}

export function calculateRankMathSeoScore(
  title: string,
  desc: string,
  slug: string,
  content: string,
  focusKeyword: string
): RankMathAnalysisResult {
  const tests = [];
  let score = 0;
  const kw = focusKeyword.trim().toLowerCase();

  // Test 1: Focus Keyword in Title
  const titleLower = title.toLowerCase();
  const kwInTitle = kw.length > 0 && titleLower.includes(kw);
  if (kwInTitle) score += 20;
  tests.push({
    id: 'kw-title',
    title: 'Focus Keyword in SEO Title',
    passed: kwInTitle,
    recommendation: kwInTitle
      ? 'Focus keyword is used near the beginning of the SEO Title.'
      : 'Add your Focus Keyword to the SEO Title.'
  });

  // Test 2: Focus Keyword in Meta Description
  const descLower = desc.toLowerCase();
  const kwInDesc = kw.length > 0 && descLower.includes(kw);
  if (kwInDesc) score += 20;
  tests.push({
    id: 'kw-desc',
    title: 'Focus Keyword in Meta Description',
    passed: kwInDesc,
    recommendation: kwInDesc
      ? 'Focus keyword appears in the Meta Description.'
      : 'Include your Focus Keyword in the Meta Description for better click-through rates.'
  });

  // Test 3: Focus Keyword in URL / Slug
  const slugLower = slug.toLowerCase();
  const kwInSlug = kw.length > 0 && slugLower.includes(kw.replace(/\s+/g, '-'));
  if (kwInSlug) score += 20;
  tests.push({
    id: 'kw-slug',
    title: 'Focus Keyword in URL / Permalink',
    passed: kwInSlug,
    recommendation: kwInSlug
      ? 'Focus Keyword is present in the permalink URL.'
      : 'Include your Focus Keyword in the post URL slug.'
  });

  // Test 4: Focus Keyword in Content
  const contentLower = content.toLowerCase();
  const kwInContent = kw.length > 0 && contentLower.includes(kw);
  if (kwInContent) score += 20;
  tests.push({
    id: 'kw-content',
    title: 'Focus Keyword in Content',
    passed: kwInContent,
    recommendation: kwInContent
      ? 'Focus Keyword appears naturally inside your article content.'
      : 'Use your Focus Keyword inside the article body content.'
  });

  // Test 5: Content Length
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const isLongEnough = wordCount >= 250;
  if (isLongEnough) score += 20;
  tests.push({
    id: 'content-length',
    title: `Content Word Count (${wordCount} words)`,
    passed: isLongEnough,
    recommendation: isLongEnough
      ? 'Content length is good (>250 words).'
      : 'Content should be at least 250-300 words long for indexing depth.'
  });

  let grade: 'Bad' | 'Good' | 'Great' = 'Bad';
  let gradeColor = '#F43F5E';

  if (score >= 80) {
    grade = 'Great';
    gradeColor = '#22C55E';
  } else if (score >= 50) {
    grade = 'Good';
    gradeColor = '#EAB308';
  }

  return {
    score,
    grade,
    gradeColor,
    tests
  };
}
