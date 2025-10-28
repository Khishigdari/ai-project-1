"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { TabsContent } from "@radix-ui/react-tabs";
import { FileText, RotateCw, Sparkles } from "lucide-react";
import React, { useState } from "react";

export const TextToText = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [descPrompt, setDescPrompt] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");

  //extracting ingredients

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
        body: JSON.stringify({ descPrompt }),
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

  return (
    <div>
      <form onSubmit={extractIngredients}>
        <TabsContent
          value="ingredientRecognition"
          className="flex flex-col gap-6 mt-6"
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
                <Button
                  variant={"outline"}
                  // onClick={() => {
                  //   setDescPrompt("");
                  //   setIngredients("");
                  // }}
                >
                  <RotateCw className="text-foreground" />
                </Button>
              </div>
              <p className="text-sm leading-5 font-normal text-muted-foreground">
                Describe the food, and AI will detect the ingredients.
              </p>

              <textarea
                value={descPrompt}
                onChange={(e) => setDescPrompt(e.target.value)}
                id="tabs-demo-name"
                placeholder="Орц тодорхойлох"
              />
            </div>
            <CardFooter className="flex justify-end px-0">
              <Button disabled={loading || !descPrompt}>
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
                  <p className="text-lg whitespace-pre-wrap">{ingredients}</p>
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
    </div>
  );
};
