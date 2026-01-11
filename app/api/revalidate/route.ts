import { verifyWebhookSignature } from '@hygraph/utils';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const signature = req.headers.get('gcms-signature');
  const secret = process.env.HYGRAPH_WEBHOOK_SECRET;

  if (!secret) {
    console.error('[Webhook] HYGRAPH_WEBHOOK_SECRET is not defined');
    return NextResponse.json({ message: 'Configuration error' }, { status: 500 });
  }

  // Get raw body text and parse it
  const bodyText = await req.text();
  let body;
  try {
    body = JSON.parse(bodyText);
  } catch (e) {
    console.error('[Webhook] Failed to parse body:', e);
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  const sanitizedSecret = secret.trim().replace(/^["'](.+)["']$/, '$1');

  if (signature) {
    const isValid = verifyWebhookSignature({
      body,
      signature,
      secret: sanitizedSecret,
    });

    if (!isValid) {
      console.warn('[Webhook] Signature mismatch via @hygraph/utils');
      return NextResponse.json(
        {
          message: 'Invalid signature',
          debug:
            process.env.NODE_ENV === 'development'
              ? {
                  hasSignature: !!signature,
                  hasSecret: !!sanitizedSecret,
                  bodyType: typeof body,
                }
              : undefined,
        },
        { status: 401 },
      );
    }
  } else {
    // Fallback: Check if secret is passed via query param (ONLY allow in development)
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ message: 'Signature required in production' }, { status: 401 });
    }

    const urlSecret = req.nextUrl.searchParams.get('secret');
    if (urlSecret !== sanitizedSecret) {
      return NextResponse.json({ message: 'Missing or invalid signature' }, { status: 401 });
    }
  }

  try {
    const model = body.data?.__typename;
    console.log(`[Webhook] Revalidating triggered by ${model || 'unknown model'}`);

    if (model === 'Product' || model === 'Asset') {
      revalidateTag('products', { expire: 0 });
    } else {
      // Fallback: revalidate layout
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      model,
    });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
