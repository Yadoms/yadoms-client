import React from 'react';
import { ColorScheme } from '@mantine/core';

export function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="100%"
      viewBox="0 -10 180.742 180.49"
    >
      <g transform="translate(-15.535 -60.348)">
        <path
          fill="#428bca"
          strokeWidth="0.265"
          d="M40.065 201.84c-.126-22.301 1.655-66.765-.378-66.903-1.593-.497-13.074 12.834-15.166 11.954-4.96-1.129-8.688-8.877-8.93-12.402-2.567-2.139 83.198-76.708 88.251-73.533 12.87-4.06 35.846 28.385 39.026 25.395.882-1.055-.32-23.236 1.046-24.552 1.47-2.445 27.004-1.288 28.868-.236 1.386 1.187-.614 47.058 0 48.759 1.36 4.144 26.238 20.741 26.459 23.245.707 4.987-9.036 13.608-10.536 13.135-7.543-4.38-13.78-11.166-15.64-11.15-2.162-1.16.316 63.878-.14 65.91.333 3.282-3.624 5.653-5.525 6.14l-121.665.236c-2.092-.494-4.454-1.214-5.67-5.999z"
        ></path>
        <g fill="#fff">
          <ellipse
            cx="117.732"
            cy="169.21"
            strokeWidth="0.268"
            rx="34.879"
            ry="29.533"
          ></ellipse>
          <ellipse
            cx="91.273"
            cy="169.182"
            strokeWidth="0.25"
            rx="30.469"
            ry="29.533"
          ></ellipse>
          <path
            strokeWidth="0.259"
            d="M91.039 139.648h27.094v59.067H91.039z"
          ></path>
        </g>
        <ellipse
          cx="123.612"
          cy="169.716"
          fill="#428bca"
          fillRule="evenodd"
          strokeWidth="0.29"
          rx="23.386"
          ry="22.985"
        ></ellipse>
        <ellipse
          cx="110.516"
          cy="105.304"
          fill="#428bca"
          strokeWidth="0.265"
          rx="16.17"
          ry="11.225"
        ></ellipse>
        <text
          style={{ lineHeight: '1.25' }}
          x="69.737"
          y="136.071"
          fill="#fff"
          strokeWidth="0.265"
          fontFamily="Segoe UI"
          fontSize="35.278"
          fontWeight="400"
        >
          <tspan x="69.737" y="136.071" style={{}}>
            0
          </tspan>
        </text>
        <text
          style={{ lineHeight: '1.25' }}
          x="117.096"
          y="136.318"
          fill="#fff"
          strokeWidth="0.265"
          fontFamily="Segoe UI"
          fontSize="35.278"
          fontWeight="400"
        >
          <tspan x="117.096" y="136.318" style={{}}>
            Y
          </tspan>
        </text>
      </g>
    </svg>
  );
}
