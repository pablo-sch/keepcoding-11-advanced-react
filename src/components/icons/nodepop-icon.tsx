import type { SVGProps } from "react";

const NodePopIcon = (props: SVGProps<SVGSVGElement>) => (
  /*   
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M25.5 17.5c2.544-.396 4.711.271 6.5 2l27 45a700.286 700.286 0 0 0 7-44c1.58-3.053 3.914-3.72 7-2a622.963 622.963 0 0 1-7 59c-2.178 3.566-4.844 3.899-8 1l-27-45a2689.972 2689.972 0 0 0-5 46c-1.58 3.053-3.914 3.72-7 2a457.736 457.736 0 0 1 6.5-64Z" />
  </svg> 
  */
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "auto",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    {...props}
  >
    <path
      fill="#00a1e8"
      d="M-.5-.5h100v100H-.5V-.5Z"
      style={{
        opacity: 1,
      }}
    />
    <path
      fill="#fefffe"
      d="M25.5 17.5c2.544-.396 4.711.271 6.5 2l27 45a700.286 700.286 0 0 0 7-44c1.58-3.053 3.914-3.72 7-2a622.963 622.963 0 0 1-7 59c-2.178 3.566-4.844 3.899-8 1l-27-45a2689.972 2689.972 0 0 0-5 46c-1.58 3.053-3.914 3.72-7 2a457.736 457.736 0 0 1 6.5-64Z"
      style={{
        opacity: 1,
      }}
    />
  </svg>
);

export default NodePopIcon;
