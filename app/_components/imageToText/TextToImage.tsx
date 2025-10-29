"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { TabsContent } from "@radix-ui/react-tabs";
import { FileText, RotateCw, Sparkles } from "lucide-react";
import React, { useState } from "react";
export const TextToImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImage(null);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.image) {
        setImage(data.image);
      } else {
        alert("Failed to generate image");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={generateImage}>
        <TabsContent value="imageCreator" className="flex flex-col gap-6 mt-6">
          <CardContent className="grid gap-6 px-0">
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Sparkles />
                  <Label
                    htmlFor="tabs-demo-name"
                    className="text-xl leading-7 font-semibold"
                  >
                    Food image creator
                  </Label>
                </div>
                <Button
                  variant={"outline"}
                  // onClick={() => {
                  //   setPrompt("");
                  //   setImage(null);
                  // }}
                >
                  <RotateCw className="text-foreground" />
                </Button>
              </div>
              <p className="text-sm leading-5 font-normal text-muted-foreground">
                What food image do you want? Describe it briefly.
              </p>

              <textarea
                id="tabs-demo-name"
                placeholder="Хоолны тайлбар"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <CardFooter className="flex justify-end px-0">
              <Button disabled={loading || !prompt}>
                {loading ? "Generating..." : "Generate"}
              </Button>
            </CardFooter>
          </CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <FileText />
              <Label
                htmlFor="tabs-demo-name"
                className="text-xl leading-7 font-semibold"
              >
                Result
              </Label>
            </div>
            {image ? (
              <div className="mt-8 w-full max-w-2xl ">
                <img
                  src={image}
                  alt="Generated"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <p className="text-sm leading-5 font-normal text-muted-foreground">
                First, enter your text to generate an image.
              </p>
            )}
          </div>
        </TabsContent>
      </form>
    </div>
  );
};
