import { useState, useEffect, useRef } from 'react';
import './App.scss';
import Card from './components/Card';

function App() {
  // State hooks for managing game state
  const [cards, setCards] = useState([]); // Array of card objects
  const [flippedCards, setFlippedCards] = useState([]); // Indices of currently flipped cards
  const [matchedCards, setMatchedCards] = useState([]); // Indices of matched cards
  const [moves, setMoves] = useState(0); // Number of moves made
  const [time, setTime] = useState(0); // Elapsed time in milliseconds
  const [isGameStarted, setIsGameStarted] = useState(false); // Flag to check if the game has started
  const timerRef = useRef(null); // Reference to the timer interval

  // useEffect to initialize and shuffle cards at the start of the game
  useEffect(() => {
    const shuffledCards = Array.from({ length: 24 }, (_, index) => ({
      id: index,
      image: `/images/image${index % 12}.png`, // Path to card image
      flipped: false, // Initial flipped state
    })).sort(() => Math.random() - 0.5); // Shuffle cards
    setCards(shuffledCards); // Set shuffled cards to state
  }, []);

  // useEffect to stop the timer when all cards are matched
  useEffect(() => {
    if (isGameStarted && matchedCards.length === 24) {
      clearInterval(timerRef.current); // Stop the timer
    }
  }, [matchedCards, isGameStarted]);

  // useEffect to handle card flipping logic
  useEffect(() => {
    let timer;
    if (flippedCards.length === 2) {
      timer = setTimeout(() => {
        const [firstCard, secondCard] = flippedCards;
        if (cards[firstCard].image === cards[secondCard].image) {
          setMatchedCards([...matchedCards, firstCard, secondCard]); // Add matched cards to state
        } else {
          const newCards = cards.map((card, index) => {
            if (index === firstCard || index === secondCard) {
              return { ...card, flipped: false }; // Flip cards back if they don't match
            }
            return card;
          });
          setCards(newCards); // Update cards state
        }
        setFlippedCards([]); // Reset flipped cards
        setMoves(moves + 1); // Increment moves
      }, 1000); // Delay for 1 second
    }
    return () => clearTimeout(timer); // Cleanup timer
  }, [flippedCards, cards, matchedCards, moves]);

  // Function to handle card click
  const handleCardClick = index => {
    if (!isGameStarted) {
      setIsGameStarted(true); // Set game started flag
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Increment time every 10 milliseconds
      }, 10);
    }

    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
      const newCards = cards.map((card, i) => {
        if (i === index) {
          return { ...card, flipped: true }; // Flip the clicked card
        }
        return card;
      });
      setCards(newCards); // Update cards state
      setFlippedCards([...flippedCards, index]); // Add card to flipped cards
    }
  };

  // Function to format time in mm:ss:SSS format
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