export default function getApiPrefix() {
  const NODE_ENV = process.env.NODE_ENV || 'development';
  let prefix = '';

  if (NODE_ENV === 'development') {
    prefix = 'dev-';
  } else if (NODE_ENV === 'test') {
    prefix = 'test-';
  }
  return prefix;
}
