import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatBot } from "./_components/ChatBot";
import { TextToImage } from "./_components/imageToText/TextToImage";
import { TextToText } from "./_components/imageToText/TextToText";
import { ImageToText } from "./_components/imageToText/ImageToText";

export default function Home() {
  return (
    <div className="h-screen w-screen relative">
      <div className="h-screen w-screen flex justify-center items-center">
        <Card>
          <div className="p-5">
            <Tabs defaultValue="imageAnalysis" className="flex flex-col gap-0">
              <TabsList>
                <TabsTrigger value="imageAnalysis">Image analysis</TabsTrigger>
                <TabsTrigger value="ingredientRecognition">
                  Ingredient recognition
                </TabsTrigger>
                <TabsTrigger value="imageCreator">Image creator</TabsTrigger>
              </TabsList>
              <ImageToText />
              <TextToText />
              <TextToImage />
            </Tabs>
          </div>
        </Card>
        <ChatBot />
      </div>
    </div>
  );
}
