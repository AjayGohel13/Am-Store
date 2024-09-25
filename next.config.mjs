/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'img.clerk.com'
            },
            {
                protocol:'https',
                hostname:'assets.aceternity.com'
            },
            {
                protocol:'https',
                hostname:'ucarecdn.com'
            },
            {
                protocol:'https',
                hostname:'utfs.io'
            },
            {
                protocol:"https",
                hostname:"images.unsplash.com"
            }
        ],
    },
};

export default nextConfig;
