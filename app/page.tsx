'use client';

import { useState, useEffect } from 'react';
import styles from './index.module.css';

export default function SecretPage() {
  // Check for first visit
  useEffect(() => {
    // if (typeof window == 'undefined') {  // Found from outside scource... hehehe. to find how to detect first visit on page
      const firstVisitCheck = localStorage.getItem('firstVisit');
      if (firstVisitCheck) {
        alert("Welcome to poop puncher! Dis is made by Lucas Cheng. Just figure stuff out, soooo... okie byyeee");
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
      }
    // }
  }, []);

  {/* VARIABLES */}
  const savedCount = typeof window !== 'undefined' ? parseInt(localStorage.getItem("count") || "0") : 0;
  const [count, setCount] = useState(savedCount);

  const savedLevel = typeof window !== 'undefined' ? parseInt(localStorage.getItem("level") || "1") : 1;
  const [level, setLevel] = useState(savedLevel);

  // Level
  const savedAmountOfCookiesForLevelUp = typeof window !== 'undefined' ? parseInt(localStorage.getItem("amountOfCookiesForLevelUp") || "100") : 100;
  const [amountOfCookiesForLevelUp, setAmountOfCookiesForLevelUp] = useState(savedAmountOfCookiesForLevelUp);

  const savedAddToAmountOfCookiesForLevelUp = typeof window !== 'undefined' ? parseInt(localStorage.getItem("addToAmountOfCookiesForLevelUp") || "100") : 100;
  const [addToAmountOfCookiesForLevelUp, setAddToAmountOfCookiesForLevelUp] = useState(savedAddToAmountOfCookiesForLevelUp);

  const savedPoopBarThing = typeof window !== 'undefined' ? parseInt(localStorage.getItem("poopBarThing") || "0") : 0;
  const [poopBarThing, setPoopBarThing] = useState(savedPoopBarThing);

  // Poops clicked ever
  const savedPoopsClickedEver = typeof window !== 'undefined' ? parseInt(localStorage.getItem("poopsClickedEver") || "0") : 0;
  const [poopsClickedEver, setPoopsClickedEver] = useState(savedPoopsClickedEver);

  // Poops per click
  const savedPoopPerClick = typeof window !== 'undefined' ? parseInt(localStorage.getItem("poopsPerClick") || "1") : 1;
  const [PoopPerClick, setPoopPerClick] = useState(savedPoopPerClick);

  const savedCostToBuyPoopClick = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToBuyPoopClick") || "100") : 100;
  const [costToBuyPoopClick, setCostToBuyPoopClick] = useState(savedCostToBuyPoopClick);

  const savedCostToAddCostToBuyPoopClick = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToAddCostToBuyPoopClick") || "10") : 10;
  const [costToAddCostToBuyPoopClick, setCostToAddCostToBuyPoopClick] = useState(savedCostToAddCostToBuyPoopClick);

  // Poops per second
  const savedDivideAmountOfPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("divideAmountOfPoopsPerSecond") || "0") : 0;
  const [divideAmountOfPoopsPerSecond, setDivideAmountOfPoopsPerSecond] = useState(savedDivideAmountOfPoopsPerSecond);

  const savedDisplayPoopPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("displayPoopPerSecond") || "0") : 0;
  const [displayPoopPerSecond, setDisplayPoopPerSecond] = useState(savedDisplayPoopPerSecond);

  const savedRealDivideAmountOfPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("realDivideAmountOfPoopsPerSecond") || "100") : 100;
  const [realDivideAmountOfPoopsPerSecond, setRealDivideAmountOfPoopsPerSecond] = useState(savedRealDivideAmountOfPoopsPerSecond);

  const savedAmountOfPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("amountOfPoopsPerSecond") || "0") : 0;
  const [amountOfPoopsPerSecond, setAmountOfPoopsPerSecond] = useState(savedAmountOfPoopsPerSecond);

  const savedDidExceedPoop = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("didExceedPoop") || "false") : false;
  const [didExceedPoop, setDidExceedPoop] = useState(savedDidExceedPoop);

  // Shop
  const savedCostToBuyPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToBuyPoopsPerSecond") || "100") : 100;
  const [costToBuyPoopsPerSecond, setCostToBuyPoopsPerSecond] = useState(savedCostToBuyPoopsPerSecond);

  const savedCostToAddCostBuyPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToAddCostBuyPoopsPerSecond") || "20") : 20;
  const [costToAddCostBuyPoopsPerSecond, setCostToAddCostBuyPoopsPerSecond] = useState(savedCostToAddCostBuyPoopsPerSecond);

  // Stuff
  const [isLotteryAvailable, setIsLotteryAvailable] = useState(false)
  const [isLottery, setIsLottery] = useState(false);

  const [isPooperManAreYouSure, setIsPooperManAreYouSure] = useState(false);

  const [isDogTurdAreYouSure, setIsDogTurdAreYouSure] = useState(false);

  const [isOmnipotentPoopAreYouSure, setIsOmnipotentPoopAreYouSure] = useState(false);

  function save() {
    if (typeof window !== 'undefined') {  // Ensure this runs only on the client
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
  }

  useEffect(() => { 
    if (level >= 3) {
      alert("Unlocked Lottery!");
      setIsLotteryAvailable(true);
    }
  }, [level, isLotteryAvailable]);

  function toggleIsLottery() {
    if (isLotteryAvailable) {
      setIsLottery((prevState) => !prevState);
    } else {
      alert("Get to level 3 first!")
    }
  }

  function toggleIsPooperManSure() {
    setIsPooperManAreYouSure((prevState) => !prevState);
  }

  function toggleIsDogTurdSure() {
    setIsDogTurdAreYouSure((prevState) => !prevState);
  }

  function toggleIsOmnipotentPoopSure() {
    setIsOmnipotentPoopAreYouSure((prevState) => !prevState);
  }
  

  function pooperManLotteryGo() {
    toggleIsPooperManSure()
    if (count >= 100) {
      setCount(count - 100);
      const winOrLose = Math.floor(Math.random() * 5);
      if (winOrLose == 0) {
        setCount(count + 500)
        setPoopsClickedEver(poopsClickedEver + 500)
        setPoopBarThing(poopBarThing + 500)
        alert('You won!!! yayyy :)')
      } else {
      alert('You lost... :(') 
      } 
    } else {
      alert("Stop GAMBLING YOU SICK ADDICTED DUMB AAA!!! GET SOME MORE POOPS, OR GET OUT!!!")
    }
  }

  function dogTurdLotteryGo() {
    toggleIsDogTurdSure()
    if (count >= 500) {
      setCount(count - 500);
      const winOrLose = Math.floor(Math.random() * 3);
      if (winOrLose == 0) {
        setCount(count + 1000)
        setPoopsClickedEver(poopsClickedEver + 1000)
        setPoopBarThing(poopBarThing + 1000)
        alert('You won!!! yayyy :)')
      } else {
      alert('You lost... :(') 
      } 
    } else {
      alert("Stop GAMBLING YOU SICK ADDICTED DUMB AAA!!! GET SOME MORE POOPS, OR GET OUT!!!")
    }
  }

  function ominpotentPoopLotteryGo() {
    toggleIsOmnipotentPoopSure()
    if (count >= 500) {
      setCount(count - 500);
      const winOrLose = Math.floor(Math.random() * 10);
      if (winOrLose == 0) {
        setCount(count + 2000)
        setPoopsClickedEver(poopsClickedEver + 2000)
        setPoopBarThing(poopBarThing + 2000)
        alert('You won!!! yayyy :)')
      } else {
      alert('You lost... :(') 
      } 
    } else {
      alert("Stop GAMBLING YOU SICK ADDICTED DUMB AAA!!! GET SOME MORE POOPS, OR GET OUT!!!")
    }
  }

  {/* WHAT HAPPENS WHEN CLICKED POOP */}
  function clickPoop() {
    setCount(count + PoopPerClick);
    setPoopsClickedEver(poopsClickedEver + PoopPerClick);
    setPoopBarThing(poopBarThing + PoopPerClick);
    save();
  }

  const [poopPressed, setPoopPressed] = useState(false);

  function handlePoopPress() {
    setPoopPressed(true);
  }

  function handlePoopRelease() {
    setPoopPressed(false);
  }

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

  useEffect(() => {
    if (poopBarThing >= amountOfCookiesForLevelUp) {
      setLevel((prevLevel) => prevLevel + 1);
      setPoopBarThing((prevPoopBarThing) => prevPoopBarThing - amountOfCookiesForLevelUp);
      setAmountOfCookiesForLevelUp((prevAmount) => prevAmount + addToAmountOfCookiesForLevelUp);
      setAddToAmountOfCookiesForLevelUp((prevAddAmount) => prevAddAmount + 50);
    }
  }, [poopBarThing, amountOfCookiesForLevelUp, addToAmountOfCookiesForLevelUp]);
  

  useEffect(() => {
    if (typeof window !== 'undefined') {  // Ensure this runs only on the client
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
    }
  }, [realDivideAmountOfPoopsPerSecond, amountOfPoopsPerSecond, divideAmountOfPoopsPerSecond]);

  useEffect(() => {
    setRealDivideAmountOfPoopsPerSecond(1000 / divideAmountOfPoopsPerSecond);
  }, [divideAmountOfPoopsPerSecond]);

  return (
    <div className={styles.body}>
      {/* FONTS */}
      {/* <link href="https://fonts.cdnfonts.com/css/jumbo-sale-trial" rel="stylesheet"></link>
      <style>@import url('https://fonts.cdnfonts.com/css/jumbo-sale-trial');</style> */}
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

        {/* Lottery */}

        <div className={styles.lotteryPicGroup} onClick={toggleIsLottery}>
          <img className={styles.lotteryPic} src={isLotteryAvailable ? "lotteryTicket.png" : 'lotteryTicketHide.png' } alt="lotteryTicketPic" />
          <span className={styles.lotteryPicLabel}><strong>Lottery</strong></span>
        </div>

        <div className={styles.lotteryScreen} style={{ opacity: isLottery ? 1 : 0, pointerEvents: isLottery ? 'all' : 'none'}}>
          <div className={styles.lotteryTitle}>Lottery</div>
          <button className={styles.lotteryXExit} onClick={toggleIsLottery}>&#10008;</button>


        <div className={styles.lotteryTickets}>
          {/* PooperMan */}
          <img onClick={toggleIsPooperManSure} className={styles.pooperManLottery} src="pooperManLottery.png" alt="PooperManLottery" />

          <div className={styles.areYouSurePooperManBody} style={{ opacity: isPooperManAreYouSure ? 1 : 0, pointerEvents: isPooperManAreYouSure ? 'all' : 'none'}}>
            <div className={styles.areYouSurePooperManBodyTitle}>Are you sure you want to buy Pooper Man? </div>
            <div onClick={pooperManLotteryGo}className={styles.yesDoPooperMan}>Yes</div>
            <div onClick={toggleIsPooperManSure}className={styles.noDoPooperMan}>No</div>
          </div>

          {/* Dog Turd */}

          <img onClick={toggleIsDogTurdSure} className={styles.pooperManLottery} src="dogTurdLottery.png" alt="DogTurdLottery" />

          <div className={styles.areYouSureDogTurdBody} style={{ opacity: isDogTurdAreYouSure ? 1 : 0, pointerEvents: isDogTurdAreYouSure ? 'all' : 'none'}}>
            <div className={styles.areYouSureDogTurdBodyTitle}>Are you sure you want to buy Dog Turd? </div>
            <div onClick={dogTurdLotteryGo}className={styles.yesDoDogTurd}>Yes</div>
            <div onClick={toggleIsDogTurdSure}className={styles.noDoDogTurd}>No</div>
          </div>

          {/* Omnipotent Poop */}

          <img onClick={toggleIsOmnipotentPoopSure} className={styles.omnipotentPoopLottery} src="omnipotentPoopLottery.png" alt="OmnipotentPoopLottery" />

          <div className={styles.areYouSureOmnipotentPoopBody} style={{ opacity: isOmnipotentPoopAreYouSure ? 1 : 0, pointerEvents: isOmnipotentPoopAreYouSure ? 'all' : 'none'}}>
            <div className={styles.areYouSureOmnipotentPoopBodyTitle}>Are you sure you want to buy Omnipotent Poop?</div>
            <div onClick={ominpotentPoopLotteryGo}className={styles.yesDoOmnipotentPoop}>Yes</div>
            <div onClick={toggleIsOmnipotentPoopSure}className={styles.noDoOmnipotentPoop}>No</div>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}
