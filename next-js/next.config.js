require('dotenv').config();
const isProd = process.env.NODE_ENV === 'production'
const PATH_PREFIX = isProd ? '/api/v1/web/actions/pages' : '';

module.exports = {
  // Compressing times out on Runtime ??...
  compress: false,
  // Use the CDN in production
  assetPrefix: isProd ? `https://${process.env.AIO_runtime_namespace}.adobeio-static.net` : '',
  env: {
    PATH_PREFIX
  },
  // Required for serverless 
  output: 'standalone'
}
