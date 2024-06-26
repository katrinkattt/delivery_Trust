import React from 'react';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

interface IProps {
  color?: string;
  width?: number;
  height?: number;
}

export function HomeActive({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <G filter="url(#a)">
        <Path
          fill="url(#b)"
          d="M23.042 17.2a.833.833 0 0 0-1.084 0L10 27.45V39.5a2.5 2.5 0 0 0 2.5 2.5h6.667c.46 0 .833-.373.833-.833v-5a2.5 2.5 0 0 1 5 0v5c0 .46.373.833.833.833H32.5a2.5 2.5 0 0 0 2.5-2.5V27.45L23.042 17.2Z"
        />
      </G>
      <Path fill="#000" d="M27 0a5 5 0 1 1-10 0h10Z" />
      <Path fill="#937AEA" d="M27 0a5 5 0 1 1-10 0h10Z" />
      <Defs>
        <LinearGradient
          id="b"
          x1={28.999}
          x2={16.934}
          y1={29.484}
          y2={37.946}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#5E62DF" />
          <Stop offset={1} stopColor="#AD86F0" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export function HomeDefault({color, width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill={color || '#A0ACBE'}
        d="m13.5 17 .65-.76a1 1 0 0 0-1.3 0l.65.76ZM1 27.714l-.65-.759-.35.3v.46h1ZM9.929 42v1a1 1 0 0 0 1-1h-1Zm7.142 0h-1a1 1 0 0 0 1 1v-1ZM26 27.714h1v-.46l-.35-.299-.65.76ZM2.786 43h7.143v-2H2.786v2ZM26.65 26.955l-12.5-10.714-1.302 1.518 12.5 10.715 1.302-1.519ZM12.849 16.241.35 26.955l1.302 1.519 12.5-10.715-1.302-1.518ZM10.93 42v-5.357h-2V42h2Zm5.142-5.357V42h2v-5.357h-2Zm1 6.357h7.143v-2h-7.143v2ZM27 40.214v-12.5h-2v12.5h2Zm-27-12.5v12.5h2v-12.5H0Zm13.5 6.357a2.571 2.571 0 0 1 2.571 2.572h2A4.571 4.571 0 0 0 13.5 32.07v2Zm0-2a4.571 4.571 0 0 0-4.571 4.572h2A2.571 2.571 0 0 1 13.5 34.07v-2ZM24.214 43A2.786 2.786 0 0 0 27 40.214h-2a.786.786 0 0 1-.786.786v2ZM2.786 41A.786.786 0 0 1 2 40.214H0A2.786 2.786 0 0 0 2.786 43v-2Z"
      />
    </Svg>
  );
}

export function OrderActive({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <G fill="#937AEA" filter="url(#a)">
        <Path d="M8 17h25v8.333H8V17Z" />
        <Path
          fillRule="evenodd"
          d="M9.667 27v12.5a2.5 2.5 0 0 0 2.5 2.5h16.666a2.5 2.5 0 0 0 2.5-2.5V27H9.667Zm15 5h-8.334v-1.667h8.334V32Z"
          clipRule="evenodd"
        />
      </G>
      <Path fill="#937AEA" d="M25 0a5 5 0 1 1-10 0h10Z" />
      <Defs />
    </Svg>
  );
}

export function OrderDefault({color, width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        stroke={color || '#A0ACBE'}
        strokeWidth={2}
        d="M9.036 31.286h8.928M1 17h25v7.143H1V17Zm1.786 7.143v16.071c0 .986.8 1.786 1.785 1.786H22.43c.986 0 1.785-.8 1.785-1.786V24.143H2.786Z"
      />
    </Svg>
  );
}

export function MessageActive({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <G filter="url(#a)">
        <Path
          fill="#937AEA"
          fillRule="evenodd"
          d="M8 19.499A2.498 2.498 0 0 1 10.5 17h20c1.381 0 2.5 1.117 2.5 2.499v14.99a2.498 2.498 0 0 1-2.5 2.499h-6.22l-3.087 4.626a.833.833 0 0 1-1.386 0l-3.086-4.626H10.5A2.498 2.498 0 0 1 8 34.489V19.5Zm6.667 9.168h1.666V27h-1.666v1.667Zm5 0h1.666V27h-1.666v1.667Zm6.666 0h-1.666V27h1.666v1.667Z"
          clipRule="evenodd"
        />
      </G>
      <Path fill="#937AEA" d="M25 0a5 5 0 1 1-10 0h10Z" />
      <Defs />
    </Svg>
  );
}

export function MessageDefault({color, width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        stroke={color || '#A0ACBE'}
        strokeWidth={2}
        d="M12.607 27.714h1.786m-7.143 0h1.786m8.928 0h1.786M9.929 36.63l3.571 5.354 3.571-5.354h7.143c.988 0 1.786-.798 1.786-1.785v-16.06c0-.987-.798-1.785-1.786-1.785H2.786C1.798 17 1 17.798 1 18.785v16.06c0 .987.798 1.785 1.786 1.785h7.143Z"
      />
    </Svg>
  );
}

export function ProfileActive({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <G fill="#937AEA" filter="url(#a)">
        <Path d="M16.333 26.167a4.167 4.167 0 1 1 8.334 0 4.167 4.167 0 0 1-8.334 0Z" />
        <Path
          fillRule="evenodd"
          d="M20.5 17C13.596 17 8 22.596 8 29.5S13.596 42 20.5 42 33 36.404 33 29.5 27.404 17 20.5 17ZM9.667 29.5c0-5.983 4.85-10.833 10.833-10.833 5.983 0 10.833 4.85 10.833 10.833 0 3.083-1.287 5.864-3.354 7.837A5.834 5.834 0 0 0 22.167 32h-3.334a5.834 5.834 0 0 0-5.812 5.337A10.802 10.802 0 0 1 9.667 29.5Z"
          clipRule="evenodd"
        />
      </G>
      <Path fill="#937AEA" d="M25 0a5 5 0 1 1-10 0h10Z" />
      <Defs />
    </Svg>
  );
}

export function ProfileDefault({color, width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        stroke={color || '#A0ACBE'}
        strokeLinecap="square"
        strokeWidth={2}
        d="M6.357 39.321v-.893a5.357 5.357 0 0 1 5.357-5.357h3.572a5.357 5.357 0 0 1 5.357 5.357v.893M13.5 22.357a3.571 3.571 0 1 0 0 7.143 3.571 3.571 0 0 0 0-7.143ZM13.5 42C6.596 42 1 36.404 1 29.5S6.596 17 13.5 17 26 22.596 26 29.5 20.404 42 13.5 42Z"
      />
    </Svg>
  );
}

export function EyeActive({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill="#243757"
        fillRule="evenodd"
        d="M.981 4a8.337 8.337 0 0 0 1.13 1.474C2.93 6.323 4.078 7.11 5.5 7.11c1.421 0 2.569-.788 3.39-1.637A8.337 8.337 0 0 0 10.019 4a8.337 8.337 0 0 0-1.13-1.474C8.07 1.677 6.922.89 5.5.89c-1.421 0-2.569.788-3.39 1.637A8.337 8.337 0 0 0 .981 4Zm9.56 0 .41-.2-.002-.004-.005-.01a5.813 5.813 0 0 0-.088-.157 9.232 9.232 0 0 0-1.298-1.711C8.661.99 7.288 0 5.5 0 3.713 0 2.34.99 1.442 1.918A9.23 9.23 0 0 0 .075 3.752a3.289 3.289 0 0 0-.019.035l-.005.01-.002.002v.002L.459 4l-.41-.199a.432.432 0 0 0 0 .398L.458 4l-.41.199V4.2l.002.003.005.01a3.289 3.289 0 0 0 .088.157 9.23 9.23 0 0 0 1.298 1.711C2.34 7.01 3.712 8 5.5 8c1.787 0 3.16-.99 4.058-1.918a9.232 9.232 0 0 0 1.298-1.711l.07-.123.018-.035.005-.01.002-.003-.41-.2Zm0 0 .41.199a.433.433 0 0 0 0-.398l-.41.199Z"
        clipRule="evenodd"
      />
      <Path
        fill="#243757"
        fillRule="evenodd"
        d="M5.5 3.111c-.506 0-.917.398-.917.889 0 .49.41.889.917.889.506 0 .917-.398.917-.889 0-.49-.41-.889-.917-.889ZM3.667 4c0-.982.82-1.778 1.833-1.778S7.333 3.018 7.333 4 6.513 5.778 5.5 5.778c-1.012 0-1.833-.796-1.833-1.778Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function OrderIcon({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        stroke="#A1ADBF"
        strokeWidth={2}
        d="M7.107 11.857h6.786M1 1h19v5.429H1V1Zm1.357 5.429v12.214c0 .75.608 1.357 1.357 1.357h13.572c.75 0 1.357-.608 1.357-1.357V6.429H2.357Z"
      />
    </Svg>
  );
}

export function OrderIconActive({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path fill="#937AEA" d="M0 0h25v8.333H0V0Z" />
      <Path
        fill="#937AEA"
        fillRule="evenodd"
        d="M1.667 10v12.5a2.5 2.5 0 0 0 2.5 2.5h16.666a2.5 2.5 0 0 0 2.5-2.5V10H1.667Zm15 5H8.333v-1.667h8.334V15Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function SearchIcon({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill="#A1ADBF"
        fillRule="evenodd"
        d="M10.084 3.667a6.417 6.417 0 1 0 0 12.834 6.417 6.417 0 0 0 0-12.834Zm-8.25 6.417a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0Z"
        clipRule="evenodd"
      />

      <Path
        fill="#A1ADBF"
        fillRule="evenodd"
        d="M14.614 14.614a.917.917 0 0 1 1.297 0l3.987 3.988a.917.917 0 0 1-1.296 1.296l-3.988-3.987a.917.917 0 0 1 0-1.297Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function ArrowBottom({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path fill="#EB5757" d="M6.5 12 0 5.333h3.9V0h5.2v5.333H13L6.5 12Z" />
    </Svg>
  );
}

export function ArrowTop({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path fill="#937AEA" d="M6.5 0 0 6.667h3.9V12h5.2V6.667H13L6.5 0Z" />
    </Svg>
  );
}

export function Minus({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path fill="#BAD2FF" d="M0 0h15v3H0z" />
    </Svg>
  );
}

export function Hourglass({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill="#937AEA"
        fillRule="evenodd"
        d="M12 1h2V0H1v1h2v3.672a2.5 2.5 0 0 0 .732 1.767l.707.707a.5.5 0 0 1 0 .708l-1 1A1.5 1.5 0 0 0 3 9.914V14H1v1h13v-1h-2V9.914a1.5 1.5 0 0 0-.44-1.06l-1-1a.5.5 0 0 1 0-.708l1-1a1.5 1.5 0 0 0 .44-1.06V1ZM4.25 5.5h6.543l.06-.06A.5.5 0 0 0 11 5.085V1H4v3.672c0 .296.088.584.25.828Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function CheckIcon({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        stroke="#243757"
        strokeWidth={1.5}
        d="M5 8.5 8 11l4-5m-3.5 9.5a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"
        opacity={0.5}
      />
    </Svg>
  );
}

export function FilterIcon({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill="#fff"
        d="M12.6 0H8.4v3.2H0v1.6h8.4V8h4.2V4.8H21V3.2h-8.4V0ZM7 8H2.8v3.2H0v1.6h2.8V16H7v-3.2h14v-1.6H7V8ZM18.2 16H14v3.2H0v1.6h14V24h4.2v-3.2H21v-1.6h-2.8V16Z"
      />
    </Svg>
  );
}

export function BackArrow({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill="#243757"
        d="M7.178 14.115a.556.556 0 0 1-.398-.165L2.228 9.397a.566.566 0 0 1 0-.795L6.78 4.05a.566.566 0 0 1 .795 0 .566.566 0 0 1 0 .795L3.42 9l4.155 4.155a.566.566 0 0 1 0 .795.544.544 0 0 1-.397.165Z"
      />
      <Path
        fill="#243757"
        d="M15.375 9.563H2.752A.567.567 0 0 1 2.19 9c0-.307.255-.563.562-.563h12.623c.307 0 .562.256.562.563a.567.567 0 0 1-.562.563Z"
      />
    </Svg>
  );
}

export function MessageIcon({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        stroke="#A0ACBE"
        strokeWidth={2}
        d="M12.607 11.714h1.786m-7.143 0h1.786m8.928 0h1.786M9.929 20.63l3.571 5.354 3.571-5.354h7.143c.988 0 1.786-.798 1.786-1.784V2.785C26 1.798 25.202 1 24.214 1H2.786C1.798 1 1 1.798 1 2.785v16.06c0 .987.798 1.785 1.786 1.785h7.143Z"
      />
    </Svg>
  );
}

export function PhoneIcon({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        stroke="#A0ACBE"
        strokeWidth={2}
        d="M8.866 1.834h-3.7a3.333 3.333 0 0 0-3.333 3.333v3.334c0 9.204 7.462 16.666 16.667 16.666h3.334a3.333 3.333 0 0 0 3.333-3.333v-2.303c0-.632-.357-1.209-.922-1.491l-4.026-2.013a1.667 1.667 0 0 0-2.327.963l-.496 1.49a2.016 2.016 0 0 1-2.307 1.338 10.078 10.078 0 0 1-7.907-7.906 2.016 2.016 0 0 1 1.34-2.307l1.847-.616a1.667 1.667 0 0 0 1.09-1.986l-.977-3.907a1.667 1.667 0 0 0-1.616-1.262Z"
      />
    </Svg>
  );
}

export function MoreIcon({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill="#A0ACBE"
        d="M12.5 5a.833.833 0 1 1 0-1.666.833.833 0 0 1 0 1.667ZM12.5 13.334a.833.833 0 1 1 0-1.667.833.833 0 0 1 0 1.667ZM12.5 21.667a.833.833 0 1 1 0-1.666.833.833 0 0 1 0 1.666Z"
      />
      <Path
        stroke="#BDBDBD"
        strokeWidth={2}
        d="M12.5 5a.833.833 0 1 1 0-1.666.833.833 0 0 1 0 1.667ZM12.5 13.334a.833.833 0 1 1 0-1.667.833.833 0 0 1 0 1.667ZM12.5 21.667a.833.833 0 1 1 0-1.666.833.833 0 0 1 0 1.666Z"
      />
    </Svg>
  );
}

export function FlagIcon({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill="#A1ADBF"
        d="M0 .667C0 .298.298 0 .667 0h18.666a.667.667 0 0 1 .61.937l-2.547 5.73 2.546 5.729a.666.666 0 0 1-.609.937h-18V20H0V.667Z"
      />
    </Svg>
  );
}

export function TreatyIcon({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill="#A1ADBF"
        d="m26.294 15.46 4.26-2.44c.358-.205.62-.542.726-.938a1.534 1.534 0 0 0-.155-1.171A1.567 1.567 0 0 0 29 10.345l-4.26 2.44a1.552 1.552 0 0 0-.725.938 1.534 1.534 0 0 0 .555 1.625 1.562 1.562 0 0 0 1.726.113ZM22.36 46.813l34.087-20.185c.318-.191.55-.504.644-.87a1.464 1.464 0 0 0-.14-1.081 1.4 1.4 0 0 0-.844-.666c-.356-.1-.735-.05-1.056.137L20.964 44.333c-.318.191-.549.504-.643.87-.094.365-.044.754.14 1.081.185.328.488.567.844.666.355.1.735.05 1.055-.137Z"
      />
      <Path
        fill="#A1ADBF"
        d="m88.167 67.404-7.535-4.272a10.02 10.02 0 0 0-3.014-1.15c-.028-11.438-.136-38.345-.109-44.265a1.38 1.38 0 0 0-.678-1.197C55.787 4.078 48.776.08 48.956.185a1.388 1.388 0 0 0-1.385 0L33.508 8.283a1.383 1.383 0 0 0 1.385 2.395l13.368-7.7 10.377 6.019L14.516 34.4 4.148 28.39l18.406-10.604a1.384 1.384 0 0 0 .515-1.893 1.384 1.384 0 0 0-1.9-.501L.692 27.189A1.383 1.383 0 0 0 0 28.384l.277 95.325a1.378 1.378 0 0 0 .69 1.189l13.14 7.62a1.382 1.382 0 0 0 1.389.003L55.82 109.28l6.014 3.408c4.361 2.489 9.557 1.256 13.9-1.241a40.286 40.286 0 0 0 12.92-13.605A40.187 40.187 0 0 0 94 79.872c-.017-5.874-2.09-10.295-5.833-12.468Zm-7.684-1.178c-12.503 2.23-24.557 19.906-24.519 33.963 0 2.16.345 4.306 1.02 6.359.028.08.036.174.067.251a9.16 9.16 0 0 1-4.304-3.901 14.995 14.995 0 0 1-1.535-6.953v-.028a37.538 37.538 0 0 1 9.663-23.1 26.745 26.745 0 0 1 8.088-6.52 13.325 13.325 0 0 1 7.133-1.72 7.568 7.568 0 0 1 3.154.957l1.233.692ZM62.825 23.772c0-.276-.027-13.138-.027-12.34l10.583 6.26-10.556 6.08ZM3.035 122.91l-.258-92.12 10.36 6.007.261 92.124-10.364-6.011Zm13.145 6.016-.277-92.129L60.01 11.4c0 .276.036 15.737.036 14.775a1.38 1.38 0 0 0 1.386 1.38c.243 0 .481-.064.692-.183l12.59-7.244.121 41.64h-.055c-8.272.34-15.997 8.038-20.34 15.036L21.157 95.978a1.384 1.384 0 1 0 1.386 2.397l29.373-16.929a35.075 35.075 0 0 0-3.494 14.457V95.953c0 .553.036 1.05.069 1.562l-27.34 15.74a1.38 1.38 0 0 0 .338 2.527c.353.096.73.048 1.048-.132l26.375-15.182a13.346 13.346 0 0 0 2.55 5.499 10.255 10.255 0 0 0 1.615 1.615l.039.039-36.936 21.305Zm58.168-19.879c-4.276 2.464-8.225 2.909-11.132 1.239a11.2 11.2 0 0 1-3.57-4.462 11.169 11.169 0 0 1-.902-5.638 37.074 37.074 0 0 1 4.937-16.604 37.17 37.17 0 0 1 11.947-12.565c3.378-1.957 7.728-3.177 11.098-1.252l.042.022c2.86 1.659 4.433 5.236 4.46 10.089a37.123 37.123 0 0 1-4.94 16.602 37.215 37.215 0 0 1-11.94 12.569Z"
      />
      <Path
        fill="#A1ADBF"
        d="m81.699 86.026-2.145 1.183-.032-11.19a1.329 1.329 0 0 0-.195-.687 1.412 1.412 0 0 0-.528-.502 1.494 1.494 0 0 0-1.438.002l-6.025 3.32a1.41 1.41 0 0 0-.528.505c-.127.21-.193.449-.192.692l.034 12.768-3.577 1.973a1.42 1.42 0 0 0-.459.402 1.315 1.315 0 0 0-.213 1.143c.054.193.152.374.286.528l7.342 8.4c.158.182.362.321.593.405a1.491 1.491 0 0 0 1.397-.197c.196-.144.349-.335.445-.552l7.284-16.465c.118-.266.146-.56.08-.842a1.366 1.366 0 0 0-.452-.727 1.497 1.497 0 0 0-1.677-.16Zm-6.973 15.041L70 95.657l2.816-1.553a1.41 1.41 0 0 0 .53-.506c.126-.21.192-.449.19-.691l-.034-12.771 3.148-1.734.031 11.19c0 .242.068.479.195.688.126.209.308.382.527.502a1.495 1.495 0 0 0 1.44 0l.577-.32-4.693 10.605ZM25.264 60.618 69.3 36.696c.34-.185.588-.489.69-.845a1.321 1.321 0 0 0-.148-1.057 1.47 1.47 0 0 0-.897-.649 1.56 1.56 0 0 0-1.123.139l-44.035 23.94c-.169.09-.318.211-.437.356-.12.145-.207.311-.258.488a1.311 1.311 0 0 0 .146 1.06c.098.159.227.298.382.41a1.567 1.567 0 0 0 1.645.095v-.015ZM25.352 77.193 71.123 49.95c.35-.211.605-.557.708-.961a1.628 1.628 0 0 0-.155-1.197 1.543 1.543 0 0 0-.927-.737 1.495 1.495 0 0 0-1.162.152L23.816 74.45a1.55 1.55 0 0 0-.455.406 1.605 1.605 0 0 0-.31 1.175c.027.207.093.407.194.588.101.18.236.34.397.466a1.517 1.517 0 0 0 1.141.311c.2-.028.394-.097.569-.203Z"
      />
    </Svg>
  );
}

export function DownloadIcon({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M2.5 11.667c.46 0 .833.373.833.833v3.334a.833.833 0 0 0 .833.833h11.667a.833.833 0 0 0 .833-.833V12.5a.833.833 0 0 1 1.667 0v3.334a2.5 2.5 0 0 1-2.5 2.5H4.167a2.5 2.5 0 0 1-2.5-2.5V12.5c0-.46.373-.833.833-.833Z"
        clipRule="evenodd"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M5.244 7.744a.833.833 0 0 1 1.179 0L10 11.322l3.577-3.578a.833.833 0 1 1 1.179 1.179l-4.167 4.166a.833.833 0 0 1-1.178 0L5.244 8.923a.833.833 0 0 1 0-1.179Z"
        clipRule="evenodd"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M10 1.667c.46 0 .833.373.833.833v10a.833.833 0 1 1-1.667 0v-10c0-.46.374-.833.834-.833Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function Logo({width, height}: IProps) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        fill="url(#a)"
        d="M53 23.058c-1.082-1.924-2.842-4.449-4.226-6.298-4.025 3.049-8.552 2.374-13.608.95 4.125-.176 7.697-3.225 8.401-7.424.78-4.824-2.515-9.373-7.37-10.173-4.855-.774-9.433 2.5-10.238 7.324-.78 4.824 2.516 9.373 7.37 10.172h.05c1.108 2.95-.2 5.949-1.282 7.774-.126-4.05-1.333-8.773-6.918-10.473a25.92 25.92 0 0 1-.73-.225c-6.338-1.3-13.255-1.15-20.776 4.4.503 1.899 1.157 4.848 1.785 6.848 5.207-2.025 8.301-1.425 11.597 1.374C14.89 35.905 13.407 40.154 1.66 38.58c-.352 2-1.107 5.173-1.66 7.198 9.835 3.799 20.727 3.924 26.79-.95C31.517 47.003 36.573 48.302 36.8 58h9.71c.705-18.02-6.137-21.995-13.583-27.419 4.1 1 13.332 2.15 20.073-7.523Z"
      />
      <Path
        fill="url(#b)"
        d="M53 23.058c-1.082-1.924-2.842-4.449-4.226-6.298-4.025 3.049-8.552 2.374-13.608.95 4.125-.176 7.697-3.225 8.401-7.424.78-4.824-2.515-9.373-7.37-10.173-4.855-.774-9.433 2.5-10.238 7.324-.78 4.824 2.516 9.373 7.37 10.172h.05c1.108 2.95-.2 5.949-1.282 7.774-.126-4.05-1.333-8.773-6.918-10.473a25.92 25.92 0 0 1-.73-.225c-6.338-1.3-13.255-1.15-20.776 4.4.503 1.899 1.157 4.848 1.785 6.848 5.207-2.025 8.301-1.425 11.597 1.374C14.89 35.905 13.407 40.154 1.66 38.58c-.352 2-1.107 5.173-1.66 7.198 9.835 3.799 20.727 3.924 26.79-.95C31.517 47.003 36.573 48.302 36.8 58h9.71c.705-18.02-6.137-21.995-13.583-27.419 4.1 1 13.332 2.15 20.073-7.523Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={84.108}
          x2={-49.764}
          y1={-18.934}
          y2={113.111}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#00F2FF" />
          <Stop offset={1} stopColor="#0094FF" />
        </LinearGradient>
        <LinearGradient
          id="b"
          x1={22.275}
          x2={49.88}
          y1={0}
          y2={1.209}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#D1EA7A" />
          <Stop offset={1} stopColor="#BED962" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export function AppleLogo() {
  return (
    <Svg width={27} height={27} fill="none">
      <Path
        fill="#fff"
        d="M20.366 24.197c-1.357 1.267-2.838 1.067-4.264.467-1.51-.613-2.894-.64-4.486 0-1.994.826-3.046.586-4.237-.467-6.757-6.706-5.76-16.918 1.91-17.29 1.87.092 3.171.986 4.265 1.066 1.634-.32 3.198-1.24 4.943-1.12 2.09.16 3.67.96 4.707 2.4-4.32 2.492-3.295 7.972.665 9.505-.79 2-1.814 3.986-3.517 5.453l.014-.014Zm-6.95-17.37c-.208-2.974 2.298-5.427 5.178-5.667.401 3.44-3.24 6-5.178 5.666Z"
      />
      <Path
        fill="url(#a)"
        d="M20.366 24.197c-1.357 1.267-2.838 1.067-4.264.467-1.51-.613-2.894-.64-4.486 0-1.994.826-3.046.586-4.237-.467-6.757-6.706-5.76-16.918 1.91-17.29 1.87.092 3.171.986 4.265 1.066 1.634-.32 3.198-1.24 4.943-1.12 2.09.16 3.67.96 4.707 2.4-4.32 2.492-3.295 7.972.665 9.505-.79 2-1.814 3.986-3.517 5.453l.014-.014Zm-6.95-17.37c-.208-2.974 2.298-5.427 5.178-5.667.401 3.44-3.24 6-5.178 5.666Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={6.038}
          x2={28.21}
          y1={5.342}
          y2={18.66}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#5D5C60" />
          <Stop offset={1} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export function GoogleLogo() {
  return (
    <Svg width={27} height={27} fill="none">
      <G clipPath="url(#a)">
        <Path
          fill="#4285F4"
          d="M13.54 10.797v5.034h7.139c-.314 1.62-1.255 2.99-2.665 3.912l4.305 3.274c2.508-2.269 3.955-5.602 3.955-9.56 0-.923-.084-1.81-.241-2.66H13.54Z"
        />
        <Path
          fill="#34A853"
          d="m6.105 15.635-.97.728-3.438 2.624C3.88 23.23 8.354 26.16 13.54 26.16c3.582 0 6.585-1.159 8.78-3.144l-4.306-3.274c-1.182.78-2.689 1.253-4.474 1.253-3.449 0-6.379-2.281-7.428-5.354l-.006-.007Z"
        />
        <Path
          fill="#FBBC05"
          d="M1.697 7.334a12.632 12.632 0 0 0 0 11.653c0 .011 4.414-3.357 4.414-3.357a7.649 7.649 0 0 1-.422-2.47c0-.863.157-1.69.422-2.47L1.697 7.334Z"
        />
        <Path
          fill="#EA4335"
          d="M13.54 5.337c1.953 0 3.69.661 5.077 1.938l3.798-3.723C20.112 1.448 17.121.16 13.54.16 8.354.16 3.88 3.08 1.697 7.334l4.414 3.356c1.05-3.073 3.98-5.353 7.429-5.353Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M.274.16h26v26h-26z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function FacebookLogo() {
  return (
    <Svg width={28} height={28} fill="none">
      <Path
        fill="#1B78F2"
        d="M10.856 7.258v3.092H8.591v3.78h2.265v11.234h4.651V14.131h3.122s.293-1.813.434-3.795h-3.537V7.751c0-.386.506-.906 1.008-.906h2.536V2.91h-3.447c-4.882 0-4.767 3.784-4.767 4.348Z"
      />
    </Svg>
  );
}

export function Backspace() {
  return (
    <Svg width={24} height={24} fill="none">
      <G fill="#000" fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
        <Path d="M7.247 3.341A1 1 0 0 1 8 3h13a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H8a1 1 0 0 1-.753-.341l-7-8a1 1 0 0 1 0-1.318l7-8ZM8.454 5l-6.125 7 6.125 7H21a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8.454Z" />
        <Path d="M18.707 8.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0Z" />
        <Path d="M11.293 8.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414Z" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function ArrowRight() {
  return (
    <Svg width={33} height={14} fill="none">
      <Path
        fill="#fff"
        fillRule="evenodd"
        stroke="#fff"
        d="m29.328 7.69-4.392 4.335.987.975L32 7l-6.077-6-.987.975 4.392 4.336H1v1.378h28.328Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function ChevronBottom() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M4.41 6.911a.833.833 0 0 1 1.18 0L10 11.322l4.41-4.41a.833.833 0 1 1 1.18 1.178l-5 5a.833.833 0 0 1-1.18 0l-5-5a.833.833 0 0 1 0-1.179Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function SelectFileSvg() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none">
      <Path
        fill="#12213A"
        fillRule="evenodd"
        d="M11.835 1.791c-.597 0-1.17.237-1.592.66L3.351 9.343a3.752 3.752 0 1 0 5.306 5.307l6.893-6.893a.75.75 0 1 1 1.06 1.061l-6.892 6.893A5.253 5.253 0 0 1 2.29 8.281L9.182 1.39a3.752 3.752 0 1 1 5.306 5.306l-6.9 6.892a2.25 2.25 0 0 1-3.183-3.183l6.368-6.36a.75.75 0 0 1 1.06 1.06l-6.367 6.36a.752.752 0 0 0 1.061 1.062l6.9-6.892a2.253 2.253 0 0 0-1.592-3.844Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
export function Ellipses({color = 'white'}: {color?: string}) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none">
      <Circle cx={8} cy={8} r={4} fill={color} />
      <Circle cx={8} cy={8} r={7.5} stroke={color} />
    </Svg>
  );
}

export function Flag({color = '#A1ADBF'}: {color?: string}) {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <Path
        d="M0 0.5C0 0.223858 0.223858 0 0.5 0H14.5C14.6693 0 14.827 0.0856253 14.9192 0.227543C15.0115 0.369461 15.0256 0.548403 14.9569 0.703069L13.0472 5L14.9569 9.29693C15.0256 9.4516 15.0115 9.63054 14.9192 9.77246C14.827 9.91437 14.6693 10 14.5 10H1V15H0V0.5Z"
        fill={color}
      />
    </Svg>
  );
}

export function PlusIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM11.2 17.6V12.8H6.4V11.2H11.2V6.4H12.8V11.2H17.6V12.8H12.8V17.6H11.2Z"
        fill="#937AEA"
      />
    </Svg>
  );
}

export function Dots() {
  return (
    <Svg width="4" height="18" viewBox="0 0 4 18" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 16C0 14.8954 0.89543 14 2 14C3.10457 14 4 14.8954 4 16C4 17.1046 3.10457 18 2 18C0.89543 18 0 17.1046 0 16Z"
        fill="#243757"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 2C0 0.89543 0.89543 0 2 0C3.10457 0 4 0.89543 4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2Z"
        fill="#243757"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 9C0 7.89543 0.89543 7 2 7C3.10457 7 4 7.89543 4 9C4 10.1046 3.10457 11 2 11C0.89543 11 0 10.1046 0 9Z"
        fill="#243757"
      />
    </Svg>
  );
}

export function ChatUnRead() {
  return (
    <Svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <Path
        d="M10.8269 0.720703L3.77354 7.7807L1.00021 5.0007L0.046875 5.9407L3.77354 9.66737L11.7735 1.66737"
        fill="#243757"
        fill-opacity="0.5"
      />
    </Svg>
  );
}

export function ChatRead() {
  return (
    <Svg width="16" height="10" viewBox="0 0 16 10" fill="none">
      <Path
        d="M0.273438 5.9407L4.0001 9.66737L4.9401 8.7207L1.2201 5.0007M14.8268 0.720703L7.77344 7.7807L5.0001 5.0007L4.04677 5.9407L7.77344 9.66737L15.7734 1.66737M12.0001 1.66737L11.0601 0.720703L6.82677 4.95404L7.77344 5.89404L12.0001 1.66737Z"
        fill="#937AEA"
      />
    </Svg>
  );
}
