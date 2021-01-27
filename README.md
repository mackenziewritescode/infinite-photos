# Infinite Scrolling Photos with Unsplash API

You can check it out [here](https://sunkenworld.com/infinite-photos). 

If you want to run it locally: clone the repository, run `npm install` then create the file `./config/server.js`. You need to get Unsplash API access keys by signing up at (https://unsplash.com/developers). Once you do that, in `./config/server.js`, copy and paste the following and insert your own access and secret keys:

```
module.exports = {
  APP_ACCESS_KEY:
    process.env.APP_ACCESS_KEY || "<YOUR ACCESS KEY HERE>",
  SECRET: process.env.SECRET || "<YOUR SECRET KEY HERE>",
  CALLBACK_ID: process.env.CALLBACK_ID || "http://localhost:3000",
};

```

This app was written as an exercise in two areas: on the back-end side to practice communicating with servers to fetch images using Node.js, Express.js and axios, and on the front-end using React hooks to create an infinite-scrolling component for the fetched images. Here's a little breakdown of the key components.

Once we've set up a simple fetch request from the Unsplash servers, we create a `useEffect` method in the function `usePhotoSearch` that receives two pieces of state from the main `App` component: the `keyword` that the user searched for, and the `page` number, which is another parameter of the Unsplash API which defines a group of images related to the keyword. In `server.js`, we defined the length of the page to be 30 items. We use axios to make the GET request and return the data to an array saved in the local state, `photoArr`:

```
useEffect(() => {
    setLoading(true);
    axios.get(`/api/photos?keyword=${keyword}&page=${page}`).then((res) => {
      setPhotoArr((prevPhotoArr) => {
        return [...new Set([...prevPhotoArr, ...res.data.results])];
      });
      setHasMore(res.data.results.length > 0);
      setLoading(false);
    });
  }, [keyword, page]);
```

With each request, `photoArr` is set by spreading the previous array and adding the new data to the end of it. The 'Set()' constructor is used to make sure that each item in the array is unique.

You can also see that with each request, another piece of local state is saved called `hasMore`, which we use to see if there we are at the end of our results and nothing was returned. This knowledge is used in the `lastPhotoRef` hook, which we will see in a moment.

Next, in our main `App` component, we create a jsx component that has html components for each entry in our array, which we will render to the user: 

```
const photos = photoArr.map((photo, index) => {
    // if this is the last photo in the array, give it a ref
    if (photoArr.length === index + 1) {
      return (
        <div ref={lastPhotoRef} className="thumb" key={photo.id}>
          <a href={photo.links.html}>
            <img className="photo" src={photo.urls.thumb} alt="" />
          </a>
        </div>
      );
    // every photo except the last in the array
    } else {
      return (
        <div className="thumb" key={photo.id}>
          <a href={photo.links.html}>
            <img className="photo" src={photo.urls.thumb} alt="" />
          </a>
        </div>
      );
    }
  });
```

In the last entry of the array we pass a `ref`; we will be using this as a reference point in our pagination.

Finally, we have the infinite-scrolling component. Here we use JaveScript's `IntersectionObserver` to watch for the last item in the array. When that item is visible, our page counter increases and `usePhotoSeach` fetches new items from that page.

```
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
```

`useCallback` is used instead of `useEffect` here because it relies on reference equity and not state, so it will save us from unnecessary renders. It will only run if the values of `loading` or `hasMore` have changed.

***

This has just been a glimpse at what's going on under the hood. For the rest of the code, check out `./server.js` and the React code in `./client/src/`.

Thanks for reading!
