"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { TabsContent } from "@radix-ui/react-tabs";
import { FileText, RotateCw, Sparkles } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

export const ImageToText = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedImage(e.target.files[0]);
      const filePreview = URL.createObjectURL(e.target.files[0]);
      setPreview(filePreview);
      console.log(preview);
    }
  };

  const defineImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDescription("");

    const formData = new FormData();
    if (uploadedImage) {
      formData.append("file", uploadedImage);
    } else {
      alert("Please upload an image first!");
      return;
    }
    try {
      const response = await fetch("/api/image-to-text", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.text) {
        setDescription(data.text);
      } else {
        alert("Failed to generate chat assistant");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={defineImage}>
        <TabsContent value="imageAnalysis" className="flex flex-col gap-6 mt-6">
          <CardContent className="grid gap-6 px-0">
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Sparkles />
                  <Label
                    htmlFor="tabs-demo-name"
                    className="text-xl leading-7 font-semibold"
                  >
                    Image analysis
                  </Label>
                </div>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setUploadedImage(null);
                    setPreview(null);
                    setDescription("");
                  }}
                >
                  <RotateCw className="text-foreground" />
                </Button>
              </div>
              <p className="text-sm leading-5 font-normal text-muted-foreground">
                Upload a food photo, and AI will detect the ingredients.
              </p>
              {uploadedImage && preview ? (
                <img
                  src={preview}
                  alt=""
                  className=" inset-0 h-35 w-50 object-cover rounded-[6px]"
                />
              ) : (
                <Input
                  id="tabs-demo-name"
                  type="file"
                  onChange={fileChangeHandler}
                />
              )}
            </div>
            <CardFooter className="flex justify-end px-0">
              <Button disabled={loading || !uploadedImage}>
                {loading ? "Defining..." : "Define Image"}
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
                Here is the summary
              </Label>
            </div>
            {description ? (
              <div className="mt-8 w-full max-w-2xl">
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                  <p className="text-lg whitespace-pre-wrap">{description}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-5 font-normal text-muted-foreground">
                First, enter your text to recognize an ingredients.
              </p>
            )}
          </div>
        </TabsContent>
      </form>
    </div>
  );
};
