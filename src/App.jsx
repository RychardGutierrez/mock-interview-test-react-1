import { useCallback, useEffect, useState } from 'react';
import { CAT_FACT_API, GIPHY_API, GIPHY_API_KEY } from './constants/api';

import './App.css';

function App() {
  const [fact, setfact] = useState();
  const [words, setWords] = useState();
  const [gift, setGift] = useState();

  const getCatFact = useCallback(async () => {
    const response = await fetch(CAT_FACT_API);
    const { fact } = await response.json();
    // console.log(fact);
    setfact(fact);
  }, []);

  const getGiphy = useCallback(async () => {
    const response = await fetch(
      `${GIPHY_API}?s=${words}&api_key=${GIPHY_API_KEY}`
    );

    const { data } = await response.json();
    const gift = data.images.original.url;

    setGift(gift);
  }, [words]);

  useEffect(() => {
    getCatFact();
  }, [getCatFact]);

  useEffect(() => {
    if (fact === undefined) {
      return;
    }
    const words = getThreeFirstWords(fact);
    setWords(words);
  }, [fact]);

  useEffect(() => {
    if (words === undefined) {
      return;
    }
    getGiphy();
  }, [getGiphy, words]);

  // getCatFact();

  const getThreeFirstWords = (text) => text.split(' ').slice(0, 3).join(' ');

  return (
    <div className="container">
      <h1> Cat random Giftss</h1>
      <article>
        <p>{words}</p>
        <img src={gift} alt="it is a gift of the cat" />
      </article>
    </div>
  );
}

export default App;
