'use client';

import { useState, useEffect } from 'react';
import styles from './index.module.css';

export default function SecretPage() {
  {/* VARIABLES */}
  const [count, setCount] = useState(1);
  const [level, setLevel] = useState(1);
  const [amountOfCookiesForLevelUp, setAmountOfCookiesForLevelUp] = useState(100);
  const [addToAmountOfCookiesForLevelUp, setAddToAmountOfCookiesForLevelUp] = useState(100);
  const [poopsClickedEver, setPoopsClickedEver] = useState(0);
  const [poopBarThing, setPoopBarThing] = useState(0);
  const [poopPressed, setPoopPressed] = useState(false);
  const [PoopPerClick, setPoopPerClick] = useState(1);
  const [costToBuyPoopClick, setCostToBuyPoopClick] = useState(100);
  const [costToAddCostToBuyPoopClick, setCostToAddCostToBuyPoopClick] = useState(10);
  const [divideAmountOfPoopsPerSecond, setDivideAmountOfPoopsPerSecond] = useState(0);
  const [displayPoopPerSecond, setDisplayPoopPerSecond] = useState(0);
  const [realDivideAmountOfPoopsPerSecond, setRealDivideAmountOfPoopsPerSecond] = useState(100);
  const [amountOfPoopsPerSecond, setAmountOfPoopsPerSecond] = useState(1);
  const [didExceedPoop, setDidExceedPoop] = useState(false);
  const [costToBuyPoopsPerSecond, setCostToBuyPoopsPerSecond] = useState(100);
  const [costToAddCostBuyPoopsPerSecond, setcostToAddCostBuyPoopsPerSecond] = useState(20);

  {/* WHAT HAPPENS WHEN CLICKED POOP */}
  function clickPoop() {
    setCount(count + PoopPerClick);
    setPoopsClickedEver(poopsClickedEver + PoopPerClick);
    setPoopBarThing(poopBarThing + PoopPerClick);
  }

  {/* Level Up Logic */}
  useEffect(() => {
    if (poopBarThing >= amountOfCookiesForLevelUp) {
      // Level up logic, ensure it only runs once per level-up
      setLevel((prevLevel) => prevLevel + 1);
      setPoopBarThing((prevPoopBarThing) => prevPoopBarThing - amountOfCookiesForLevelUp);
      setAmountOfCookiesForLevelUp((prevAmount) => prevAmount + addToAmountOfCookiesForLevelUp);
      setAddToAmountOfCookiesForLevelUp((prevAddAmount) => prevAddAmount + 50);
    }
  }, [poopBarThing, amountOfCookiesForLevelUp, addToAmountOfCookiesForLevelUp]);

  {/* SHOP */}
  function morePoopPerClick() {
    if (count >= costToBuyPoopClick) {
      setPoopPerClick(PoopPerClick + 1);
      setCostToBuyPoopClick(costToBuyPoopClick + costToAddCostToBuyPoopClick);
      setCostToAddCostToBuyPoopClick(costToAddCostToBuyPoopClick + 5);
      setCount(count - costToBuyPoopClick);
    } else {
      alert("You don't have enough poops you poop head!");
    }
  }

  {/* Add more poops per second */}
  const addMorePoopsPerSecond = () => {
    if (count >= costToBuyPoopsPerSecond) {
      if (!didExceedPoop) {
        setDivideAmountOfPoopsPerSecond(divideAmountOfPoopsPerSecond + 1);
        setDisplayPoopPerSecond(divideAmountOfPoopsPerSecond + 1);
      } else {
        setAmountOfPoopsPerSecond((prevCount) => prevCount + 1);
        setDisplayPoopPerSecond(amountOfPoopsPerSecond + 1);
      }
      setRealDivideAmountOfPoopsPerSecond(1000 / divideAmountOfPoopsPerSecond);
      setCount(count - costToBuyPoopsPerSecond);
      setCostToBuyPoopsPerSecond(costToBuyPoopsPerSecond + costToAddCostBuyPoopsPerSecond);
      setcostToAddCostBuyPoopsPerSecond(costToAddCostBuyPoopsPerSecond + 20);
    } else {
      alert("You don't have enough poops you poop head!");
    }
  };

  {/* BACKGROUND STUFF */}
  useEffect(() => {
    const interval = setInterval(() => {
      if (divideAmountOfPoopsPerSecond > 0) {
        if (divideAmountOfPoopsPerSecond > 100) {
          setRealDivideAmountOfPoopsPerSecond(1000);
          setDidExceedPoop(true);
          setCount((prevCount) => prevCount + amountOfPoopsPerSecond);
          setPoopsClickedEver((prevPoops) => prevPoops + amountOfPoopsPerSecond);
          setPoopBarThing((prevPoopBar) => prevPoopBar + amountOfPoopsPerSecond);
        } else {
          setCount((prevCount) => prevCount + 1);
          setPoopsClickedEver((prevPoops) => prevPoops + 1);
          setPoopBarThing((prevPoopBar) => prevPoopBar + 1);
        }
      }
    }, realDivideAmountOfPoopsPerSecond);

    return () => clearInterval(interval);
  }, [realDivideAmountOfPoopsPerSecond, amountOfPoopsPerSecond, divideAmountOfPoopsPerSecond]);

  useEffect(() => {
    setRealDivideAmountOfPoopsPerSecond(1000 / divideAmountOfPoopsPerSecond);
  }, [divideAmountOfPoopsPerSecond]);

  return (
    <div className={styles.body}>
      <img className={styles.backround} src="toiletPaperBackround.png" alt="" />
      <span className={styles.leftMenu}>
        <p className={styles.poopMarket}>Poop Market</p>
        <br />
        <button className={styles.morePoopClicker} onClick={morePoopPerClick}>
          Click to add more poop per click ({costToBuyPoopClick} Poops)
        </button> <br /> <br />
        <button onClick={addMorePoopsPerSecond} className={styles.addMorePoopsPerSecond}>
          Click to add more poop per second ({costToBuyPoopsPerSecond} Poops)
        </button>
      </span>

      <div className={styles.rightBar}>
        <div className={styles.stats}>Stats</div> <br />
        <div className={styles.level}>Level: {level}
          <div className={styles.levelBar} style={{ width: `${poopBarThing / amountOfCookiesForLevelUp * 100}%`, height: '20px', backgroundColor: 'green' }}></div>
        </div> <br />
        <div className={styles.poopsClicked}>Poops clicked: {count}</div> <br />
        <div className={styles.poopsPerSecond}>Poops per second: {displayPoopPerSecond}</div>
      </div>

      <div className={styles.stuff}>
        <div className={styles.stuffTitle}>Stuff</div>
      </div>

      <img
        className={styles.stinkLines}
        src="stinkLines.png"
        alt="stink lines"
        style={{ opacity: poopPressed ? 1 : 0 }}
        draggable="false"
      />
      <img
        className={styles.daPoop}
        src="poop.png"
        alt="da poop"
        onClick={clickPoop}
        onMouseDown={() => setPoopPressed(true)}
        onMouseUp={() => setPoopPressed(false)}
        draggable="false"
      />
    </div>
  );
}
