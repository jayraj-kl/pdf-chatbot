"use client";

// import { scrollToBottom, initialMessages, getSources } from "@/lib/utils";
// import { ChatLine } from "./chat-line";
// import { useChat, Message } from "ai-stream-experimental/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useEffect, useRef } from "react";
import { ChatBubble } from "./chat-bubble";
import { Message } from "ai/react";

export function Chat() {
    const messages : Message[] = [
        { role: "assistant", content: "Hello, how can I help you?", id: "1" },
        { role: "user", content: "I need help with my PDF", id: "2" },
    ];
    const source = ["I am source one", "I am source two"];
    return (
        <>
            <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
                <div className="p-6 overflow-auto">
                {messages.map(({ id, role, content }: Message, index) => (
                    <ChatBubble
                    key={id}
                    role={role}
                    content={content}
                    sources={ role === "assistant" ? source : [] }
                    />
                ))}
                </div>
                <form 
                // onSubmit={handleSubmit} 
                className="p-4 flex clear-both">
        <Input
        //   value={input}
          placeholder={"Type to chat with AI..."}
        //   onChange={handleInputChange}
          className="mr-2"
        />

        <Button type="submit" className="w-24">
          {/* {isLoading ? <Spinner /> : "Ask"} */}
          Ask
        </Button>
      </form>
            </div>
        </>
    )
}