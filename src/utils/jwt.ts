import 'dotenv/config';
const crypt = require('node:crypto');
const base64Url = require('base64url');

interface IHeader {
  alg: string;
  typ: string;
}

interface IPayload {
  username: string;
  name: string;
  exp: number;
}

type IKey = string;

const header: IHeader = {
  alg: 'HS256',
  typ: 'JWT',
};

const payload: IPayload = {
  username: 'user1@user.com',
  name: 'User',
  exp: new Date().getTime(),
};

const headerEncoded = base64Url.encode(JSON.stringify(header));
const payloadEncoded = base64Url.encode(JSON.stringify(payload));

const key: IKey = process.env.JWT_KEY;

const signature = crypt
  .createHmac('sha256', key)
  .update(`${headerEncoded}.${payloadEncoded}`)
  .digest('binary');

console.log(
  `${headerEncoded}.${payloadEncoded}.${base64Url.encode(signature)}`,
);
