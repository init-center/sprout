import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { StateType } from "../store";

const Layout: FC = ({ children }) => {
  const isLoading = useSelector<StateType, boolean>((state) => state.isLoading);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const body = document.body;
      isLoading
        ? body.classList.add("loading")
        : body.classList.remove("loading");

      return (): void => {
        body.classList.remove("loading");
      };
    }
  }, [isLoading]);

  return <div id="layout">{children}</div>;
};

export default Layout;
