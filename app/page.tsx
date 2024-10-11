'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import styles from './index.module.css';
import 'chart.js/auto';  // Automatically import everything needed for chart.js

export default function SecretPage() {
  const MAX_SECONDS = 30;  // Limit the number of seconds shown in the graph

  // On first visit, set up localStorage values
  useEffect(() => {
    if (typeof window !== 'undefined') {  // Ensure this runs only on the client
      const firstVisitCheck = localStorage.getItem('firstVisit');
      if (!firstVisitCheck) {
        alert("Welcome to poop puncher! Dis is made by Lucas Cheng...");
        localStorage.setItem('firstVisit', 'no');
        // Initialize game values in localStorage
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
        localStorage.setItem('stockPrices', JSON.stringify([100])); // Initialize stock prices
      }
    }
  }, []);


  // Initialize state from localStorage
  const savedCount = typeof window !== 'undefined' ? parseInt(localStorage.getItem("count") || "0") : 0;
  const [count, setCount] = useState(savedCount);

  const savedLevel = typeof window !== 'undefined' ? parseInt(localStorage.getItem("level") || "1") : 1;
  const [level, setLevel] = useState(savedLevel);

  // Level-related states
  const savedAmountOfCookiesForLevelUp = typeof window !== 'undefined' ? parseInt(localStorage.getItem("amountOfCookiesForLevelUp") || "100") : 100;
  const [amountOfCookiesForLevelUp, setAmountOfCookiesForLevelUp] = useState(savedAmountOfCookiesForLevelUp);

  const savedAddToAmountOfCookiesForLevelUp = typeof window !== 'undefined' ? parseInt(localStorage.getItem("addToAmountOfCookiesForLevelUp") || "100") : 100;
  const [addToAmountOfCookiesForLevelUp, setAddToAmountOfCookiesForLevelUp] = useState(savedAddToAmountOfCookiesForLevelUp);

  const savedPoopBarThing = typeof window !== 'undefined' ? parseInt(localStorage.getItem("poopBarThing") || "0") : 0;
  const [poopBarThing, setPoopBarThing] = useState(savedPoopBarThing);

  // Track poops clicked ever
  const savedPoopsClickedEver = typeof window !== 'undefined' ? parseInt(localStorage.getItem("poopsClickedEver") || "0") : 0;
  const [poopsClickedEver, setPoopsClickedEver] = useState(savedPoopsClickedEver);

  // Poops per click states
  const savedPoopPerClick = typeof window !== 'undefined' ? parseInt(localStorage.getItem("poopsPerClick") || "1") : 1;
  const [PoopPerClick, setPoopPerClick] = useState(savedPoopPerClick);

  const savedCostToBuyPoopClick = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToBuyPoopClick") || "100") : 100;
  const [costToBuyPoopClick, setCostToBuyPoopClick] = useState(savedCostToBuyPoopClick);

  const savedCostToAddCostToBuyPoopClick = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToAddCostToBuyPoopClick") || "10") : 10;
  const [costToAddCostToBuyPoopClick, setCostToAddCostToBuyPoopClick] = useState(savedCostToAddCostToBuyPoopClick);

  // Poops per second-related states
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

  // Shop-related states
  const savedCostToBuyPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToBuyPoopsPerSecond") || "100") : 100;
  const [costToBuyPoopsPerSecond, setCostToBuyPoopsPerSecond] = useState(savedCostToBuyPoopsPerSecond);

  const savedCostToAddCostBuyPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToAddCostBuyPoopsPerSecond") || "20") : 20;
  const [costToAddCostBuyPoopsPerSecond, setCostToAddCostBuyPoopsPerSecond] = useState(savedCostToAddCostBuyPoopsPerSecond);

  // UI toggle states for special interactions
  const [isLotteryAvailable, setIsLotteryAvailable] = useState(false);
  const [isLottery, setIsLottery] = useState(false);

  const [isPooperManAreYouSure, setIsPooperManAreYouSure] = useState(false);
  const [isDogTurdAreYouSure, setIsDogTurdAreYouSure] = useState(false);
  const [isOmnipotentPoopAreYouSure, setIsOmnipotentPoopAreYouSure] = useState(false);

  // Function to save current game state to localStorage
  function save() {
    if (typeof window !== 'undefined') {
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

  // STOCK MARKET
    // Stock market modal toggle state
    const [isStockMarketOpen, setIsStockMarketOpen] = useState(false);
    const [isStockMarketAvailable, setIsStockMarketAvailable] = useState(false)
    const [stockContained, setStockContained] = useState(0)
    const [moneyInStock, setMoneyInStock] =  useState(0)
    const [buyStockPrice, setBuyStockPrice] = useState(0)

    function toggleStockMarket() {
      if (isStockMarketAvailable == true) {
        setIsStockMarketOpen((prevState) => !prevState);
      } else {
        alert('Get to level 10 first!')
      }
    }

    // Check is stock market is available

    useEffect(() => {
      if (level >= 10) {
        setIsStockMarketAvailable(true);
      }
    }, [level, isStockMarketAvailable]);

    // Set new prices

    const [stockPrices, setStockPrices] = useState(() => {
      if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('stockPrices') || '[100]');
      }
      return [500];
    });


    // Simulate stock price changes
    const updateStockPrices = () => {
      const lastPrice = stockPrices[stockPrices.length - 1];
      const subNewPrice = lastPrice + (Math.random() * 10 - 5);

      setMoneyInStock(stockContained * subNewPrice)

      setBuyStockPrice(subNewPrice)
      // if (subNewPrice <= 0){
      //   const subNewPrice = lastPrice + 10
      // }
      const newPrice = subNewPrice
      setStockPrices((prevPrices: number[]) => {
        const updatedPrices = [...prevPrices, newPrice].slice(-MAX_SECONDS); 
        localStorage.setItem('stockPrices', JSON.stringify(updatedPrices)); 
        return updatedPrices || subNewPrice;
      });
    };
    
    // Update stock price every second
    useEffect(() => {
      const interval = setInterval(updateStockPrices, 5000); 
      return () => clearInterval(interval);
    }, [stockPrices]);

    // Buy stock
    function buyStock() {
      if (count >= Math.round(buyStockPrice)) {
        setCount(count - Math.round(buyStockPrice))
        setStockContained(stockContained + 1)
        alert(moneyInStock)
      } else {
        alert("You don't have enough poops poop head!")
      }
    }

    // Sell Stock
    function sellStock() {
      setCount(count + Math.round(buyStockPrice))
      setStockContained(stockContained - 1)
      alert(Math.round(buyStockPrice))
    }


    const stockMarketData = {
      labels: stockPrices.map((_: number, index: number) => index),  // Specify type for both _ and index as number
      datasets: [
        {
          label: 'Stock Contained: ' + stockContained + '        Current Stock Price: ' + Math.round(buyStockPrice),
          data: stockPrices,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          maintainAspectRatio: false,
        },
      ],
    };
    
    const stockMarketOptions = {
      responsive: true,
      maintainAspectRatio: false,  // Allow width and height to be set by container
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time (seconds)',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Price ($)',
          },
        },
      },
    };

  // LOTTERY
    // Check level for unlocking Lottery
    useEffect(() => {
      if (level >= 3) {
        setIsLotteryAvailable(true);
      }
    }, [level, isLotteryAvailable]);

    // Lottery toggle functions
    function toggleIsLottery() {
      if (isLotteryAvailable) {
        setIsLottery((prevState) => !prevState);
      } else {
        alert("Get to level 3 first!");
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

    // Lottery interaction functions
    function pooperManLotteryGo() {
      toggleIsPooperManSure();
      if (count >= 100) {
        setCount(count - 100);
        const winOrLose = Math.floor(Math.random() * 5);
        if (winOrLose === 0) {
          setCount(count + 500);
          setPoopsClickedEver(poopsClickedEver + 500);
          setPoopBarThing(poopBarThing + 500);
          alert('You won!!! yayyy :)');
        } else {
          alert('You lost... :(');
        }
      } else {
        alert("Stop GAMBLING... GET SOME MORE POOPS, OR GET OUT!!!");
      }
    }

    function dogTurdLotteryGo() {
      toggleIsDogTurdSure();
      if (count >= 500) {
        setCount(count - 500);
        const winOrLose = Math.floor(Math.random() * 3);
        if (winOrLose === 0) {
          setCount(count + 1000);
          setPoopsClickedEver(poopsClickedEver + 1000);
          setPoopBarThing(poopBarThing + 1000);
          alert('You won!!! yayyy :)');
        } else {
          alert('You lost... :(');
        }
      } else {
        alert("Stop GAMBLING... GET SOME MORE POOPS, OR GET OUT!!!");
      }
    }

    function ominpotentPoopLotteryGo() {
      toggleIsOmnipotentPoopSure();
      if (count >= 500) {
        setCount(count - 500);
        const winOrLose = Math.floor(Math.random() * 10);
        if (winOrLose === 0) {
          setCount(count + 2000);
          setPoopsClickedEver(poopsClickedEver + 2000);
          setPoopBarThing(poopBarThing + 2000);
          alert('You won!!! yayyy :)');
        } else {
          alert('You lost... :(');
        }
      } else {
        alert("Stop GAMBLING... GET SOME MORE POOPS, OR GET OUT!!!");
      }
    }

  // SHOP
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

    function clickPoop() {
      setCount(count + PoopPerClick);
      setPoopsClickedEver(poopsClickedEver + PoopPerClick);
      setPoopBarThing(poopBarThing + PoopPerClick);
      save();
    }

  // WHAT HAPPENS WHEN POOP PRESSED

    const [poopPressed, setPoopPressed] = useState(false);

    function handlePoopPress() {
      setPoopPressed(true);
    }

    function handlePoopRelease() {
      setPoopPressed(false);
    }
    
  // BACKROUND STUFF
      useEffect(() => {
      if (typeof window !== 'undefined') {
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

  // CHECK FOR LEVEL

    useEffect(() => {
      if (poopBarThing >= amountOfCookiesForLevelUp) {
        setLevel((prevLevel) => prevLevel + 1);
        setPoopBarThing((prevPoopBarThing) => prevPoopBarThing - amountOfCookiesForLevelUp);
        setAmountOfCookiesForLevelUp((prevAmount) => prevAmount + addToAmountOfCookiesForLevelUp);
        setAddToAmountOfCookiesForLevelUp((prevAddAmount) => prevAddAmount + 50);
      }
    }, [poopBarThing, amountOfCookiesForLevelUp, addToAmountOfCookiesForLevelUp]);
  
  return (
    <div className={styles.body}>
      {/* BACKGROUND IMAGE */}
      <img className={styles.backround} src="toiletPaperBackround.png" alt="" />

      {/* LEFT MENU */}
      <span className={styles.leftMenu}>
        <p className={styles.poopMarket}>Poop Market</p>
        <br />
        <button className={styles.morePoopClicker} onClick={morePoopPerClick}>
          Click to add more poop per click ({costToBuyPoopClick} Poops)
        </button>
        <br />
        <br />
        <button onClick={addMorePoopsPerSecond} className={styles.addMorePoopsPerSecond}>
          Click to add more poop per second ({costToBuyPoopsPerSecond} Poops)
        </button>
      </span>

      {/* RIGHT BAR (STATS) */}
      <div className={styles.rightBar}>
        <div className={styles.stats}>Stats</div>
        <br />
        <div className={styles.level}>
          Level: {level}
          <div
            className={styles.levelBar}
            style={{
              width: `${(poopBarThing / amountOfCookiesForLevelUp) * 100}%`,
              height: '20px',
              backgroundColor: 'green',
            }}
          ></div>
        </div>
        <br />
        <div className={styles.statsPoop}>Poops clicked: {count}</div>
        <br />
        <div className={styles.statsPoop}>Poops clicked ever: {poopsClickedEver}</div>
        <br />
        <div className={styles.statsShop}>Poops per click: {PoopPerClick}</div>
        <br />
        <div className={styles.statsShop}>Poops per second: {displayPoopPerSecond}</div>
      </div>

      {/* IMAGES AND INTERACTIONS */}
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

      {/* STUFF SECTION */}
      <div className={styles.stuff}>
        <div className={styles.stuffTitle}>Stuff</div>
        <br />

        {/* LOTTERY */}
        <div className={styles.stuffPicGroup} onClick={toggleIsLottery}>
          <img
            className={styles.lotteryPic}
            src={isLotteryAvailable ? "lotteryTicket.png" : "lotteryTicketHide.png"}
            alt="lotteryTicketPic"
          />
          <span className={styles.stuffPicLabel}>
            <strong>Lottery</strong>
          </span>
        </div>

        <div
          className={styles.stuffyScreen}
          style={{
            opacity: isLottery ? 1 : 0,
            pointerEvents: isLottery ? 'all' : 'none',
            zIndex: 1
          }}
        >
          <div className={styles.stuffyTitle}>Lottery</div>
          <button className={styles.stuffXExit} onClick={toggleIsLottery}>
            &#10008;
          </button>

          <div className={styles.lotteryTickets}>
            {/* PooperMan Lottery */}
            <img
              onClick={toggleIsPooperManSure}
              className={styles.pooperManLottery}
              src="pooperManLottery.png"
              alt="PooperManLottery"
            />
            <div
              className={styles.areYouSurePooperManBody}
              style={{
                opacity: isPooperManAreYouSure ? 1 : 0,
                pointerEvents: isPooperManAreYouSure ? 'all' : 'none',
              }}
            >
              <div className={styles.areYouSurePooperManBodyTitle}>
                Are you sure you want to buy Pooper Man?
              </div>
              <div onClick={pooperManLotteryGo} className={styles.yesDoPooperMan}>
                Yes
              </div>
              <div onClick={toggleIsPooperManSure} className={styles.noDoPooperMan}>
                No
              </div>
            </div>

            {/* Dog Turd Lottery */}
            <img
              onClick={toggleIsDogTurdSure}
              className={styles.pooperManLottery}
              src="dogTurdLottery.png"
              alt="DogTurdLottery"
            />
            <div
              className={styles.areYouSureDogTurdBody}
              style={{
                opacity: isDogTurdAreYouSure ? 1 : 0,
                pointerEvents: isDogTurdAreYouSure ? 'all' : 'none',
              }}
            >
              <div className={styles.areYouSureDogTurdBodyTitle}>
                Are you sure you want to buy Dog Turd?
              </div>
              <div onClick={dogTurdLotteryGo} className={styles.yesDoDogTurd}>
                Yes
              </div>
              <div onClick={toggleIsDogTurdSure} className={styles.noDoDogTurd}>
                No
              </div>
            </div>

            {/* Omnipotent Poop Lottery */}
            <img
              onClick={toggleIsOmnipotentPoopSure}
              className={styles.omnipotentPoopLottery}
              src="omnipotentPoopLottery.png"
              alt="OmnipotentPoopLottery"
            />
            <div
              className={styles.areYouSureOmnipotentPoopBody}
              style={{
                opacity: isOmnipotentPoopAreYouSure ? 1 : 0,
                pointerEvents: isOmnipotentPoopAreYouSure ? 'all' : 'none',
              }}
            >
              <div className={styles.areYouSureOmnipotentPoopBodyTitle}>
                Are you sure you want to buy Omnipotent Poop?
              </div>
              <div onClick={ominpotentPoopLotteryGo} className={styles.yesDoOmnipotentPoop}>
                Yes
              </div>
              <div onClick={toggleIsOmnipotentPoopSure} className={styles.noDoOmnipotentPoop}>
                No
              </div>
            </div>
          </div>
        </div>
        <br />

        {/* STOCK MARKET */}
        <div className={styles.stuffPicGroup} onClick={toggleStockMarket}>
          <img className={styles.stockMarketPic} src={isStockMarketAvailable ? "stockMarketPic.png":"stockMarketPicHide.png"} alt="stockMarketPic" />
          <span className={styles.stuffPicLabel}><strong>Stock Market</strong></span>
        </div>


        {/* Stock Market Modal */}
        <div
          className={styles.stuffyScreen}
          style={{
            opacity: isStockMarketOpen ? 1 : 0,
            pointerEvents: isStockMarketOpen ? 'all' : 'none',
          }}
        >
          <div className={styles.stuffyTitle}>Stock Market</div>
          <button onClick={buyStock} className={styles.buyStock}>Buy</button>
          <button onClick={sellStock} className={styles.sellStock}>Sell</button>
          <button className={styles.stuffXExit} onClick={toggleStockMarket}>
            &#10008;
          </button>
          {/* Stock Market Graph */}
          <div className={styles.stockMarketGraphContainer}>
            <div className={styles.stockMarketGraph}>
              <Line data={stockMarketData} options={stockMarketOptions} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
