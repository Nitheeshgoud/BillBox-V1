import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const region = 'ap-south-1';
const userPoolId = 'ap-south-1_Tc6g6RyT7';
const issuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;

const client = jwksClient({
  jwksUri: `${issuer}/.well-known/jwks.json`
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

export function authenticateCognito(req, res, next) {
  try {
    console.log('Authenticating request...');
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log('No authorization header');
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token received, verifying...');
    
    jwt.verify(token, getKey, {
      issuer,
      algorithms: ['RS256']
    }, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err.message);
        return res.status(401).json({ error: 'Invalid token', details: err.message });
      }
      console.log('Token verified successfully');
      console.log('Decoded user:', decoded);
      req.cognitoUser = decoded;
      next();
    });
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({ error: 'Authentication error', details: error.message });
  }
} 