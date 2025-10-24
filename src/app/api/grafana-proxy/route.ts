import { NextRequest, NextResponse } from 'next/server';

const GRAFANA_ORIGIN = 'https://mimir.incode.daiconro.eu';
const DASHBOARD_PATH = '/public-dashboards/2047415283b7437ab86e4ca1945ae634?theme=light';

export async function GET(req: NextRequest) {
  const targetUrl = `${GRAFANA_ORIGIN}${DASHBOARD_PATH}`;

  try {
    const response = await fetch(targetUrl);
    let html = await response.text();

    // Rewrite asset URLs (src="/xyz") → (src="/api/grafana-proxy/xyz")
    html = html.replace(/(href|src)="(\/[^"]+)"/g, (_match, attr, path) => {
      return `${attr}="/api/grafana-proxy${path}"`;
    });

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Security-Policy': "frame-ancestors *",
      },
    });
  } catch (err) {
    console.error('Failed to fetch Grafana HTML:', err);
    return new NextResponse('Failed to load Grafana dashboard', { status: 500 });
  }
}
