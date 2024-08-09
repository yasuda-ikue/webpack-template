import userEnv from 'userEnv';

export function testA() {
  console.log(process.env.NODE_ENV);
  console.log(userEnv.key);
  console.log(userEnv.apiUrl);
}