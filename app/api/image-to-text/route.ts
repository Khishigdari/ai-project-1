// import { InferenceClient } from "@huggingface/inference";
// import { NextRequest, NextResponse } from "next/server";

// const hf = new InferenceClient(process.env.HF_TOKEN || "");

// export const POST = async (req: NextRequest) => {
//   try {
//     const { uploadedImage } = await req.json();

//     if (!uploadedImage) {
//       return NextResponse.json(
//         { error: "Prompt uis required" },
//         { status: 400 }
//       );
//     }

//     const image = await hf.imageToText({
//       model: "Salesforce/blip-image-captioning-base",
//       data: uploadedImage,
//     });

//     return NextResponse.json({ caption: image.generated_text });

//     // const buffer = await image.arrayBuffer();
//     // const base64 = Buffer.from(buffer).toString("base64");

//     // return NextResponse.json({
//     //   image: `data:image/png;base64,${base64}`,
//     // });
//   } catch (error) {
//     console.log("Error generating image:", error);
//     return NextResponse.json(
//       { error: "Failed to generate image" },
//       { status: 500 }
//     );
//   }
// };

import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HF_TOKEN || "");

export const POST = async (req: NextRequest) => {
  try {
    // Read form data (supports file upload)
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file uploaded" },
        { status: 400 }
      );
    }

    // Run image captioning
    const result = await hf.imageToText({
      model: "Salesforce/blip-image-captioning-base",
      data: file, // File, Blob, or URL
    });

    return NextResponse.json({ caption: result.generated_text });
  } catch (error) {
    console.error("Error generating caption:", error);
    return NextResponse.json(
      { error: "Failed to generate caption" },
      { status: 500 }
    );
  }
};
