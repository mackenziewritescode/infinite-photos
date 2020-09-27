import React from "react";

export default function Photo({ photo }) {
  return (
    <a className="thumb" href={photo.links.html}>
      <img src={photo.urls.thumb} alt="" />
    </a>
  );
}
