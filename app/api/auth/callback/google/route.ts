import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/SupabaseClient";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const getGoogleUserInfo = async (accessToken: string) => {
  oauth2Client.setCredentials({ access_token: accessToken });
  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  const { data } = await oauth2.userinfo.get();
  return data;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    if (!code) throw new Error("No code in OAuth callback");

    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens?.access_token) throw new Error("Failed to get tokens");

    const googleUser = await getGoogleUserInfo(tokens.access_token);
    if (!googleUser) throw new Error("Failed to get user info from Google");

    // check if user exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", googleUser.email)
      .single();

    let user = existingUser;

    // create if not exists
    if (!user) {
      const { data: newUser, error } = await supabase
        .from("users")
        .insert({
          email: googleUser.email,
          name: googleUser.name,
          picture: googleUser.picture,
        })
        .select()
        .single();

      if (error) throw error;
      user = newUser;
    }

    // redirect to frontend
    return NextResponse.redirect("http://localhost:3000/");
  } catch (err: any) {
    console.error("OAuth error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
