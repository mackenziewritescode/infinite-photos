import React from "react";

const text = (
  <div id="text">
    <div id="info-wrap">
      <p>
        This is a simple web app that uses the{" "}
        <a href="https://unsplash.com/developers">Unsplash API</a> to create an
        infinite-scrolling image search. It's written with Node.js and React.js
        using hooks. The infinite-scrolling component is written from scratch
        using React's useRef() and JavaScript's Intersection Observer API.
      </p>
      <p>
        If you're interested, read about it on Github{" "}
        <a href="https://github.com/mackenziewritescode/infinite-photos">
          here
        </a>{" "}
        and check out the rest of my portfolio{" "}
        <a href="http://www.sunkenworld.com/">here</a>.
      </p>
    </div>
    <footer id="footer">
      <p>
        This site was made by{" "}
        <a className="footer-link" href="http://www.sunkenworld.com/">
          Mackenzie Charlton
        </a>{" "}
        in 2020 with{" "}
        <a className="footer-link" href="https://reactjs.org">
          React
        </a>
        . Background photo by
        <a
          className="footer-link"
          href="https://unsplash.com/photos/RVX2STx44UI"
        >
          James Eades
        </a>
        .
      </p>
    </footer>
  </div>
);

export default text;
