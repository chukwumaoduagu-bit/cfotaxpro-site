// Netlify Function handler for all /api/* routes
exports.handler = async (event, context) => {
  const path = event.path.replace('/.netlify/functions/api', '');

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  try {
    // Route handling
    let response;

    switch (path) {
      case '/leads':
        response = { leads: [] };
        break;
      case '/system-status':
        response = { status: 'ok', timestamp: new Date().toISOString() };
        break;
      case '/stats':
        response = { stats: { total: 0, active: 0 } };
        break;
      case '/config':
        response = { config: { siteName: 'CFO TAX PRO LLC' } };
        break;
      case '/emails':
        response = { emails: [] };
        break;
      case '/autopilot':
        response = { enabled: true, status: 'active' };
        break;
      default:
        // Pass through to your server.ts logic if needed
        response = { message: 'API endpoint', path: path };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
