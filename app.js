const express = require('express');
const app = express();
const { port } = require('./config');
const jwt = require('jsonwebtoken');

const test = require('./src/routes/test/test');
const usersRoute = require('./src/routes/usersRoute/usersRoute');

app.get('/', (req, res) => {
    console.log("Root connection reached.");
    res.json({'message': 'SWT Backend connected'});
  });

app.use('/test',test);

// Refresh an access token using a valid refresh token
app.post('/token/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const result = verifyRefreshToken(refreshToken);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  const user = result.data;
  const newAccessToken = generateAccessToken(user);
  res.json({ accessToken: newAccessToken });
});

app.get('/swt', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to SWT!', user: req.user });
  app.use('/swt',usersRoute) /* Will be secured as all other swt routes via this route */
});

app.listen(port, () =>{
  console.log(`Server listening on port: ${port}`);
});

function generateAccessToken(user) {
  const payload = {
    id: user.id,
    email: user.email
  };
  
  const secret = 'your-secret-key';
  const options = { expiresIn: '1m' };

  return jwt.sign(payload, secret, options);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const result = verifyAccessToken(token);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.user = result.data;
  next();
}

function verifyAccessToken(token) {
  const secret = 'your-secret-key';

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Generate a new refresh token
function generateRefreshToken(user) {
  const payload = {
    id: user.id,
    email: user.email
  };

  const secret = 'your-refresh-token-secret';
  const options = { expiresIn: '7d' };

  return jwt.sign(payload, secret, options);
}

// Verify a refresh token
function verifyRefreshToken(token) {
  const secret = 'your-refresh-token-secret';

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
