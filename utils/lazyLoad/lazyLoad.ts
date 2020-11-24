import { useEffect, useCallback } from "react";
import throttle from "../throttle/throttle";
import { defaultImg, errorImg } from "./imgUrl";

function isElementInViewport(el: HTMLImageElement) {
  const rect = el.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  );
}

function loadImage(el: HTMLImageElement, errorUrl = errorImg) {
  const dataSrc = el.getAttribute("data-src");
  el.removeAttribute("data-src");
  let img = new Image();
  img.onload = () => {
    el.src = dataSrc;
  };
  img.onerror = () => {
    el.src = errorUrl;
  };
  img.src = dataSrc;
  el.onerror = () => {
    el.src = errorUrl;
  };
  el.onload = () => {
    img = null;
  };
}

function filterImgToLoad(errorUrl = errorImg) {
  const lazyLoadImages = document.querySelectorAll("img[data-src]");
  for (let i = 0; i < lazyLoadImages.length; i++) {
    if (isElementInViewport(lazyLoadImages[i] as HTMLImageElement)) {
      loadImage(lazyLoadImages[i] as HTMLImageElement, errorUrl);
    }
  }
}

export function useImgLazyLoad(errorUrl = errorImg) {
  const lazyLoad = useCallback(
    throttle(() => {
      filterImgToLoad(errorUrl);
    }),
    []
  );
  useEffect(() => {
    // Load once even if there is no scroll on first entry
    filterImgToLoad(errorUrl);
    window.addEventListener("scroll", lazyLoad, false);
    window.addEventListener("resize", lazyLoad, false);
    window.addEventListener("orientationChange", lazyLoad, false);
    return () => {
      window.removeEventListener("scroll", lazyLoad, false);
      window.removeEventListener("resize", lazyLoad, false);
      window.removeEventListener("orientationChange", lazyLoad, false);
    };
  }, [lazyLoad, errorUrl]);
}

export function addLazyLoadAttrToMdImg(md: string, placeholder = defaultImg) {
  const imgRegex = /<img\s(.*?)src="(.*?)"(.*?)>/gi;
  return md.replace(imgRegex, function (str, p1, p2) {
    if (/data-src/gi.test(str)) {
      return str;
    }
    if (/src="data:image(.*?)"/gi.test(str)) {
      return str;
    }
    if (/no-lazy/gi.test(str)) {
      return str;
    }
    return str.replace(p2, `${placeholder}" data-src="${p2}`);
  });
}
