import { config } from '../config.js';
import bcrypt from 'bcrypt';

export const csrfCheck = (req, res, next) => {
  if (
    req.method === 'GET' ||
    req.method === 'OPTIONS' ||
    req.method === 'HEAD' ||
    req.originalUrl === '/auth/logout' ||
    req.originalUrl === '/carts'
  ) {
    return next();
  }
console.log('czcz',req.originalUrl)
  const csrfHeader = req.get('school-csrf-token');

  if (!csrfHeader) {
    console.warn('Missing required "school-csrf-token" header.', req.headers.origin);
    return res.status(403).json({ message: 'Failed CSRF check' });
  }

  validateCsrfToken(csrfHeader)
    .then((valid) => {
      if (!valid) {
        console.warn(
          'Value provided in "school-csrf-token" header does not validate.',
          req.headers.origin,
          csrfHeader
        );
        return res.status(403).json({ message: 'Failed CSRF check' });
      }
      console.log('csrf 체크통과!')
      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    });
};

async function validateCsrfToken(csrfHeader) {
  return bcrypt.compare(config.csrf.plainToken, csrfHeader);
}
