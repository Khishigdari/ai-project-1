"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ChatBot = () => {
  const [chat, setChat] = useState<string>("");
  const [chatResponse, setChatResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  //chat assistant

  const chatBotAssistant = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setChatResponse("");

    try {
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat }),
      });

      const data = await response.json();

      if (data.text) {
        setChatResponse(data.text);
      } else {
        alert("Failed to generate chat assistant");
      }
    } finally {
      setLoading(false);
    }
  };

  const chatHandlerOpen = () => {
    setOpen(true);
  };

  const chatHandlerClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex justify-end mr-9 mb-9">
      {/* <form onSubmit={chatBotAssistant}> */}
      <DropdownMenu open={open}>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full bg-primary py-4 px-4"
            type="button"
            onClick={chatHandlerOpen}
          >
            <MessageCircle className="text-primary-foreground h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-95">
          <div className="flex justify-between items-center">
            <DropdownMenuLabel>Chat assistant</DropdownMenuLabel>
            <Button variant={"ghost"} onClick={chatHandlerClose}>
              <X />
            </Button>
          </div>

          <DropdownMenuItem className="py-4 px-6 flex flex-col gap-2">
            {chat ? (
              <div className="bg-secondary opacity-80 rounded-xl py-2 px-4 flex justify-center">
                <p className="text-sm leading-5 font-normal text-black">
                  {chat}
                </p>
              </div>
            ) : (
              ""
            )}
            {chatResponse ? (
              <div className="bg-primary opacity-90 rounded-xl py-2 px-4 flex justify-end">
                <p className="text-sm leading-5 font-normal text-white">
                  {chatResponse}
                </p>
              </div>
            ) : (
              ""
            )}
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <Input
              placeholder="type your message..."
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />{" "}
            <Button
              disabled={loading || !chat}
              onClick={chatBotAssistant}
              className="rounded-full px-4 py-2"
            >
              {" "}
              {loading ? "..." : <Send className="text-white" />}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* </form> */}
    </div>
  );
};
