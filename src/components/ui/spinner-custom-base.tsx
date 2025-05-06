import { createTheme } from "flowbite-react";

const baseTheme = createTheme( { spinner : {
  "base": "inline animate-spin text-gray-50",
  "color": {
    "default": "fill-primary-600",
    "failure": "fill-red-600",
    "gray": "fill-gray-600",
    "info": "fill-cyan-600",
    "pink": "fill-pink-600",
    "purple": "fill-purple-600",
    "success": "fill-green-500",
    "warning": "fill-yellow-400",
    "base" : "fill-orange-500",
    "white" : "fill-white"
}
}});

export default baseTheme