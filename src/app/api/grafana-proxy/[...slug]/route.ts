import { NextRequest, NextResponse } from 'next/server';

const GRAFANA_ORIGIN = 'https://mimir.incode.daiconro.eu';

export async function GET(req: NextRequest, { params }: { params: { slug?: string[] } }) {
  const slug = params.slug || [];
  const assetPath = '/' + slug.join('/'); // e.g., /public/build/file.js
  const assetUrl = `${GRAFANA_ORIGIN}${assetPath}`;

  try {
    const assetRes = await fetch(assetUrl);
    const contentType = assetRes.headers.get('content-type') || 'application/octet-stream';
    const buffer = await assetRes.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    console.error('Asset proxy error:', err);
    return new NextResponse('Failed to proxy asset', { status: 500 });
  }
}
