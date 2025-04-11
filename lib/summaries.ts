import { getDbConnection } from './db';

export async function getSummaries(userId: string) {
  const sql = await getDbConnection();
  const summaries = await sql`
    SELECT * 
    FROM pdf_summaries 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC
  `;
  return summaries;
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDbConnection();
    const [summary] = await sql`
      SELECT 
        id, 
        user_id, 
        title, 
        original_file_url, 
        summary_text, 
        word_count, 
        created_at, 
        updated_at, 
        status, 
        file_name,
        LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
      FROM pdf_summaries 
      WHERE id = ${id}
      LIMIT 1
    `;
    return summary;
  } catch (err) {
    console.error('Error fetching summary by id:', err);
    return null;
  }
}

export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^\•/.test(point);
  // Replace the Unicode property escape with a simpler emoji detection
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}


export function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^\*\s*/, '').trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)\s*(.+)$/u);
  if (!matches) return null;

  const [, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}