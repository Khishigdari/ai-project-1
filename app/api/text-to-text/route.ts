import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN || "");

export const POST = async (req: NextRequest) => {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt uis required" },
        { status: 400 }
      );
    }

    const response = await hf.chatCompletion({
      model: "black-forest-labs/FLUX.1-schnell",
      messages: [
        {
          role: "user",
          content: `Extract only the ingredients from this food description and return them as a simple comma-separated list without any explanation.
Food description: ${prompt}
Ingredients:`,
        },
      ],
    });

    const generatedText = response.choices[0]?.message?.content || "";

    return NextResponse.json({
      text: generatedText.trim(),
    });
  } catch (error) {
    console.log("Error generating text:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
};
