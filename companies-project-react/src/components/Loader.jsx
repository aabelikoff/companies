import React from "react";
import { Watch } from "react-loader-spinner";

<Watch visible={true} height="80" width="80" radius="48" color="#4fa94d" ariaLabel="watch-loading" wrapperStyle={{}} wrapperClass="" />;

export const Loader = () => {
  return (
    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
      <Watch />
    </div>
  );
};
