import axios from 'axios';

// POST /auth/token
export const exchangeCodeForTokens = async (req, res) => {
  try {
    const { code, redirect_uri } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Cognito configuration
    const region = 'ap-south-1';
    const userPoolId = 'ap-south-1_Tc6g6RyT7';
    const clientId = '1p6pgm5gtpfc071orsrd1obues';
    const clientSecret = '1bfd1pk5am3enlmkjber7tlan2pp5iambvove47a4dncs2efovsu';
    
    // Remove underscore from userPoolId for domain construction
    const domainUserPoolId = userPoolId.replace('_', '');
    const tokenEndpoint = `https://${domainUserPoolId}.auth.${region}.amazoncognito.com/oauth2/token`;

    // Create Basic Auth header with client_id:client_secret
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    // Prepare the token exchange request
    const tokenRequestData = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      code: code,
      redirect_uri: redirect_uri || 'http://localhost:8080/callback'
    });

    console.log('Exchanging code for tokens...');
    console.log('Token endpoint:', tokenEndpoint);
    console.log('Code:', code);
    console.log('Redirect URI:', redirect_uri);

    // Make the token exchange request to Cognito
    const response = await axios.post(tokenEndpoint, tokenRequestData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`
      }
    });

    console.log('Token exchange successful');
    console.log('Response data:', response.data);

    // Return the tokens to the frontend
    res.json({
      access_token: response.data.access_token,
      id_token: response.data.id_token,
      refresh_token: response.data.refresh_token,
      token_type: response.data.token_type,
      expires_in: response.data.expires_in
    });

  } catch (error) {
    console.error('Token exchange error:', error.response?.data || error.message);
    
    if (error.response?.data) {
      return res.status(400).json({
        error: 'Token exchange failed',
        details: error.response.data
      });
    }
    
    res.status(500).json({
      error: 'Internal server error during token exchange',
      details: error.message
    });
  }
}; 