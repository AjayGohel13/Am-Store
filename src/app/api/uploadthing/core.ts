import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 

const handleAuth = () => {
  const {userId} = auth()

  if(!userId) throw new Error("Error in file uploading")
  return {userId}
}

 
export const ourFileRouter = {
    productImage:f({image:{maxFileSize:"4MB",maxFileCount:1}})
        .middleware(()=> handleAuth())
        .onUploadComplete(()=>{}),

    productAttachment:f(["video","image","text","pdf","audio"])
        .middleware(()=>handleAuth())
        .onUploadComplete(()=>{}),
    productVideo:f({video:{maxFileSize:"1024GB",maxFileCount:1}})
        .middleware(()=>handleAuth())
        .onUploadComplete(()=>{}),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;