"use client";

import { FileText, RotateCw, Sparkles, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { ChangeEvent, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>();
  const [uploadedImage, setUploadedImage] = useState<File | undefined>();
  const [ingredients, setIngredients] = useState("");

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedImage(e.target.files[0]);
      const filePreview = URL.createObjectURL(e.target.files[0]);
      setPreview(filePreview);
      console.log(preview);
    }
  };

  const extractIngredients = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIngredients("");

    try {
      const response = await fetch("/api/text-to-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.text) {
        setIngredients(data.text);
      } else {
        alert("Failed to extract ingredients");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to extract ingredients");
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImage("");

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
    <div className="h-screen w-screen flex justify-center items-center">
      <Card>
        <div className="flex flex-col gap-6 p-5">
          <Tabs defaultValue="imageAnalysis" className="flex flex-col gap-6">
            <TabsList>
              <TabsTrigger value="imageAnalysis">Image analysis</TabsTrigger>
              <TabsTrigger value="ingredientRecognition">
                Ingredient recognition
              </TabsTrigger>
              <TabsTrigger value="imageCreator">Image creator</TabsTrigger>
            </TabsList>
            <TabsContent value="imageAnalysis" className="flex flex-col gap-6">
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
                    <Button variant={"outline"}>
                      <RotateCw className="text-foreground" />
                    </Button>
                  </div>
                  <p className="text-sm leading-5 font-normal text-muted-foreground">
                    Upload a food photo, and AI will detect the ingredients.
                  </p>
                  {uploadedImage ? (
                    preview && (
                      <img
                        src={preview}
                        alt=""
                        className=" inset-0 h-35 w-50 object-cover rounded-[6px]"
                      />
                    )
                  ) : (
                    <Input
                      id="tabs-demo-name"
                      type="file"
                      onChange={fileChangeHandler}
                    />
                  )}
                </div>
                <CardFooter className="flex justify-end px-0">
                  <Button>Generate</Button>
                </CardFooter>
              </CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <FileText />
                  <Label
                    htmlFor="tabs-demo-name"
                    className="text-xl leading-7 font-semibold"
                  >
                    Identified Ingredients
                  </Label>
                </div>
                <p className="text-sm leading-5 font-normal text-muted-foreground">
                  First, enter your text to recognize an ingredients.
                </p>
              </div>
            </TabsContent>

            {/* 2dh  */}
            <form onSubmit={extractIngredients}>
              <TabsContent
                value="ingredientRecognition"
                className="flex flex-col gap-6"
              >
                <CardContent className="grid gap-6 px-0">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Sparkles />
                        <Label
                          htmlFor="tabs-demo-name"
                          className="text-xl leading-7 font-semibold"
                        >
                          Ingredient recognition
                        </Label>
                      </div>
                      <Button variant={"outline"}>
                        <RotateCw className="text-foreground" />
                      </Button>
                    </div>
                    <p className="text-sm leading-5 font-normal text-muted-foreground">
                      Describe the food, and AI will detect the ingredients.
                    </p>

                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      id="tabs-demo-name"
                      placeholder="Орц тодорхойлох"
                    />
                  </div>
                  <CardFooter className="flex justify-end px-0">
                    <Button disabled={loading || !prompt}>
                      {" "}
                      {loading ? "Extracting..." : "Extract Ingredients"}
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
                  {ingredients ? (
                    <div className="mt-8 w-full max-w-2xl">
                      <h2 className="text-2xl font-semibold mb-4">
                        Extracted Ingredients:
                      </h2>
                      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <p className="text-lg whitespace-pre-wrap">
                          {ingredients}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm leading-5 font-normal text-muted-foreground">
                      First, enter your image to recognize an ingredients.
                    </p>
                  )}
                </div>
              </TabsContent>
            </form>

            {/* 3dh */}
            <form onSubmit={generateImage}>
              <TabsContent value="imageCreator" className="flex flex-col gap-6">
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
                      <Button variant={"outline"}>
                        <RotateCw className="text-foreground" />
                      </Button>
                    </div>
                    <p className="text-sm leading-5 font-normal text-muted-foreground">
                      What food image do you want? Describe it briefly.
                    </p>

                    <Input
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
                      {/* <Button
                        className="absolute right-2 bottom-1 z-10"
                        variant={"outline"}
                      >
                        <Trash />
                      </Button> */}
                    </div>
                  ) : (
                    <p className="text-sm leading-5 font-normal text-muted-foreground">
                      First, enter your text to generate an image.
                    </p>
                  )}
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
