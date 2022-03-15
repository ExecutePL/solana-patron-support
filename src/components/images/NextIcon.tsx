import React, { FC, SVGProps } from 'react';

export const NextIcon: FC<SVGProps<SVGSVGElement>> = ({ width = 12, height = 12 }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 13.333 14.023">
            <g id="Icon" transform="translate(-2.043 -0.489)">
                <path id="Line" d="M0,0H11.667" transform="translate(2.877 7.501)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="1.667"/>
                <path id="Path" d="M10,4.167,15.833,10,10,15.833" transform="translate(-1.29 -2.499)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.667"/>
            </g>
        </svg>
    );
};
