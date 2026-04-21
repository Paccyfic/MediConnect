import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ToggleCameraProps {
  width?: number;
  height?: number;
  fill?: string;
}

const ToggleCamera: React.FC<ToggleCameraProps> = ({ width = 24, height = 24, fill = "none" }) => (
   `<svg width="404" height="296" viewBox="0 0 404 296" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_dd_5858_19838)">
    <rect x="136" y="180" width="68" height="68" rx="34" fill="#F0F0F0" fill-opacity="0.32" shape-rendering="crispEdges"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M163.133 205.25H169.89C172.716 205.25 174.688 207.197 174.688 209.988V218.012C174.688 220.803 172.716 222.75 169.89 222.75H163.133C160.307 222.75 158.334 220.803 158.334 218.012V209.988C158.334 207.197 160.307 205.25 163.133 205.25ZM179.285 208.025C179.797 207.765 180.398 207.792 180.887 208.1C181.376 208.407 181.667 208.94 181.667 209.523V218.478C181.667 219.062 181.376 219.594 180.887 219.901C180.62 220.068 180.321 220.153 180.02 220.153C179.769 220.153 179.518 220.094 179.284 219.974L177.556 219.102C176.917 218.778 176.52 218.126 176.52 217.403V210.597C176.52 209.872 176.917 209.221 177.556 208.898L179.285 208.025Z" fill="white"/>
    </g>
    <defs>
    <filter id="filter0_dd_5858_19838" x="-64" y="0" width="468" height="468" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="20"/>
    <feGaussianBlur stdDeviation="100"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.0156863 0 0 0 0 0.0235294 0 0 0 0 0.0588235 0 0 0 0.08 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5858_19838"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="20"/>
    <feGaussianBlur stdDeviation="50"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
    <feBlend mode="normal" in2="effect1_dropShadow_5858_19838" result="effect2_dropShadow_5858_19838"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_5858_19838" result="shape"/>
    </filter>
    </defs>
    </svg>`
);

export default ToggleCamera;

