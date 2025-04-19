// "use client";

// import React, { useRef, useState } from "react";
// import { useUploadThing } from "@/utils/uploadthing";
// import UploadFormInput from "@/components/upload/upload-form-input";
// import { z } from "zod";
// import { toast } from "sonner";
// import {
//   generatePdfSummary,
//   storePdfSummaryAction,
// } from "@/actions/upload-actions";
// import { useRouter } from "next/navigation";
// import LoadingSkeleton from "./loading-skeleton"; // ✅ fix import: it was a named import but should be default if default exported

// const schema = z.object({
//   file: z
//     .custom<File>((file) => file instanceof File, { message: "Invalid file" })
//     .refine((file) => file.size <= 20 * 1024 * 1024, {
//       message: "File size must be less than 20MB",
//     })
//     .refine((file) => file.type.startsWith("application/pdf"), {
//       message: "File must be a PDF",
//     }),
// });

// export default function UploadForm() {
//   const formRef = useRef<HTMLFormElement>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const { startUpload } = useUploadThing("pdfUploader", {
//     onClientUploadComplete: () => {
//       toast.success("✅ Uploaded successfully!");
//     },
//     onUploadError: (error) => {
//       console.error("Upload error:", error);
//       toast.error("❌ Upload failed: " + error.message);
//     },
//     onUploadBegin: ({ file }) => {
//       console.log("onUploadBegin received:", { file });
//       toast("📤 Uploading: " + file.name);
//     },
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const formData = new FormData(e.currentTarget);
//       const file = formData.get("file") as File;

//       const validated = schema.safeParse({ file });
//       if (!validated.success) {
//         toast.error(
//           validated.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
//         );
//         return;
//       }

//       toast("📁 Processing PDF", {
//         description: "Hang tight! Our AI is reading your document ✨",
//       });

//       const resp = await startUpload([file]);
//       if (!resp) {
//         toast.error("Something went wrong. Try another file.");
//         return;
//       }

//       const result = await generatePdfSummary(resp);
//       const { data = null } = result || {};

//       if (data) {
//         toast({
//           title: "💾 Saving PDF...",
//           description: "Hang tight! We are saving your summary ✨",
//         });

//         const storeResult = await storePdfSummaryAction({
//           summary: data.summary,
//           fileUrl: resp[0].serverData.file.url,
//           title: data.title,
//           fileName: file.name,
//         });

//         if (storeResult?.success && storeResult.data?.id) {
//           toast({
//             title: "✨ Summary Generated!",
//             description: "Your PDF has been successfully summarized and saved",
//           });

//           formRef.current?.reset();
//           router.push(`/summaries/${storeResult.data.id}`);
//         } else {
//           toast.error(storeResult?.message || "Failed to save summary.");
//         }
//       }
//     } catch (error) {
//       console.error("Unexpected error:", error);
//       toast.error("An unexpected error occurred.");
//       formRef.current?.reset();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center" aria-hidden="true">
//           <div className="w-full border-t border-gray-200 dark:border-gray-800" />
//         </div>
//         <div className="relative flex justify-center">
//           <span className="bg-background px-3 text-muted-foreground text-sm">
//             Upload PDF
//           </span>
//         </div>
//       </div>

//       <UploadFormInput
//         isLoading={isLoading}
//         ref={formRef}
//         onSubmit={handleSubmit}
//       />

//       {isLoading && (
//         <>
//           <div className="relative">
//             <div
//               className="absolute inset-0 flex items-center"
//               aria-hidden="true"
//             >
//               <div className="w-full border-t border-gray-200 dark:border-gray-800" />
//             </div>
//             <div className="relative flex justify-center">
//               <span className="bg-background px-3 text-muted-foreground text-sm">
//                 Processing
//               </span>
//             </div>
//           </div>
//           <LoadingSkeleton />
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useRef, useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "@/components/upload/upload-form-input";
import { z } from "zod";
import { toast } from "sonner"; // ✅ Using sonner for toasts
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton"; // ✅ Default import

// Schema for validating the uploaded file
const schema = z.object({
  file: z
    .custom<File>((file) => file instanceof File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    }),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("Upload error:", err);
      toast.error("❌ Upload Error", {
        description: err.message,
      });
    },
    onUploadBegin: (data) => {
      console.log("upload started for", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        toast.error("❌ Invalid File", {
          description:
            validatedFields.error.flatten().fieldErrors?.file?.[0] ??
            "Invalid file.",
        });
        return;
      }

      toast("📄 Uploading PDF...", {
        description: "We are uploading your PDF!",
      });

      const uploadResponse = await startUpload([file]);

      const uploadFileUrl = uploadResponse?.[0]?.serverData?.file.url;
      if (!uploadFileUrl) {
        toast.error("❌ Upload Failed", {
          description: "Please use a different file.",
        });
        return;
      }

      toast("⏳ Processing PDF...", {
        description: "Hang tight! Our AI is reading your document ✨",
      });

      const result = await generatePdfSummary([{
        serverData : {
          file : {
            url : uploadFileUrl,
            name :file.name 
          }
        }
      }]);

      

      const { data = null } = result || {};

      if (data) {
        toast("💾 Saving PDF...", {
          description: "We are saving your summary ✨",
        });

        const storeResult = await storePdfSummaryAction({
          summary: data.summary,
          fileUrl: uploadFileUrl,
          title: data.title,
          fileName: file.name,
        });

        if (storeResult?.success && storeResult.data?.id) {
          toast.success("🎉 Summary Generated!", {
            description: "Your PDF has been successfully summarized and saved.",
          });

          formRef.current?.reset();
          router.push(`/summaries/${storeResult.data.id}`);
        } else {
          toast.error("❌ Save Failed", {
            description: storeResult?.message || "Failed to save summary.",
          });
        }
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast.error("❌ Upload Failed", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>

      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />

      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}
