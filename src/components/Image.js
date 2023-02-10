import React from "react";

const Image = ({ className, imageSource, alt }) => {
  return (
    <img className={className} src={imageSource} alt={alt} loading="lazy" />
  );
};

export default Image;
