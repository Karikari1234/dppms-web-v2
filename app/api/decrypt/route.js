import { NextResponse } from 'next/server';
import crypto from 'crypto';

const secretKey = process.env.ENCRYPTION_KEY;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const encryptedId = searchParams.get('encryptedId');
  
  try {
    const [ivHex, encryptedTextHex] = encryptedId.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedTextHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return NextResponse.json({ decryptedId: decrypted.toString() });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid encrypted ID' }, { status: 400 });
  }
}