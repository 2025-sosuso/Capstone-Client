import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // TurboPack 설정
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
    // webpack 설정
    webpack: (config, { dev, isServer }) => {
        // 모바일 개발을 위한 HMR 설정 추가
        if (dev && !isServer) {
            config.watchOptions = {
                poll: 1000, // 1초마다 변경사항 체크
                aggregateTimeout: 300, // 300ms 동안 변경사항 모음
            };
        }

        // @ts-expect-error 타입 에러 무시
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg')
        );

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            typescript: true,
                            ext: 'tsx',
                        },
                    },
                ],
            }
        );
        fileLoaderRule.exclude = /\.svg$/i;
        return config;
    },
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.ytimg.com",
            },
            {
                protocol: "https",
                hostname: "yt3.ggpht.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            }
        ],
    },
};

export default nextConfig;