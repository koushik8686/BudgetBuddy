async function parseSmsWithOpenRouter(message) {
  const smsMessage = message;

  const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY || "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"}`, // fallback for local testing
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "MyApp",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "system",
          content:
            "You are a financial SMS parser. Return ONLY valid JSON. No explanations, no markdown, no extra text. If it's a transaction, return {\"receiver\": \"...\", \"amount\": \"...\"}. If not, return {}.",
        },
        {
          role: "user",
          content: smsMessage,
        },
      ],
    }),
  });

  const responseData = await openRouterResponse.json();

  const responseContent = responseData?.choices?.[0]?.message?.content || "{}";

  let cleanContent = responseContent.trim();

  // 🧹 Remove ```json ... ``` wrappers if present
  if (cleanContent.startsWith("```")) {
    cleanContent = cleanContent.replace(/```json|```/g, "").trim();
  }

  try {
    return JSON.parse(cleanContent); // ✅ Guaranteed JSON
  } catch {
    console.warn("⚠️ Model returned invalid JSON:", responseContent);
    return {}; // fallback
  }
}

// 🔹 Example test run
parseSmsWithOpenRouter("INR 500 sent to Rahul via UPI").then(result => {
  console.log("✅ Parsed SMS:", result);
});

// Debugging env vars
console.log("🔑 API KEY loaded?", !!process.env.OPENROUTER_API_KEY);
console.log("🌍 SITE URL:", process.env.NEXT_PUBLIC_SITE_URL);
console.log("📛 SITE NAME:", process.env.NEXT_PUBLIC_SITE_NAME);
