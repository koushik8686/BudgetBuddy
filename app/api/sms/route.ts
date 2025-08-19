import { NextResponse } from 'next/server';
import { supabase } from '@/lib/SupabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, message, sender, timestamp, location } = body;
    console.log("📩 Incoming SMS Payload:", body);

    // 🔹 Call OpenRouter API
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "MyApp",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-distill-llama-70b:free",
        messages: [
          {
            role: "system",
            content: `You are a financial SMS parser. 
              Return ONLY valid JSON. No explanations, no markdown. 
              If it's a transaction, return:
              {
                "receiver": "...",
                "amount": "...",
                "category": "food | travel | personal | shopping | bills | other",
                "bank": "..."
              }
              If not, return {}.`,
          },
          {
            role: "user",
            content: `Analyze this SMS for transaction details: ${message}`,
          },
        ],
      }),
    });

    const responseData = await openRouterResponse.json();
    const responseContent = responseData?.choices?.[0]?.message?.content || "";
    console.log("🤖 OpenRouter Response:", responseContent);

    // 🧹 Extract JSON safely
    let transactionDetails: any = {};
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      try {
        transactionDetails = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error("❌ JSON Parse Error:", parseError);
      }
    }

    // ✅ Save only if valid transaction detected
    if (transactionDetails?.amount) {
      const { error: dbError } = await supabase.from("transactions").insert([
        {
          type: "SMS",
          amount: transactionDetails.amount,
          recipient: transactionDetails.receiver || "Unknown",
          category: transactionDetails.category || "other",
          bank: transactionDetails.bank || "Unknown",
          raw_message: message,
          sender: sender || "Unknown",
          timestamp: timestamp || new Date().toISOString(),
          location: location || null,
        },
      ]);

      if (dbError) {
        console.error("❌ Supabase Insert Error:", dbError);
        return NextResponse.json(
          { error: "Failed to save transaction", detail: dbError.message },
          { status: 500 }
        );
      }

      console.log("✅ Transaction saved:", transactionDetails);
    } else {
      console.log("ℹ️ No valid transaction found, skipping DB insert.");
    }

    return NextResponse.json(
      { message: "SMS processed successfully", transaction: transactionDetails },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error processing SMS:", error);
    return NextResponse.json(
      { error: "Internal server error", detail: error.message },
      { status: 500 }
    );
  }
}
