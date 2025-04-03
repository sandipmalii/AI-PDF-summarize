'use client';

import UploadFormInput from '@/components/upload/upload-form-input';
import React from 'react';

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    // validating the fields
    // schema with zod
    // upload the file to uploadthing
    // parse the pdf using lang chain
    // summarize the pdf using AI
    // save the summary to the database
    // redirect to the [id] summary page
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}