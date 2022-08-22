import React, { useRef } from 'react'
import { useEffect, useState } from 'react';
import ScrollBar from 'react-perfect-scrollbar'
import styles from './styles.module.scss'
import 'react-perfect-scrollbar/dist/css/styles.css';

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

const array = Array(200);
let data    = [];
for (let index = 0; index < array.length; index++) {
  data.push({
    id:   index,
    name: `name ${index}`
  });
}
data.reverse()

const fetchItems = (page) => {
  const onPage = 20;
  const end    = page * onPage;
  const start  = end - onPage;
  return data.slice(start, end);
};

const deb = (func) => (...params) => {
  setTimeout(() => {
    func(...params)
  }, 200)
}

export default function App() {
  const [items, setItems]     = useState([]);
  const [page, setPage]       = useState(1);
  const scrollRef             = useRef()
  const [isFirst, setIsFirst] = useState(true)
  const [height, setHeight]   = useState(0)
  const prevHeight            = usePrevious(height)

  useEffect(() => {
    setItems([
      ...fetchItems(page)
        .reverse(),
      ...items
    ]);
  }, [page])

  const onYStart = (container) => {
    const top = container.scrollHeight - prevHeight
    container.scrollTo({ top })
    if (!isFirst && top !== 0) setPage(prev => prev + 1)
    setIsFirst(false)
  }

  const onScrollY = (container) => {
    setHeight(container.scrollHeight)
  }

  return (
    <div className="App">
      {items && (
        <ScrollBar
          onYReachStart={isFirst ? onYStart : deb(onYStart)}
          onScrollY={onScrollY}
          containerRef={container => scrollRef.current = container}
          className={styles.scroll}
        >
          {items.map((item) => (
            <div className={styles.item} key={item.id}>{item.name}</div>
          ))}
        </ScrollBar>
      )}
    </div>
  );
}

export { App }