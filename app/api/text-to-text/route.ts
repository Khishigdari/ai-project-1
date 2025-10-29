import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN || "");

export const POST = async (req: NextRequest) => {
  try {
    const { descPrompt } = await req.json();

    if (!descPrompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await hf.chatCompletion({
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [
        {
          role: "user",
          content: `Extract only the ingredients from this food description and return them as a simple comma-separated list without any explanation by listing them down using bullet points.
Food description: ${descPrompt}
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
