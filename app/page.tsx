'use client';

import { useState, useEffect } from 'react';
import styles from './index.module.css';

export default function SecretPage() {
  // Removed 'isFirstVisit' as it was unused
  // const [isFirstVisit, setIsFirstVisit] = useState(false); 

  // Check for first visit
  useEffect(() => {
    const firstVisitCheck = localStorage.getItem('firstVisit');
    if (!firstVisitCheck) {
      // If no record, it's the first visit
      alert("Welcome to poop puncher! Just punch the poop and figure stuff out on your own. Blehhhhh. heehehehe. BYEEE!!!");
      localStorage.setItem('firstVisit', 'no');

      localStorage.setItem('count', JSON.stringify(0));
      localStorage.setItem('level', JSON.stringify(1));
  
      localStorage.setItem('amountOfCookiesForLevelUp', JSON.stringify(100));
      localStorage.setItem('addToAmountOfCookiesForLevelUp', JSON.stringify(100));
      localStorage.setItem('poopBarThing', JSON.stringify(0));
  
      localStorage.setItem('poopsClickedEver', JSON.stringify(0));
  
      localStorage.setItem('poopsPerClick', JSON.stringify(1));
      localStorage.setItem('costToBuyPoopClick', JSON.stringify(100));
      localStorage.setItem('costToAddCostToBuyPoopClick', JSON.stringify(10));
  
      localStorage.setItem('amountOfPoopsPerSecond', JSON.stringify(0));
      localStorage.setItem('divideAmountOfPoopsPerSecond', JSON.stringify(0));
      localStorage.setItem('realDivideAmountOfPoopsPerSecond', JSON.stringify(100));
      localStorage.setItem('displayPoopPerSecond', JSON.stringify(0));
      localStorage.setItem('didExceedPoop', JSON.stringify(false));
  
      localStorage.setItem('costToBuyPoopsPerSecond', JSON.stringify(100));
      localStorage.setItem('costToAddCostBuyPoopsPerSecond', JSON.stringify(20));
      // setIsFirstVisit(true); // Unused state, so this line is commented out
    }
  }, []);

  {/* VARIABLES */}
  const savedCount = parseInt(localStorage.getItem("count") || "0");
  const [count, setCount] = useState(savedCount);

  const savedLevel = parseInt(localStorage.getItem("level") || "1");
  const [level, setLevel] = useState(savedLevel);

  // Level
  const savedAmountOfCookiesForLevelUp = parseInt(localStorage.getItem("amountOfCookiesForLevelUp") || "100");
  const [amountOfCookiesForLevelUp, setAmountOfCookiesForLevelUp] = useState(savedAmountOfCookiesForLevelUp);

  const savedAddToAmountOfCookiesForLevelUp = parseInt(localStorage.getItem("addToAmountOfCookiesForLevelUp") || "100");
  const [addToAmountOfCookiesForLevelUp, setAddToAmountOfCookiesForLevelUp] = useState(savedAddToAmountOfCookiesForLevelUp);

  const savedPoopBarThing = parseInt(localStorage.getItem("poopBarThing") || "0");
  const [poopBarThing, setPoopBarThing] = useState(savedPoopBarThing);

  // Poops clicked ever
  const savedPoopsClickedEver = parseInt(localStorage.getItem("poopsClickedEver") || "0");
  const [poopsClickedEver, setPoopsClickedEver] = useState(savedPoopsClickedEver);

  // Poops per click
  const savedPoopPerClick = parseInt(localStorage.getItem("poopsPerClick") || "1");
  const [PoopPerClick, setPoopPerClick] = useState(savedPoopPerClick);

  const savedCostToBuyPoopClick = parseInt(localStorage.getItem("costToBuyPoopClick") || "100");
  const [costToBuyPoopClick, setCostToBuyPoopClick] = useState(savedCostToBuyPoopClick);

  const savedCostToAddCostToBuyPoopClick = parseInt(localStorage.getItem("costToAddCostToBuyPoopClick") || "10");
  const [costToAddCostToBuyPoopClick, setCostToAddCostToBuyPoopClick] = useState(savedCostToAddCostToBuyPoopClick);

  // Poops per second
  const savedDivideAmountOfPoopsPerSecond = parseInt(localStorage.getItem("divideAmountOfPoopsPerSecond") || "0");
  const [divideAmountOfPoopsPerSecond, setDivideAmountOfPoopsPerSecond] = useState(savedDivideAmountOfPoopsPerSecond);

  const savedDisplayPoopPerSecond = parseInt(localStorage.getItem("displayPoopPerSecond") || "0");
  const [displayPoopPerSecond, setDisplayPoopPerSecond] = useState(savedDisplayPoopPerSecond);

  const savedRealDivideAmountOfPoopsPerSecond = parseInt(localStorage.getItem("realDivideAmountOfPoopsPerSecond") || "100");
  const [realDivideAmountOfPoopsPerSecond, setRealDivideAmountOfPoopsPerSecond] = useState(savedRealDivideAmountOfPoopsPerSecond);

  const savedAmountOfPoopsPerSecond = parseInt(localStorage.getItem("amountOfPoopsPerSecond") || "0");
  const [amountOfPoopsPerSecond, setAmountOfPoopsPerSecond] = useState(savedAmountOfPoopsPerSecond);

  const savedDidExceedPoop = JSON.parse(localStorage.getItem("didExceedPoop") || "false");
  const [didExceedPoop, setDidExceedPoop] = useState(savedDidExceedPoop);

  // Shop
  const savedCostToBuyPoopsPerSecond = parseInt(localStorage.getItem("costToBuyPoopsPerSecond") || "100");
  const [costToBuyPoopsPerSecond, setCostToBuyPoopsPerSecond] = useState(savedCostToBuyPoopsPerSecond);

  const savedCostToAddCostBuyPoopsPerSecond = parseInt(localStorage.getItem("costToAddCostBuyPoopsPerSecond") || "20");
  const [costToAddCostBuyPoopsPerSecond, setCostToAddCostBuyPoopsPerSecond] = useState(savedCostToAddCostBuyPoopsPerSecond);

  // Stuff
  const [isLottery, setIsLottery] = useState(false);
  // Removed 'isPooperMan' and 'setIsPooperMan' as they were unused
  // const [isPooperMan, setIsPooperMan] = useState(false);

  function save() {
    localStorage.setItem('count', JSON.stringify(count));
    localStorage.setItem('level', JSON.stringify(level));
    localStorage.setItem('amountOfCookiesForLevelUp', JSON.stringify(amountOfCookiesForLevelUp));
    localStorage.setItem('addToAmountOfCookiesForLevelUp', JSON.stringify(addToAmountOfCookiesForLevelUp));
    localStorage.setItem('poopBarThing', JSON.stringify(poopBarThing));
    localStorage.setItem('poopsClickedEver', JSON.stringify(poopsClickedEver));
    localStorage.setItem('poopsPerClick', JSON.stringify(PoopPerClick));
    localStorage.setItem('costToBuyPoopClick', JSON.stringify(costToBuyPoopClick));
    localStorage.setItem('costToAddCostToBuyPoopClick', JSON.stringify(costToAddCostToBuyPoopClick));
    localStorage.setItem('amountOfPoopsPerSecond', JSON.stringify(amountOfPoopsPerSecond));
    localStorage.setItem('divideAmountOfPoopsPerSecond', JSON.stringify(divideAmountOfPoopsPerSecond));
    localStorage.setItem('realDivideAmountOfPoopsPerSecond', JSON.stringify(realDivideAmountOfPoopsPerSecond));
    localStorage.setItem('displayPoopPerSecond', JSON.stringify(displayPoopPerSecond));
    localStorage.setItem('didExceedPoop', JSON.stringify(didExceedPoop));
    localStorage.setItem('costToBuyPoopsPerSecond', JSON.stringify(costToBuyPoopsPerSecond));
    localStorage.setItem('costToAddCostBuyPoopsPerSecond', JSON.stringify(costToAddCostBuyPoopsPerSecond));
  }

  // The rest of your code remains the same

  {/* WHAT HAPPENS WHEN CLICKED POOP */}
  function clickPoop() {
    setCount(count + PoopPerClick);
    setPoopsClickedEver(poopsClickedEver + PoopPerClick);
    setPoopBarThing(poopBarThing + PoopPerClick);
    save();
  }

  const [poopPressed, setPoopPressed] = useState(false);

  // What happens when clicked poop

  // Handle poop button press
  function handlePoopPress() {
    setPoopPressed(true);
  }

  // Handle poop button release
  function handlePoopRelease() {
    setPoopPressed(false);
  }

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

  {/* STUFF */}

  function toggleIsLottery() {
    setIsLottery((prevState) => !prevState);
  }

  // Removed 'pooperManLotteryGo' as it was unused
  // function pooperManLotteryGo() { }

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
      setCostToAddCostBuyPoopsPerSecond(costToAddCostBuyPoopsPerSecond + 20);
    } else {
      alert("You don't have enough poops you poop head!");
    }
  };

  {/* BACKGROUND STUFF */}

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
      {/* FONTS */}
      <link href="https://fonts.cdnfonts.com/css/jumbo-sale-trial" rel="stylesheet"></link>
      <style>@import url( &#39https://fonts.cdnfonts.com/css/jumbo-sale-trial&#39);</style>
      {/* BACKROUND */}
      <img className={styles.backround} src="toiletPaperBackround.png" alt="" />
      {/* LEFT MENU */}
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

      {/* RIGHT BAR */}

      <div className={styles.rightBar}>
        <div className={styles.stats}>Stats</div> <br />
        <div className={styles.level}>Level: {level}
          <div className={styles.levelBar} style={{ width: `${poopBarThing / amountOfCookiesForLevelUp * 100}%`, height: '20px', backgroundColor: 'green' }}></div>
        </div> <br />
        <div className={styles.statsPoop}>Poops clicked: {count}</div> <br />
        <div className={styles.statsPoop}>Poops clicked ever: {poopsClickedEver}</div> <br />
        <div className={styles.statsShop}>Poops per click: {PoopPerClick}</div> <br />
        <div className={styles.statsShop}>Poops per second: {displayPoopPerSecond}</div>
      </div>

      
      {/* IMAGES */}

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
        onMouseDown={handlePoopPress}
        onMouseUp={handlePoopRelease}
        draggable="false"
      />

      {/* STUFF */}

      <div className={styles.stuff}>
        <div className={styles.stuffTitle}>Stuff</div>  <br />

        <div className={styles.lotteryPicGroup} onClick={toggleIsLottery}>
          <img className={styles.lotteryPic} src="lotteryTicket.png" alt="lotteryTicketPic" />
          <span className={styles.lotteryPicLabel}><strong>Lottery</strong></span>
        </div>
        <div className={styles.lotteryScreen} style={{ opacity: isLottery ? 0.9 : 0, pointerEvents: isLottery ? 'all' : 'none'}}>
          <div className={styles.lotteryTitle}>Lottery</div>
          <button className={styles.lotteryXExit} onClick={toggleIsLottery}>&#10008;</button>
          <img className={styles.pooperManLottery} src="pooperManLottery.png" alt="PooperManLottery" />
        </div>
      </div>
    </div>
  );
}
