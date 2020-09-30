import React, { useState, useRef, useCallback } from "react";
import "./App.scss";
import usePhotoSearch from "./usePhotoSearch";

function App() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");

  const { loading, photoArr, hasMore } = usePhotoSearch(keyword, page);

  const observer = useRef();
  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleInput(e) {
    setInput(e.target.value);
    setPage(1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (e.value !== "") {
      setKeyword(input);
    }
  }

  return (
    <div className="App">
      <header>
        <div id="gradient">
          <h1>Infinite Photos</h1>
          <div id="text">
            <div id="info-wrap">
              <p>
                This is a simple web app that uses the{" "}
                <a href="https://unsplash.com/developers">Unsplash API</a> to
                create an infinite-scrolling image search. It's written with
                Node.js and React.js using hooks. The infinite-scrolling
                component is written from scratch using React's useRef().
              </p>
              <p>
                If you're interested, read about it on Github{" "}
                <a href="https://github.com/mackenziewritescode/infinite-photos">
                  here
                </a>{" "}
                and check out the rest of my portfolio{" "}
                <a href="http://www.sunkenworld.com/about/">here</a>.
              </p>
            </div>
            <footer id="footer">
              <p>
                This site was made by{" "}
                <a
                  className="footer-link"
                  href="http://www.sunkenworld.com/about/"
                >
                  Mackenzie Charlton
                </a>{" "}
                in 2020 with{" "}
                <a className="footer-link" href="https://reactjs.org">
                  React
                </a>
                .
              </p>
            </footer>
          </div>
          <form id="search-wrap" onSubmit={handleSubmit}>
            <div id="search-bar">
              <input
                type="text"
                value={input}
                onChange={handleInput}
                placeholder="e.g. 'coffee'"
              ></input>
            </div>
            <input id="search-button" type="submit" value="Search" />
          </form>
        </div>
      </header>
      {photoArr.map((photo, index) => {
        if (photoArr.length === index + 1) {
          return (
            <div className="thumb" key={photo.id}>
              <a ref={lastPhotoRef} href={photo.links.html}>
                <img className="photo" src={photo.urls.thumb} alt="" />
              </a>
            </div>
          );
        } else {
          return (
            <div className="thumb" key={photo.id}>
              <a href={photo.links.html}>
                <img className="photo" src={photo.urls.thumb} alt="" />
              </a>
            </div>
          );
        }
      })}
      {loading && "Loading..."}
    </div>
  );
}

export default App;

// start with: npm run dev
