import { pipeline, env } from '@xenova/transformers';

env.allowLocalModels = false;

async function test() {
    try {
        console.log("Starting model download...");
        const generator = await pipeline('text-generation', 'Xenova/TinyLlama-1.1B-Chat-v1.0');
        console.log("Model loaded successfully!");
        const out = await generator("hello", { max_new_tokens: 10 });
        console.log(out);
    } catch (e) {
        console.error("FAIL:", e);
    }
}
test();
