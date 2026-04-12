async function testHF() {
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: "Hi, I am sad today.", parameters: { max_new_tokens: 50 } })
        });
        const data = await response.json();
        console.log("Response:", data);
    } catch (e) {
        console.log("Failed", e);
    }
}
testHF();
