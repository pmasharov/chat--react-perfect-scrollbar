import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
// import ScrollBar from 'react-perfect-scrollbar'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './styles.module.scss'
import 'react-perfect-scrollbar/dist/css/styles.css';

const array = Array(200);
let data    = [];
for (let index = 0; index < array.length; index++) {
  data.push({
    id:   index,
    name: `name ${index}`
  });
}

const fetchItems = (page) => {
  const onPage = 5;
  const end    = page * onPage;
  const start  = end - onPage;
  return data.slice(start, end);
};

export default function App() {
  const [items, setItems] = useState([]);
  const [page, setPage]   = useState(1);

  const fetch = () => {
    setItems([...items, ...fetchItems(page)])
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  const onNext = () => {
    fetch()
    nextPage()
  }

  useEffect(() => {
    onNext()
  }, [])

  return (
    <div className="App">
      <div
        id="scrollableDiv"
        className={styles.container}
      >
        <InfiniteScroll
          dataLength={items.length}
          next={onNext}
          inverse={true} //
          hasMore={items.length < data.length}
          loader={<h4>Loading...</h4>}
          className={styles.scroll}
          scrollableTarget="scrollableDiv"
        >
          {items.map((item) => (
            <div className={styles.item} key={item.id}>{item.name}</div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export { App }