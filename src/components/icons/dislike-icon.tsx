import type { SVGProps } from "react"
const DislikeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={512}
    height={512}
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
      d="M243.5 25.5c83.857-1.318 150.691 31.348 200.5 98 45.311 69.166 53.311 142.499 24 220-32.922 73.575-88.755 119.408-167.5 137.5-96.657 14.802-174.49-16.365-233.5-93.5-45.311-69.166-53.311-142.5-24-220 39.519-85.656 106.352-132.99 200.5-142Zm1 33c75.97-1.103 135.137 29.564 177.5 92 39.489 67.757 40.489 136.091 3 205-48.63 74.126-117.13 105.293-205.5 93.5C144.647 432.148 94.147 387.648 68 315.5c-22.643-85.298-.81-156.798 65.5-214.5 32.812-25.104 69.812-39.27 111-42.5Z"
      style={{
        opacity: 0.964,
      }}
    />
  </svg>
)
export default DislikeIcon
