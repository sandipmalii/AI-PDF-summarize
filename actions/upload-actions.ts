// 'user server';

// import { fetchAndExtractPdfText } from "@/lib/langchain";
// import { generateSummaryFromOpenAI } from "@/lib/openai";
// import { generateSummaryFromGemini } from "@/lib/geminiai";

// export async function generatePdfSummary(
//   uploadResponse: [
//     {
//       serverData: {
//         userId: string;
//         file: {
//           url: string;
//           name: string;
//         };
//       };
//     }
//   ]
// ) {
//   if (!uploadResponse) {
//     return {
//       success: false,
//       message: 'File upload failed',
//       data: null,
//     };
//   }

//   const {
//     serverData: {
//       userId,
//       file: { url: pdfUrl, name:fileName },
//     },
//   } = uploadResponse[0];

//   if(!pdfUrl){
//     return {
//       success: false,
//       message: 'File upload failed',
//       data: null,
//     };
//   }

//   try{
//     const pdfText= await fetchAndExtractText(pdfUrl);
//     console.log({pdfText});

//     let summary;
// try {
//  summary = await generateSummaryFromOpenAI(pdfText);
//   console.log({ summary });
// } catch (error) {
//   console.log(error);
//  //call gemini
// if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
//   try {
//     summary = await generateSummaryFromGemini(pdfText);
//   } catch (geminiError) {
//     console.error(
//       'Gemini API failed after OpenAI rate limit exceeded',
//       geminiError
//     );
//     throw new Error(
//       'Failed to generate summary with available AI providers'
//     );
//   }
// }
// }

// if (!summary) {
//   return {
//     success: false,
//     message: 'Failed to generate summary',
//     data: null,
//   };
// }

// return {
//   success : true,
// message :'Summary generated successfully' ,
// data:{
// summary,
// },
//   };
//   }
//   catch(err){
//     return {
//       success: false,
//       message: 'File upload failed',
//       data: null,
//     };
//   }



//   // ... rest of your function logic here ...
// }



// 'use server';

// import { fetchAndExtractPdfText } from "@/lib/langchain";
// import { generateSummaryFromOpenAI } from "@/lib/openai";
// import { generateSummaryFromGemini } from "@/lib/geminiai";
// import { auth } from '@clerk/nextjs/server';
// import { getDbConnection } from '@/lib/db';
// import { revalidatePath } from 'next/cache';
// import { formatFileNameAsTitle } from "@/utils/format-utils";

// interface PdfSummary {
//   userId: string;
//   fileUrl: string;
//   summary: string;
//   title: string;
//   fileName: string;
// }

// export async function generatePdfSummary(
//   uploadResponse: [
//     {
//       serverData: {
//         userId: string;
//         file: {
//           url: string;
//           name: string;
//         };
//       };
//     }
//   ]
// ) {
//   if (!uploadResponse?.[0]) {
//     return {
//       success: false,
//       message: 'File upload failed',
//       data: null,
//     };
//   }

//   const {
//     serverData: {
//       userId,
//       file: { url: pdfUrl, name: fileName },
//     },
//   } = uploadResponse[0];

//   if (!pdfUrl) {
//     return {
//       success: false,
//       message: 'File upload failed',
//       data: null,
//     };
//   }

//   try {
//     const pdfText = await fetchAndExtractPdfText(pdfUrl);
//     console.log({ pdfText });

//     let summary: string | undefined;

//     try {
//       summary = await generateSummaryFromOpenAI(pdfText);
//       console.log({ summary });
//     } catch (error) {
//       console.error(error);

//       if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
//         try {
//           summary = await generateSummaryFromGemini(pdfText);
//         } catch (geminiError) {
//           console.error('Gemini API failed after OpenAI rate limit exceeded', geminiError);
//           throw new Error('Failed to generate summary with available AI providers');
//         }
//       }
//     }

//     if (!summary) {
//       return {
//         success: false,
//         message: 'Failed to generate summary',
//         data: null,
//       };
//     }

//     const formattedFileName = formatFileNameAsTitle(fileName);

