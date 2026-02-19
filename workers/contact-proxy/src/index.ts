interface Env {
  WEB3FORMS_ACCESS_KEY: string;
  ALLOWED_ORIGINS?: string;
}

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  services?: string[];
  message?: string;
  honeypot?: string;
};

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeField = (value: unknown, maxLength: number) => {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n?/g, '\n').trim().slice(0, maxLength);
};

const sanitizeServiceList = (services: unknown) => {
  if (!Array.isArray(services)) return [] as string[];
  return services
    .filter((item) => typeof item === 'string')
    .map((item) => sanitizeField(item, 64))
    .filter((item) => item.length > 0)
    .slice(0, 20);
};

const parseAllowedOrigins = (raw: string | undefined) =>
  (raw || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const isAllowedOrigin = (origin: string | null, allowlist: string[]) => {
  if (!origin) return false;
  return allowlist.includes(origin);
};

const buildCorsHeaders = (origin: string, allowCredentials = false) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
  ...(allowCredentials ? { 'Access-Control-Allow-Credentials': 'true' } : {}),
  Vary: 'Origin',
});

const buildCommonHeaders = () => ({
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
});

const json = (body: Record<string, unknown>, status: number, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowlist = parseAllowedOrigins(env.ALLOWED_ORIGINS);
    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') {
      if (!isAllowedOrigin(origin, allowlist)) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, {
        status: 204,
        headers: {
          ...buildCorsHeaders(origin as string),
          ...buildCommonHeaders(),
        },
      });
    }

    if (request.method !== 'POST') {
      return json(
        { success: false, message: 'Method Not Allowed' },
        405,
        buildCommonHeaders()
      );
    }

    if (!isAllowedOrigin(origin, allowlist)) {
      return json(
        { success: false, message: 'Forbidden' },
        403,
        buildCommonHeaders()
      );
    }

    if (!env.WEB3FORMS_ACCESS_KEY) {
      return json(
        { success: false, message: 'Server Misconfigured' },
        500,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(origin as string),
        }
      );
    }

    let payload: ContactPayload;
    try {
      payload = (await request.json()) as ContactPayload;
    } catch {
      return json(
        { success: false, message: 'Invalid JSON' },
        400,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(origin as string),
        }
      );
    }

    if (sanitizeField(payload.honeypot, 256) !== '') {
      return json(
        { success: true },
        200,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(origin as string),
        }
      );
    }

    const safeName = sanitizeField(payload.name, 100);
    const safeCompany = sanitizeField(payload.company, 120);
    const safeEmail = sanitizeField(payload.email, 254).toLowerCase();
    const safePhone = sanitizeField(payload.phone, 32);
    const safeInquiryType = sanitizeField(payload.inquiryType, 100);
    const safeMessage = sanitizeField(payload.message, 3000);
    const safeServices = sanitizeServiceList(payload.services);

    if (!safeName || !safeEmail || !safeInquiryType || !safeMessage) {
      return json(
        { success: false, message: 'Required fields are missing' },
        400,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(origin as string),
        }
      );
    }

    if (!EMAIL_PATTERN.test(safeEmail)) {
      return json(
        { success: false, message: 'Invalid email' },
        400,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(origin as string),
        }
      );
    }

    const submitData = new FormData();
    submitData.append('access_key', env.WEB3FORMS_ACCESS_KEY);
    submitData.append('subject', `【Peace Biz】お問い合わせ: ${safeInquiryType}`);
    submitData.append('name', safeName);
    submitData.append('email', safeEmail);
    if (safeCompany) submitData.append('company', safeCompany);
    if (safePhone) submitData.append('phone', safePhone);
    submitData.append('inquiry_type', safeInquiryType);
    if (safeServices.length > 0) {
      submitData.append('services', safeServices.join(', '));
    }
    submitData.append('message', safeMessage);
    submitData.append('botcheck', '');

    const upstream = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      body: submitData,
    });

    if (!upstream.ok) {
      return json(
        { success: false, message: 'Provider request failed' },
        502,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(origin as string),
        }
      );
    }

    let upstreamResult: { success?: boolean } = {};
    try {
      upstreamResult = (await upstream.json()) as { success?: boolean };
    } catch {
      // Ignore parse failure and treat as error.
    }

    if (!upstreamResult.success) {
      return json(
        { success: false, message: 'Submission failed' },
        400,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(origin as string),
        }
      );
    }

    return json(
      { success: true },
      200,
      {
        ...buildCommonHeaders(),
        ...buildCorsHeaders(origin as string),
      }
    );
  },
};

