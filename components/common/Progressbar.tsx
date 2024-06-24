"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const MprogressBar = ({ children }: any) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#00CC99"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default MprogressBar;