//     return {
//       success: true,
//       message: 'Summary generated successfully',
//       data: {
//         title: formattedFileName,
//         summary,
//         fileName,
//         fileUrl: pdfUrl,
//       },
//     };
//   } catch (err) {
//     console.error('Summary generation failed:', err);
//     return {
//       success: false,
//       message: 'File processing failed',
//       data: null,
//     };
//   }
// }

// async function savePdfSummary({
//   userId,
//   fileUrl,
//   summary,
//   title,
//   fileName,
// }: PdfSummary) {
//   try {
//     const sql = await getDbConnection();
//     const [savedSummary] = await sql`
//       INSERT INTO pdf_summaries (
//         user_id,
//         original_file_url,
//         summary_text,
//         title,
//         file_name
//       ) VALUES (
//         ${userId},
//         ${fileUrl},
//         ${summary},
//         ${title},
//         ${fileName}
//       )
//       RETURNING id, summary_text
//     `;
//     return savedSummary;
//   } catch (error) {
//     console.error('Error saving PDF summary', error);
//     throw error;
//   }
// }

// export async function storePdfSummaryAction({
//   fileUrl,
//   summary,
//   title,
//   fileName,
// }: Omit<PdfSummary, 'userId'>) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return {
//         success: false,
//         message: 'User not found',
//       };
//     }

//     const savedSummary = await savePdfSummary({
//       userId,
//       fileUrl,
//       summary,
//       title,
//       fileName,
//     });

//     if (!savedSummary) {
//       return {
//         success: false,
//         message: 'Failed to save PDF summary, please try again...',
//       };
//     }

//     // Revalidate page
//     revalidatePath(`/summaries/${savedSummary.id}`);

//     return {
//       success: true,
//       message: 'PDF summary saved successfully',
//       data: {
//         id: savedSummary.id,
//       },
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : 'Error saving PDF summary',
//     };
//   }
// }


'use server';

import { fetchAndExtractPdfText } from '@/lib/langchain';
import { generateSummaryFromOpenAI } from '@/lib/openai';
import { generateSummaryFromGemini } from '@/lib/geminiai';
import { auth } from '@clerk/nextjs/server';
import { getDbConnection } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { formatFileNameAsTitle } from '@/utils/format-utils';

interface PdfSummary {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

// ✅ Step 1: Generates summary from PDF text
export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse?.[0]) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });

    let summary: string | undefined;

    try {
      summary = await generateSummaryFromOpenAI(pdfText);
      console.log({ summary });
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch (geminiError) {
          console.error('Gemini API failed after OpenAI rate limit exceeded', geminiError);
          throw new Error('Failed to generate summary with available AI providers');
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: 'Failed to generate summary',
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: 'Summary generated successfully',
      data: {
        title: formattedFileName,
        summary,
        fileName,
        fileUrl: pdfUrl,
      },
    };
  } catch (err) {
    console.error('Summary generation failed:', err);
    return {
      success: false,
      message: 'File processing failed',
      data: null,
    };
  }
}

// ✅ Step 2: Internal DB write logic
async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummary) {
  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      )
      RETURNING id, summary_text
    `;
    return savedSummary;
  } catch (error) {
    console.error('Error saving PDF summary', error);
    throw error;
  }
}

// ✅ Step 3: Public function to store summary in DB
export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: Omit<PdfSummary, 'userId'>) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: 'Failed to save PDF summary, please try again...',
      };
    }

    revalidatePath(`/summaries/${savedSummary.id}`);

    return {
      success: true,
      message: 'PDF summary saved successfully',
      data: {
        id: savedSummary.id,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error saving PDF summary',
    };
  }
}

// ✅ Step 4: New Wrapper - Used in UploadForm (Client-safe!)
export async function handlePdfUploadAction(file: File, fileUrl: string) {
  const result = await generatePdfSummary([
    {
      serverData: {
        userId: 'manual-user-id', // optional if not needed here
        file: {
          url: fileUrl,
          name: file.name,
        },
      },
    },
  ]);

  const { data = null } = result || {};

  if (!data) return { success: false, message: 'Summary generation failed.' };

  const storeResult = await storePdfSummaryAction({
    summary: data.summary,
    fileUrl,
    title: data.title,
    fileName: file.name,
  });

  return storeResult;
}
