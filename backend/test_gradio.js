import { client } from "@gradio/client";

async function testGradio() {
    try {
        console.log("Connecting to Gradio Space...");
        const app = await client("Qwen/Qwen1.5-7B-Chat");
        console.log("Connected! Sending message...");
        
        // This Gradio space expects (text, history, system)
        const result = await app.predict(1, [
            "I'm feeling very sad today.", // text
            [], // history
            "You are a compassionate therapist." // system
        ]);
        console.log("Result:", result.data);
    } catch (e) {
        console.error("Gradio failed:", e);
    }
}
testGradio();
