// 'use client';

// import UploadFormInput from '@/components/upload/upload-form-input';
// import React from 'react';
// import {z} from 'zod';


// const schema = z.object({
//   file: z
//     .instanceof(File, { message: 'Invalid file' })
//     .refine(
//       (file) => file.size <= 20 * 1024 * 1024,
//       'File size must be less than 20MB'
//     )
//     .refine(
//       (file) => file.type.startsWith('application/pdf'),
//       'File must be a PDF'
//     ),
// });

// export default function UploadForm() {

//   const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
//     onClientUploadComplete: () => {
//       console.log("uploaded successfully!");
//     },
//     onUploadError: (err) => {
//        console.error("error occurred while uploading",err);
//     },
//     onUploadBegin: ({ file }) => {
//       console.log("upload has begun for", file);
//     },
//   });

//   const handleSubmit =   async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log('submitted');
//     const formData = new FormData(e.currentTarget);
//     const file = formData.get('file') as File;

//     // validating the fields
// const validatedFields = schema.safeParse({ file });

// if (!validatedFields.success) {
//   console.log(
//     validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file'
//   );
//   return;
// }



//     // schema with zod
//     // upload the file to uploadthing
//     const resp= await startUpload([file]);
//     if(!resp){
//       return;
//     }

//     // parse the pdf using lang chain
//     // summarize the pdf using AI
//     // save the summary to the database
//     // redirect to the [id] summary page
//   };

//   return (
//     <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
//       <UploadFormInput onSubmit={handleSubmit} />
//     </div>
//   );
// }

'use client';

import React, { useRef } from 'react';
import { useUploadThing } from '@/utils/uploadthing';
import UploadFormInput from '@/components/upload/upload-form-input';
import { z } from 'zod';
import { toast } from 'sonner'; // ✅ Sonner toast
import { generatePdfSummary } from '@/actions/upload-actions';

// ✅ Zod validation schema
const schema = z.object({
  file: z
    .custom<File>((file) => file instanceof File, { message: 'Invalid file' })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: 'File size must be less than 20MB',
    })
    .refine((file) => file.type.startsWith('application/pdf'), {
      message: 'File must be a PDF',
    }),
});

export default function UploadForm() {
const {toast} = useToast();
const fromRef= useRef<HTMLFormElement>(null);

  const { startUpload } = useUploadThing('pdfUploader', {
    onClientUploadComplete: () => {
      toast.success('✅ Uploaded successfully!');
    },
    onUploadError: (error) => {
      console.error('Error occurred while uploading', error);
      toast.error('❌ Upload error: ' + error.message);
    },
    onUploadBegin: ({ file }) => {
      toast('📤 Uploading: ' + file.name); // ✅ Just use toast()
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

try{
  const formData = new FormData(e.currentTarget);
  const file = formData.get('file') as File;

  const validated = schema.safeParse({ file });

  if (!validated.success) {
    toast.error(
      validated.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file'
    );
    return;
  }

  toast('📁 Processing PDF', {
    description: 'Hang tight! Our AI is reading your document ✨',
  });

  const resp = await startUpload([file]);
  if (!resp) {
    toast.error('Something went wrong. Please try a different file.');
    return;
  }

   // parse the pdf using lang chain
   //parse the pdf using lang chain
  const result = await generatePdfSummary(resp);

const { data = null, message = null } = result || {};

if (data) {
toast({
  title: '📁Saving PDF...',
  description: 'Hang tight! We are saving your summary! ✨',
});
fromRef.current?.reset();
// if (data.summary) {
//save the summary to the database
// }
}
//summarize the pdf using AI
//redirect to the [id] summary page

};

}
catch(error){
  console.error('Error occurred while uploading', error);
  fromRef.current?.reset();
}

  

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput ref={formRef} onSubmit={handleSubmit} />
    </div>
  );
}