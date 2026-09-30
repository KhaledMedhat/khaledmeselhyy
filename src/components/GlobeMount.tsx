"use client";

import dynamic from "next/dynamic";

// WebGL only runs in the browser.
export const GlobeMount = dynamic(() => import("./Globe"), { ssr: false });
