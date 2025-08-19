// import jwt from 'jsonwebtoken';
// import { connectMongoDB } from '../../../lib/utils';
// import User from '../../../models/usermodel';
// import { NextRequest, NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';

// export async function GET(request: NextRequest) {
//   // Check NextAuth session first
//   const session = await getServerSession(request, NextResponse, authOptions);

//   let userId;

//   if (session && session.user) {
//     userId = session.user.id;
//   } else {
//     // Fall back to custom JWT
//     const { token } = request.cookies;

//     if (!token)
//       return NextResponse.json({ error: 'No token provided' }, { status: 401 });

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//       userId = decoded.userId;
//     } catch (error) {
//       return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//     }
//   }

//   if (!userId)
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   await connectMongoDB();
//   const user = await User.findById(userId);

//   if (!user)
//     return NextResponse.json({ error: 'User not found' }, { status: 404 });

//   return NextResponse.json({ user });
// }
