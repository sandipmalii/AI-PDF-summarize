// ✅ Parses a section into a title and bullet points
export const parseSection = (
  section: string
): { title: string; points: string[] } => {
  const [rawTitle, ...contentLines] = section.split('\n');

  const title = rawTitle.startsWith('#')
    ? rawTitle.slice(1).trim()
    : rawTitle.trim();

  const points: string[] = [];
  let currentPoint = '';

  contentLines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('* ')) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine.slice(2); // remove "* "
    } else if (!trimmedLine) {
      if (currentPoint) {
        points.push(currentPoint.trim());
        currentPoint = '';
      }
    } else {
      currentPoint += ' ' + trimmedLine;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title,
    points: points.filter(
      (point) =>
        point &&
        !point.startsWith('#') &&
        !point.startsWith('[Choose') &&
        point.trim().length > 0
    ),
  };
};

// ✅ Analyzes a point for structure or formatting
export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^\*\s/.test(point);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

// ✅ Extracts emoji and text from a bullet point
export function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^[\n\s]*\*\s*/, '').trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)\s*(.+)$/u);

  if (!matches) return null;

  const [, emoji, text] = matches;

  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}
