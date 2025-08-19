import { NextResponse } from 'next/server';
import { supabase } from '@/lib/SupabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, message, sender, timestamp, location } = body;

    if (!userId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log(body);

    // Insert notification into Supabase
    const { error: notifError } = await supabase.from('notifications').insert([
      {
        user_id: userId,
        sender: sender || 'Unknown',
        message,
        timestamp: timestamp || new Date().toISOString(),
        location: location || null,
      },
    ]);

    if (notifError) throw notifError;

    // Call OpenRouter API
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL!,
        'X-Title': process.env.NEXT_PUBLIC_SITE_NAME!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-distill-llama-70b:free',
        messages: [
          {
            role: 'system',
            content:
              "You are a financial SMS parser. Analyze the following SMS and determine if it's a transaction. If it is, return a JSON with 'receiver' and 'amount'. If not, return an empty object.",
          },
          {
            role: 'user',
            content: `Analyze this SMS for transaction details: ${message}`,
          },
        ],
      }),
    });

    const responseData = await openRouterResponse.json();
    const responseContent = responseData.choices?.[0]?.message?.content;
    console.log('OpenRouter Response:', responseContent);

    if (responseContent) {
      try {
        const jsonMatch = responseContent.match(/\{.*\}/s);
        if (jsonMatch) {
          const transactionDetails = JSON.parse(jsonMatch[0]);

          if (transactionDetails.amount) {
            await supabase.from('transactions').insert([
              {
                user_id: userId,
                type: 'SMS',
                amount: transactionDetails.amount,
                recipient: transactionDetails.receiver || 'Unknown',
                raw_message: message,
                timestamp: timestamp || new Date().toISOString(),
                location,
              },
            ]);
          }
        }
      } catch (parseError) {
        console.error('Error parsing transaction details:', parseError);
      }
    }

    return NextResponse.json({ message: 'SMS processed and saved successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error processing SMS:', error);
    return NextResponse.json({ error: 'Internal server error', detail: error.message }, { status: 500 });
  }
}
