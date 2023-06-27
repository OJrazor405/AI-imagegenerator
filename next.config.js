/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ["links.papareact.com", "aiimagegeneratortu12eac8.blob.core.windows.net",],
    },
}

module.exports = nextConfig
