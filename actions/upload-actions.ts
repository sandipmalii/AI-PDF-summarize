'user server';

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
  if (!uploadResponse) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name:fileName },
    },
  } = uploadResponse[0];

  if(!pdfUrl){
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  try{
    const pdfText= await fetchAndExtractText(pdfUrl);
    console.log({pdfText});

    let summary;
try {
 summary = await generateSummaryFromOpenAI(pdfText);
  console.log({ summary });
} catch (error) {
  console.log(error);
  //call gemini
}

if (!summary) {
  return {
    success: false,
    message: 'Failed to generate summary',
    data: null,
  };
}

return {
  success : true,
message :'Summary generated successfully' ,
data:{
summary,
},
  };
  }
  catch(err){
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }



  // ... rest of your function logic here ...
}