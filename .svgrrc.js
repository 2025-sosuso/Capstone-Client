module.exports = {
    typescript: true,
    dimensions: false, // width/height 제거 (CSS로 제어)
    replaceAttrValues: {
        '#000': 'currentColor',
        '#000000': 'currentColor',
        'black': 'currentColor',
        '#fff': 'currentColor',
        '#ffffff': 'currentColor',
        'white': 'currentColor',
    },
    svgProps: {
        fill: 'currentColor',
    },
    // 불필요한 SVG 속성 제거
    svgoConfig: {
        plugins: [
            {
                name: 'preset-default',
                params: {
                    overrides: {
                        removeViewBox: false,
                    },
                },
            },
            'removeXMLNS', // xmlns 제거 (React에서 불필요)
        ],
    },
};