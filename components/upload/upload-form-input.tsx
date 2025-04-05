'use client';

import { Button } from '@/components/ui/button';
import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

// ✅ Correct implementation with forwardRef
const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit }, ref) => {
    return (
      <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-1.5">
          <Input
            id="file"
            name="file"
            type="file"
            accept="application/pdf"
            required
            className=""
          />
          <Button type="submit">Upload your PDF</Button>
        </div>
      </form>
    );
  }
);

// ✅ Required for forwardRef to work correctly
UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;
