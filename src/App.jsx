import { useState, useEffect, useRef } from 'react';
import './App.scss';
import Card from './components/Card';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const shuffledCards = Array.from({ length: 24 }, (_, index) => ({
      id: index,
      image: `/images/image${index % 12}.png`,
      flipped: false,
    })).sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (isGameStarted && matchedCards.length === 24) {
      clearInterval(timerRef.current);
    }
  }, [matchedCards, isGameStarted]);

  useEffect(() => {
    let timer;
    if (flippedCards.length === 2) {
      timer = setTimeout(() => {
        const [firstCard, secondCard] = flippedCards;
        if (cards[firstCard].image === cards[secondCard].image) {
          setMatchedCards([...matchedCards, firstCard, secondCard]);
        } else {
          const newCards = cards.map((card, index) => {
            if (index === firstCard || index === secondCard) {
              return { ...card, flipped: false };
            }
            return card;
          });
          setCards(newCards);
        }
        setFlippedCards([]);
        setMoves(moves + 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [flippedCards, cards, matchedCards, moves]);

  const handleCardClick = index => {
    if (!isGameStarted) {
      setIsGameStarted(true);
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }

    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
      const newCards = cards.map((card, i) => {
        if (i === index) {
          return { ...card, flipped: true };
        }
        return card;
      });
      setCards(newCards);
      setFlippedCards([...flippedCards, index]);
    }
  };

  const formatTime = (milliseconds) => {
    const mins = String(Math.floor((milliseconds / 60000) % 60)).padStart(2, '0');
    const secs = String(Math.floor((milliseconds / 1000) % 60)).padStart(2, '0');
    const millis = String(milliseconds % 1000).padStart(3, '0');
    return `${mins}:${secs}:${millis}`;
  };

  return (
    <>
      <main>
        <header>
          <h1>THE FLIP GAME</h1>
          <div>
            <p>Tid: {formatTime(time)}</p> 
            <p>Antal Moves: {moves}</p> 
          </div>
        </header>

        <div className="grid">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              image={card.image}
              flipped={card.flipped}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        <footer>
          <p>Webudvikler - TechCollege - 2025</p>
        </footer>
      </main>
    </>
  );
}

export default App;