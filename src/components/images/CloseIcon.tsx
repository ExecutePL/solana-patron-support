import React, { FC, SVGProps } from 'react';

export const CloseIcon: FC<SVGProps<SVGSVGElement>> = ({ width = 20, height = 20 }) => {
    return (
        <svg id="Icon" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20">
            <rect id="Area" width="20" height="20" fill="#fcfcfc" opacity="0"/>
                <g id="Icon-2" data-name="Icon" transform="translate(1.29 2.499)">
                    <line id="Line" x1="10" y2="10" transform="translate(3.71 2.501)" fill="none" stroke="#fcfcfc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667"/>
                    <line id="Line-2" data-name="Line" x2="10" y2="10" transform="translate(3.71 2.501)" fill="none" stroke="#fcfcfc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667"/>
                </g>
        </svg>
    );
};
