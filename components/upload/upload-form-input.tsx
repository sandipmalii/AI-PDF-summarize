'use client';

import { Button } from '@/components/ui/button';
import React from 'react'; // Import React if not already imported
import {Input} from '@/components/ui/input';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="flex justify-end items-center gap-1.5">
      <Input
       id="file"
        name="file" 
        type="file" 
        accept="application/pdf" 
      required
      className=' '
      />
      <Button>Upload your PDF</Button>
      </div>
    </form>
  );
}