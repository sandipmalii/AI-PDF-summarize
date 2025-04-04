// import { currentUser } from "@clerk/nextjs/server";
// import { UploadThingError } from "uploadthing/server";
// import { createUploadthing, type FileRouter } from "uploadthing/next";

// const f = createUploadthing();

// export const ourFileRouter = {
//   pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
//     .middleware(async () => {
//       // Get user info
//       const user = await currentUser();

//       if (!user) {
//         throw new UploadThingError("Unauthorized");
//       }

//       return { userId: user.id };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {

//       console.log("Upload completed for user ID:", metadata.userId);
//       console.log("File URL:", file.url);

//       return { userId: metadata.userId, file };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
 

import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async () => {
      const user = await currentUser();

      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: user.id };
    })
    .onUploadComplete(
      async ({ metadata, file }: { metadata: { userId: string }; file: { url: string } }) => {
        console.log("Upload completed for user ID:", metadata.userId);
        console.log("File URL:", file.url);

        return { userId: metadata.userId, file };
      }
    ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
