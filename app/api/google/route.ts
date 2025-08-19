import { NextResponse , NextRequest } from "next/server";
import { google } from "googleapis";
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  export async function GET() {
    try {
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["openid", "email", "profile"],
      });
  
      return NextResponse.redirect(authUrl);
    } catch (error) {
      console.error("❌ Google OAuth Error:", error);
      return NextResponse.json({ error: "Failed to generate Google OAuth URL" }, { status: 500 });
    }
  }