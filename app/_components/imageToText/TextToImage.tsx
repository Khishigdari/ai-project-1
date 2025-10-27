// "use client";
// import { Button } from "@/components/ui/button";
// import { CardContent, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@radix-ui/react-label";
// import { FileText, RotateCw, Sparkles } from "lucide-react";
// import React, { ChangeEvent, useState } from "react";
// const TextToImage = () => {
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [prompt, setPrompt] = useState("");

//   return (
//     <div>
//       <CardContent className="grid gap-6 px-0">
//         <div className="grid gap-2">
//           <div className="flex justify-between items-center">
//             <div className="flex gap-2 items-center">
//               <Sparkles />
//               <Label
//                 htmlFor="tabs-demo-name"
//                 className="text-xl leading-7 font-semibold"
//               >
//                 Food image creator
//               </Label>
//             </div>
//             <Button variant={"outline"}>
//               <RotateCw className="text-foreground" />
//             </Button>
//           </div>
//           <p className="text-sm leading-5 font-normal text-muted-foreground">
//             What food image do you want? Describe it briefly.
//           </p>

//           <Input
//             id="tabs-demo-name"
//             placeholder="Хоолны тайлбар"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//           />
//         </div>
//         <CardFooter className="flex justify-end px-0">
//           <Button disabled={loading || !prompt}>
//             {loading ? "Generating..." : "Generate"}
//           </Button>
//         </CardFooter>
//       </CardContent>
//       <div className="flex flex-col gap-2">
//         <div className="flex gap-2 items-center">
//           <FileText />
//           <Label
//             htmlFor="tabs-demo-name"
//             className="text-xl leading-7 font-semibold"
//           >
//             Result
//           </Label>
//         </div>
//         {image ? (
//           <div className="mt-8 w-full max-w-2xl ">
//             <img
//               src={image}
//               alt="Generated"
//               className="w-full rounded-lg shadow-lg"
//             />
//             {/* <Button
//                         className="absolute right-2 bottom-1 z-10"
//                         variant={"outline"}
//                       >
//                         <Trash />
//                       </Button> */}
//           </div>
//         ) : (
//           <p className="text-sm leading-5 font-normal text-muted-foreground">
//             First, enter your text to generate an image.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TextToImage;
