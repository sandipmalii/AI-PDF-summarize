// import fs from 'fs/promises';
// import path from 'path';
// import fetch from 'node-fetch';

// import { PDFLoader } from 'langchain/community/document_loaders/fs/pdf';

 

// export async function fetchAndExtractPdfText(fileUrl: string) {
//   const response = await fetch(fileUrl);
//   const arrayBuffer = await response.arrayBuffer();

//   // Save to a temporary file
//   const tempFilePath = path.join('/tmp', 'temp.pdf');
//   await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer));

//   const loader = new PDFLoader(tempFilePath);
//   const docs = await loader.load();

//   // Clean up temp file if needed: await fs.unlink(tempFilePath);

//   return docs.map((doc) => doc.pageContent).join('\n\n');
// }

// utils.ts

'use server';

import fs from 'fs/promises';
import path from 'path';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import fetch from 'node-fetch';

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);
  const arrayBuffer = await response.arrayBuffer();
  const tempFilePath = path.join('/tmp', 'temp.pdf');
  await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer));

  const loader = new PDFLoader(tempFilePath);
  const docs = await loader.load();

  return docs.map((doc) => doc.pageContent).join('\n\n');
}
