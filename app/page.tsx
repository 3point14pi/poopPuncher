'use client';

import { useState, useEffect, useRef} from 'react';
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
        alert("Welcome to poop puncher! Dis is made by Lucas Cheng... Also credit to ben for helping give ideas :)");
        localStorage.setItem('firstVisit', 'no');
        localStorage.setItem('didChooseLanguage', JSON.stringify(false));
        localStorage.setItem('language', '');
        // Initialize game values in localStorage
        localStorage.setItem('count', JSON.stringify(0));
        localStorage.setItem('level', JSON.stringify(1));
        localStorage.setItem('gameName', 'My Skibidi Toilet');
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
        localStorage.setItem('costToBuyTenPoopsPerSecond', JSON.stringify(900));
        localStorage.setItem('costToAddCostBuyTenPoopsPerSecond', JSON.stringify(20));
        localStorage.setItem('stockPrices', JSON.stringify([100])); // Initialize stock prices
        localStorage.setItem('isAutoClickerAllowed', JSON.stringify([false]));
        localStorage.setItem('howManyTimeAutoClicked', JSON.stringify([0]));
        localStorage.setItem('isDoubleCount', JSON.stringify([false]));
        localStorage.setItem('isDoubleClickPerSecond', JSON.stringify([false]));
        localStorage.setItem('isHalvePrice', JSON.stringify([false]));
        localStorage.setItem('costToBuyTenPoopsPerClick', JSON.stringify([900]));
        localStorage.setItem('costToAddCostBuyTenPoopsPerClick', JSON.stringify([20]));
        localStorage.setItem('poopPerFrog', JSON.stringify([10]));
        localStorage.setItem('frogsPerSecond', JSON.stringify(0.1));
        localStorage.setItem('isCentiPoop', JSON.stringify(false));
        localStorage.setItem('isPoopFactory', JSON.stringify(false));
        localStorage.setItem('didWinOmnioptentPoop', JSON.stringify(false));
      }
    }
  }, []);

  // Updates

  const savedUpdate = typeof window !== 'undefined' ? (localStorage.getItem("update") || 1.0) : 1.0;
  const [update, setUpdate] = useState(savedUpdate);

  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (update !== 2.0) {
      setShowUpdate(true)
      setUpdate(2.0)
      save()
    } else {
      setShowUpdate(false)
    }
  })

  function hideUpdate() {
    setShowUpdate(false)
    save()
    alert(showUpdate)
    setUpdate(2.0)
  }


  
  // Initialize `didChooseLanguage` from localStorage once on initial render
  // const initialDidChooseLanguage = typeof window !== 'undefined' ? parseInt(localStorage.getItem("didChooseLanguage") || "false") : false;
  const [didChooseLanguage, setDidChooseLanguage] = useState(true);

  // Update localStorage when `didChooseLanguage` changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('didChooseLanguage', JSON.stringify(didChooseLanguage));
    }
  }, [didChooseLanguage]);

  // Language selection functions
  function choseAmerica() {
    setDidChooseLanguage(true);
    setLanguage("English");
  }

  function choseJapanese() {
    setDidChooseLanguage(true);
    window.location.href = "/japanese";
    setLanguage("Japanese");
  }

  // Initialize and update the `language` state
  const initialLanguage = typeof window !== 'undefined' ? (localStorage.getItem("language") || "") : "";
  const [language, setLanguage] = useState(initialLanguage);

  // Redirect if language is set to Japanese
  useEffect(() => {
    if (language === "Japanese") {
      window.location.href = "/japanese";
    } else if (language === 'English') {
      setDidChooseLanguage(true)
    } else {
      setDidChooseLanguage(false)
    }
  }, [language]);
  

  // Initialize state from localStorage
  const savedCount = typeof window !== 'undefined' ? parseInt(localStorage.getItem("count") || "0") : 0;
  const [count, setCount] = useState(savedCount);

  const savedLevel = typeof window !== 'undefined' ? parseInt(localStorage.getItem("level") || "1") : 1;
  const [level, setLevel] = useState(savedLevel);

  // Lazy initialization for gameName using localStorage
  const [gameName, setGameName] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('gameName');
      return savedName || 'My Skibidi Toilet (changable)'; // Default value if not found
    }
    return 'My Skibidi Toilet'; // Fallback value if window is not available
  });

  // Level-related statess
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

  const savedAmountOfPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("amountOfPoopsPerSecond") || "0") : 0;
  const [amountOfPoopsPerSecond, setAmountOfPoopsPerSecond] = useState(savedAmountOfPoopsPerSecond);

  // Shop-related states
  const savedCostToBuyPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToBuyPoopsPerSecond") || "100") : 100;
  const [costToBuyPoopsPerSecond, setCostToBuyPoopsPerSecond] = useState(savedCostToBuyPoopsPerSecond);

  const savedCostToAddCostBuyPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToAddCostBuyPoopsPerSecond") || "20") : 20;
  const [costToAddCostBuyPoopsPerSecond, setCostToAddCostBuyPoopsPerSecond] = useState(savedCostToAddCostBuyPoopsPerSecond);

  const savedCostToBuyTenPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToBuyTenPoopsPerSecond") || "900") : 900;
  const [costToBuyTenPoopsPerSecond, setCostToBuyTenPoopsPerSecond] = useState(savedCostToBuyTenPoopsPerSecond);

  const savedCostToAddCostBuyTenPoopsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToAddCostBuyTenPoopsPerSecond") || "20") : 20;
  const [costToAddCostBuyTenPoopsPerSecond, setCostToAddCostBuyTenPoopsPerSecond] = useState(savedCostToAddCostBuyTenPoopsPerSecond);

  const savedCostToBuyTenPoopsPerClick = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToBuyTenPoopsPerClick") || "900") : 900;
  const [costToBuyTenPoopsPerClick, setCostToBuyTenPoopsPerClick] = useState(savedCostToBuyTenPoopsPerClick);

  const savedCostToAddCostBuyTenPoopsPerClick = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToAddCostBuyTenPoopsPerClick") || "20") : 20;
  const [costToAddCostBuyTenPoopsPerClick, setCostToAddCostBuyTenPoopsPerClick] = useState(savedCostToAddCostBuyTenPoopsPerClick);

  // UI toggle states for special interactions
  const [isLotteryAvailable, setIsLotteryAvailable] = useState(false);
  const [isLottery, setIsLottery] = useState(false);

  const [isPooperManAreYouSure, setIsPooperManAreYouSure] = useState(false);
  const [isDogTurdAreYouSure, setIsDogTurdAreYouSure] = useState(false);
  const [isOmnipotentPoopAreYouSure, setIsOmnipotentPoopAreYouSure] = useState(false);

  function save() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('update', JSON.stringify(update));
        localStorage.setItem('count', JSON.stringify(count));
        localStorage.setItem('didChooseLanguage', JSON.stringify(didChooseLanguage));
        localStorage.setItem('language', language);
        localStorage.setItem('level', JSON.stringify(level));
        localStorage.setItem('gameName', gameName);
        localStorage.setItem('amountOfCookiesForLevelUp', JSON.stringify(amountOfCookiesForLevelUp));
        localStorage.setItem('addToAmountOfCookiesForLevelUp', JSON.stringify(addToAmountOfCookiesForLevelUp));
        localStorage.setItem('poopBarThing', JSON.stringify(poopBarThing));
        localStorage.setItem('poopsClickedEver', JSON.stringify(poopsClickedEver));
        localStorage.setItem('poopsPerClick', JSON.stringify(PoopPerClick));
        localStorage.setItem('costToBuyPoopClick', JSON.stringify(costToBuyPoopClick));
        localStorage.setItem('costToAddCostToBuyPoopClick', JSON.stringify(costToAddCostToBuyPoopClick));
        localStorage.setItem('amountOfPoopsPerSecond', JSON.stringify(amountOfPoopsPerSecond));
        localStorage.setItem('costToBuyPoopsPerSecond', JSON.stringify(costToBuyPoopsPerSecond));
        localStorage.setItem('costToAddCostBuyPoopsPerSecond', JSON.stringify(costToAddCostBuyPoopsPerSecond));
        localStorage.setItem('costToBuyTenPoopsPerSecond', JSON.stringify(costToBuyTenPoopsPerSecond));
        localStorage.setItem('costToAddCostBuyTenPoopsPerSecond', JSON.stringify(costToAddCostBuyTenPoopsPerSecond));
        localStorage.setItem('costToBuyTenPoopsPerClick', JSON.stringify(costToBuyTenPoopsPerClick));
        localStorage.setItem('costToAddCostBuyTenPoopsPerClick', JSON.stringify(costToAddCostBuyTenPoopsPerClick));
        localStorage.setItem('stockPrices', JSON.stringify(stockPrices));
        localStorage.setItem('stockContained', JSON.stringify(stockContained));
        localStorage.setItem('isDoubleCount', JSON.stringify(stockContained));
        localStorage.setItem('isDoubleClickPerSecond', JSON.stringify(isDoubleClickPerSecond));
        localStorage.setItem('isHalvePrice', JSON.stringify(isHalvePrice));
        localStorage.setItem('didBuyTenStocks', JSON.stringify(didBuyTenStocks));
        localStorage.setItem('isHalveStockPrice', JSON.stringify(isHalveStockPrice));
        localStorage.setItem('isMoreLotteryLuck', JSON.stringify(isMoreLotteryLuck));
        localStorage.setItem('howManyTimeAutoClicked', JSON.stringify(howManyTimeAutoClicked));
        localStorage.setItem('isAutoClickerAllowed', JSON.stringify(isAutoClickerAllowed));
        localStorage.setItem('frogsPerSecond', JSON.stringify(frogsPerSecond));
        localStorage.setItem('poopPerFrog', JSON.stringify(poopPerFrog));
        localStorage.setItem('costToBuyFrogsPerSecond', JSON.stringify(costToBuyFrogsPerSecond));
        localStorage.setItem('addToCostFrogsPerSecond', JSON.stringify(addToCostFrogsPerSecond));
        localStorage.setItem('costToBuyPoopPerFrog', JSON.stringify(costToBuyPoopPerFrog));
        localStorage.setItem('addToCostPoopPerFrog', JSON.stringify(addToCostPoopPerFrog));
        localStorage.setItem('isCentiPoop', JSON.stringify(isCentiPoop));
        localStorage.setItem('isPoopFactory', JSON.stringify(isPoopFactory));
        localStorage.setItem('didWinOmnioptentPoop', JSON.stringify(didWinOmnioptentPoop));
        console.log('Data saved successfully');
      }
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    }
  }

  // SETTINGS
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  function toggleIsSettings() {
    setIsSettingsOpen((prevState) => !prevState)
  }
  //  ACHIEVMENTS

  const savedIsCentiPoop = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("isCentiPoop") || "false") : false;
  const [isCentiPoop, setIsCentiPoop] = useState(savedIsCentiPoop);  

  const savedIsPoopFactory = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("isPoopFactory") || "false") : false;
  const [isPoopFactory, setisPoopFactory] = useState(savedIsPoopFactory)

  const savedDidWinOmnioptentPoop = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("didWinOmnioptentPoop") || "false") : false;
  const [didWinOmnioptentPoop, setDidWinOmnioptentPoop] = useState(savedDidWinOmnioptentPoop)

  useEffect(() => {
    console.log(amountOfPoopsPerSecond, isCentiPoop)
    if (count >= 100 && isCentiPoop == false) {
      setIsCentiPoop(true)
      alert("You won the centi poop badge!")
    } if (amountOfPoopsPerSecond >= 150 && isPoopFactory == false) {
      setisPoopFactory(true)
      alert("You won the poop factory  badge!")
    }
  }, [count])

// Add all the state variables that trigger save when changed
  useEffect(() => {
    save();
  }, [count, level, gameName, amountOfCookiesForLevelUp, addToAmountOfCookiesForLevelUp, poopBarThing, poopsClickedEver, PoopPerClick, costToBuyPoopClick, costToAddCostToBuyPoopClick, amountOfPoopsPerSecond, costToBuyPoopsPerSecond, costToAddCostBuyPoopsPerSecond, didChooseLanguage, language]);

  

  // DEV MODE

  useEffect(() => {
    if (gameName == '@!') {
      setGameName("Oink")
      alert('Dev Mode enabled! If you are not a dev, change your name immedietly, or you will be banned!')
      setPoopPerClick(100000)
    } if (gameName == 'raindeer wang') {
      setCount(400000000)
    }
  }, [gameName]); 
// Add this useEffect hook to your component
  useEffect(() => {
    if (gameName.toLowerCase() === 'restart the game') {
      alert('The game is being restarted!');
      localStorage.clear(); // This will clear the entire localStorage
      // Reset all state hooks hrere
      setIsDoubleCount(false)
      setCount(0);
      setLevel(1);
      setGameName('My Skibidi Toilet');
      setAmountOfCookiesForLevelUp(100);
      setAddToAmountOfCookiesForLevelUp(100);
      setPoopBarThing(0);
      setPoopsClickedEver(0);
      setPoopPerClick(1);
      setCostToBuyPoopClick(100);
      setCostToAddCostToBuyPoopClick(10);
      setAmountOfPoopsPerSecond(0);
      setCostToBuyPoopsPerSecond(100);
      setCostToAddCostBuyPoopsPerSecond(20);
      setCostToBuyTenPoopsPerSecond(900);
      setCostToAddCostBuyTenPoopsPerSecond(20);
      setStockPrices([100]);
      setStockContained(0);
      setIsLotteryAvailable(false);
      setIsPooperManAreYouSure(false);
      setIsDogTurdAreYouSure(false);
      setIsOmnipotentPoopAreYouSure(false);
      setIsStockMarketAvailable(false);
      setIsStockMarketOpen(false);
      setIsDoubleCount(false)
      setIsDoubleClickPerSecond(false);
      setIsHalvePrice(false);
      setDidBuyTenStocks(false);
      setIsMoreLotteryLuck(false);
      setIsAutoClickerAllowed(false);
      setIsFrogTurdAvailable(false);
      setPoopPerFrog(10);
      setFrogsPerSecond(0.5);
      setCostToBuyFrogsPerSecond(100);
      setAddToCostFrogsPerSecond(10);
      setCostToBuyPoopPerFrog(100);
      setAddToCostPoopPerFrog(10);
      setIsCentiPoop(false);
      setisPoopFactory(false);
      setDidWinOmnioptentPoop(false);
      localStorage.clear(); // Clear everything
    }
  }, [gameName]);


  useEffect(() => {
    if (gameName == 'ben the great') {
      alert('I see you are ben... I shall grant you stuf heheheh! but not until u tell me wut you need in the chat')
      setPoopPerClick(215)
      setAmountOfPoopsPerSecond(150)
      setLevel(200)
      setCount(100000)
      setStockContained(59800)
    }
  }, [gameName]); 

  // STOCK MARKET
    // Stock market modal toggle state
    const [isStockMarketOpen, setIsStockMarketOpen] = useState(false);
    const [isStockMarketAvailable, setIsStockMarketAvailable] = useState(false)

    const savedStockContained = typeof window !== 'undefined' ? parseInt(localStorage.getItem("stockContained") || "0") : 0;
    const [stockContained, setStockContained] = useState(savedStockContained)

    const savedBuyStockPrice = typeof window !== 'undefined' ? parseInt(localStorage.getItem("buyStockPrice") || "0") : 0;
    const [buyStockPrice, setBuyStockPrice] = useState(savedBuyStockPrice)

    const savedPriceOfStockLastBought = typeof window !== 'undefined' ? parseInt(localStorage.getItem("priceOfStockLastBought") || "0") : 0;
    const [priceOfStockLastBought, setPriceOfStockLastBought] = useState(savedPriceOfStockLastBought)

    // const [stocksToBuy, setStocksToBuy] = useState(1)
    

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
    
      // Ensure stock price doesn't go negative
      const newPrice = subNewPrice <= 0 ? 1 : subNewPrice; // Using a ternary operator to avoid negative prices
    
      setBuyStockPrice(newPrice);
    
      setStockPrices((prevPrices: number[]) => {
        const updatedPrices = [...prevPrices, newPrice].slice(-MAX_SECONDS);
        localStorage.setItem('stockPrices', JSON.stringify(updatedPrices));
        return updatedPrices;
      });
    };
    
    
    
    // Update stock price every second
    useEffect(() => {
      const interval = setInterval(updateStockPrices, 5000); 
      return () => clearInterval(interval);
    }, [stockPrices]);

    // Buy stock
    function buyStock() {
      if (isHalveStockPrice == true) {
        if (count >= Math.round(buyStockPrice*0.75)) {
          setCount(count - Math.round(buyStockPrice*0.75))
          setPriceOfStockLastBought(Math.round(buyStockPrice)*0.75)
          setStockContained(stockContained + 1)
        } else {
          alert("You don't have enough poops poop head!")
          }
      } else {
        if (count >= Math.round(buyStockPrice)) {
          setCount(count - Math.round(buyStockPrice))
          setPriceOfStockLastBought(Math.round(buyStockPrice))
          setStockContained(stockContained + 1)
        } else {
          alert("You don't have enough poops poop head!")
        }
      }
    }

    // Sell Stock
    function sellStock() { 
      if (stockContained > 0) {
        setCount(count + Math.round(buyStockPrice))
        setPoopsClickedEver(poopsClickedEver + Math.round(buyStockPrice))
        setStockContained(stockContained - 1)
        console.log(Math.round(buyStockPrice))
      } else {
        alert("ya don't have no stocks to sell poopy!")
      }
    }


    const stockMarketData = {
      labels: stockPrices.map((_: number, index: number) => index),  // Specify type for both _ and index as number
      datasets: [
        {
          label: 'Stock Contained: ' + stockContained + '        Current Stock Price: ' + Math.round(buyStockPrice) + '        Price of stock last bought: ' + Math.round(priceOfStockLastBought),
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
      animation: {
        duration: 0, // Speed up the animation
        easing: 'linear' as const, // Use a valid easing value from Chart.js
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time',
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
        const winOrLose = Math.floor(Math.random() * 2);
        if (isMoreLotteryLuck) {
          if (winOrLose == 0) {
            setCount(count + 500);
            setPoopsClickedEver(poopsClickedEver + 500);
            setPoopBarThing(poopBarThing + 500);
            alert('You won!!! yayyy :)');
          } else {
            alert('You lost... :(');
          }
        } else {
          if (winOrLose == 0) {
            setCount(count + 500);
            setPoopsClickedEver(poopsClickedEver + 500);
            setPoopBarThing(poopBarThing + 500);
            alert('You won!!! yayyy :)');
          } else {
            alert('You lost... :(');
          }
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
        if (isMoreLotteryLuck) {
          if (winOrLose === 0) {
            setCount(count + 1000);
            setPoopsClickedEver(poopsClickedEver + 1000);
            setPoopBarThing(poopBarThing + 1000);
            alert('You won!!! yayyy :)');
          } else {
            alert('You lost... :(');
          }
        } else {
          if (winOrLose === 0) {
            setCount(count + 1000);
            setPoopsClickedEver(poopsClickedEver + 1000);
            setPoopBarThing(poopBarThing + 1000);
            alert('You won!!! yayyy :)');
          } else {
            alert('You lost... :(');
          }
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
        if (isMoreLotteryLuck) {
          if (winOrLose === 0) {
            setCount(count + 2000);
            setPoopsClickedEver(poopsClickedEver + 2000);
            setPoopBarThing(poopBarThing + 2000);
            alert('You won!!! yayyy :)');
            if (didWinOmnioptentPoop == true) {
              setDidWinOmnioptentPoop(true)
              alert("You won the omnipotent poop badge!")
            }
          } else {
            alert('You lost... :(');
          }
        } else {
          if (winOrLose === 0) {
            setCount(count + 2000);
            setPoopsClickedEver(poopsClickedEver + 2000);
            setPoopBarThing(poopBarThing + 2000);
            setDidWinOmnioptentPoop(true)
            alert('You won!!! yayyy :)');
          } else {
            alert('You lost... :(');
          }
        }
      } else {
        alert("Stop GAMBLING... GET SOME MORE POOPS, OR GET OUT!!!");
      }
    }

  // Frog Turd

  const [isFrogTurdOpen, setIsFrogTurdOpen] = useState(false);
  const [isFrogTurdAvailable, setIsFrogTurdAvailable] = useState(false);
  const isFrogTurdOpenRef = useRef(isFrogTurdOpen); // Ref to track isFrogTurdOpen

  const savedPoopPerFrog = typeof window !== 'undefined' ? parseInt(localStorage.getItem("poopPerFrog") || "10") : 10;
  const [poopPerFrog, setPoopPerFrog] = useState(savedPoopPerFrog);

  const savedCostToBuyPoopPerFrog = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToBuyPoopPerFrog") || "100") : 100;
  const [costToBuyPoopPerFrog, setCostToBuyPoopPerFrog] = useState(savedCostToBuyPoopPerFrog);

  const savedAddToCostPoopPerFrog = typeof window !== 'undefined' ? parseInt(localStorage.getItem("addToCostPoopPerFrog") || "20") : 20;
  const [addToCostPoopPerFrog, setAddToCostPoopPerFrog] = useState(savedAddToCostPoopPerFrog);

  const savedFrogsPerSecond = typeof window !== 'undefined' ? parseFloat(localStorage.getItem("frogsPerSecond") || "0.1") : 0.1;
  const [frogsPerSecond, setFrogsPerSecond] = useState(savedFrogsPerSecond);

  const savedCostToBuyFrogsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("costToBuyFrogsPerSecond") || "100") : 100;
  const [costToBuyFrogsPerSecond, setCostToBuyFrogsPerSecond] = useState(savedCostToBuyFrogsPerSecond);

  const savedAddToCostFrogsPerSecond = typeof window !== 'undefined' ? parseInt(localStorage.getItem("addToCostFrogsPerSecond") || "20") : 20;
  const [addToCostFrogsPerSecond, setAddToCostFrogsPerSecond] = useState(savedAddToCostFrogsPerSecond);

  function addPoopPerFrog() {
    if (count >= costToBuyPoopPerFrog) {
      setPoopPerFrog(poopPerFrog + 1)
      setCount(count - costToBuyPoopPerFrog)
      setCostToBuyPoopPerFrog(costToBuyPoopPerFrog + addToCostPoopPerFrog)
      setAddToCostPoopPerFrog(addToCostPoopPerFrog + 10)
    } else {
      alert("You don't have enough poops poop head!")
    }
  }

  function addFrogsPerSecond() {
    if (count >= costToBuyFrogsPerSecond) {
      setFrogsPerSecond(prevFrogsPerSecond => {
        const newFrogsPerSecond = parseFloat((prevFrogsPerSecond + 0.1).toFixed(3));
        return newFrogsPerSecond;
      });
      setCount(count - costToBuyFrogsPerSecond);
      setCostToBuyFrogsPerSecond(costToBuyFrogsPerSecond + addToCostFrogsPerSecond);
      setAddToCostFrogsPerSecond(addToCostFrogsPerSecond + 10);
    } else {
      alert("You don't have enough poops poop head!");
    }
  }
  
  

  // Keep the ref in sync with the state
  useEffect(() => {
    isFrogTurdOpenRef.current = isFrogTurdOpen;
  }, [isFrogTurdOpen]);

  useEffect(() => {
    if (level >= 50) {
      setIsFrogTurdAvailable(true)
    }
  }, [level]);

  // Function to increment the count when a frog is clicked
  function incrementCount() {
    setCount(prevCount => prevCount + poopPerFrog)
    setPoopsClickedEver(prevCount => prevCount + poopPerFrog);
    setPoopBarThing(prevCount => prevCount + poopPerFrog);
  }

  function toggleIsFrogTurdOpen() {
    if (isFrogTurdAvailable) {
      setIsFrogTurdOpen((prevState) => !prevState);
    } else {
      alert('You need to get to level 50 first!')
    }
  }

  // Frog class definition
  class Frog {
    private element: HTMLImageElement;
    private positionX: number = 0;
    private positionY: number = 0;
    public jumpingUp: boolean = true;
    public isJumpingToToilet: boolean = false;
    public isOnToilet: boolean = false;
    private screenWidth: number = window.innerWidth;
    private removed: boolean = false;
    

    constructor(isFrogTurdOpenRef: React.MutableRefObject<boolean>) {
      this.element = document.createElement('img');
      this.element.src = 'daFrog.png'; // Replace with your frog image path
      this.element.classList.add('frog');
      this.element.style.width = '100px';
      this.element.style.position = 'absolute';
      this.element.style.bottom = '30px'; // Start at a reasonable vertical position
      this.element.style.left = '0px'; // Start at the left side of the screen
      this.element.style.opacity = isFrogTurdOpenRef.current ? '1' : '0';
      this.element.style.pointerEvents = isFrogTurdOpenRef.current ? 'all' : 'none';
      this.element.style.zIndex = '10000000000';
      document.body.appendChild(this.element);

      // Add an event listener to the frog element
      this.element.addEventListener('click', this.handleClick.bind(this));

      // Start moving and jumping
      setInterval(() => this.move(isFrogTurdOpenRef), 16); // Smooth forward movement
      setInterval(() => this.jump(isFrogTurdOpenRef), 50); // Smooth jumping
    }

    // Method to handle the click event
    handleClick() {
      if (!this.removed) {
        this.remove(); // Optionally remove the frog after the click
      }
    }

    // Method to move the frog forward
    move(isFrogTurdOpenRef: React.MutableRefObject<boolean>) {
      if (!this.removed) {
        // Check if isFrogTurdOpen is false and set visibility accordingly
        this.element.style.opacity = isFrogTurdOpenRef.current ? '1' : '0';
        this.element.style.pointerEvents = isFrogTurdOpenRef.current ? 'all' : 'none';

        this.positionX += 1;
        this.updateTransform();

        if (this.positionX > this.screenWidth - 200) {
          this.remove(); // Remove frog if it reaches the right side of the screen
        }

        if (this.positionX >= this.screenWidth - 300) {
          if (this.jumpingUp) {
            this.isJumpingToToilet = true;
            this.positionY -= 2; // Jumping up
            if (this.positionY <= -100) {
              this.jumpingUp = false; // Start falling down
            }
          }
        }

        if (this.positionX > this.screenWidth) {
          this.isOnToilet = true;
        }
      }
    }

    // Method to handle the frog's jumping up and down
    jump(isFrogTurdOpenRef: React.MutableRefObject<boolean>) {
      if (!this.removed && !this.isJumpingToToilet && isFrogTurdOpenRef.current) {
        if (this.jumpingUp) {
          this.positionY -= 2; // Jumping up
          if (this.positionY <= -10) {
            this.jumpingUp = false; // Start falling down
          }
        } else {
          this.positionY += 2; // Falling down
          if (this.positionY >= 0) {
            this.jumpingUp = true; // Start jumping up again
          }
        }
        this.updateTransform();
      }
    }

    // Method to remove the frog from the DOM
    remove() {
      if (!this.removed) {
        this.element.remove(); // Remove the frog's HTML element
        incrementCount(); // Increment the count when the frog is removed
        this.removed = true; // Mark as removed to prevent further updates
      }
    }

    // Method to update the transformation (position + flipping)
    updateTransform() {
      this.element.style.transform = `translate(${this.positionX}px, ${this.positionY}px)`;
    }
  }

  // Function to create new frogs
  function createFrog() {
    new Frog(isFrogTurdOpenRef); // Pass the isFrogTurdOpenRef to each new Frog instance
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFrogTurdAvailable) {
        createFrog(); // Create a new frog every second when isFrogTurdOpen is true
      }
    }, 1000 / frogsPerSecond);
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, [isFrogTurdOpen, frogsPerSecond, isFrogTurdAvailable]); // Add isFrogTurdOpen and frogsPerSecond as dependencies  
  


  // SHOP
    function morePoopPerClick() {
      if (isHalvePrice == true) {
        if (count >= costToBuyPoopClick/2) {
          setPoopPerClick(PoopPerClick + 1);
          setCostToBuyPoopClick(costToBuyPoopClick + costToAddCostToBuyPoopClick);
          setCostToAddCostToBuyPoopClick(costToAddCostToBuyPoopClick + 5);
          setCount(count - costToBuyPoopClick/2);
        } else {
          alert("You don't have enough poops you poop head!");
        }
      } else {
        if (count >= costToBuyPoopClick) {
          setPoopPerClick(PoopPerClick + 1);
          setCostToBuyPoopClick(costToBuyPoopClick + costToAddCostToBuyPoopClick);
          setCostToAddCostToBuyPoopClick(costToAddCostToBuyPoopClick + 5);
          setCount(count - costToBuyPoopClick);
        } else {
          alert("You don't have enough poops you poop head!");
        }
      }
    }

    const addMorePoopsPerSecond = () => {
      if (isHalvePrice == true){
        if (count >= costToBuyPoopsPerSecond/2) {
          setCount(count - costToBuyPoopsPerSecond/2);
          setCostToBuyPoopsPerSecond(costToBuyPoopsPerSecond + costToAddCostBuyPoopsPerSecond);
          setCostToAddCostBuyPoopsPerSecond(costToAddCostBuyPoopsPerSecond + 20);
          setAmountOfPoopsPerSecond(amountOfPoopsPerSecond + 1)
        } else {
          alert("You don't have enough poops you poop head!");
        }
      } else {
        if (count >= costToBuyPoopsPerSecond) {
          setCount(count - costToBuyPoopsPerSecond);
          setCostToBuyPoopsPerSecond(costToBuyPoopsPerSecond + costToAddCostBuyPoopsPerSecond);
          setCostToAddCostBuyPoopsPerSecond(costToAddCostBuyPoopsPerSecond + 20);
          setAmountOfPoopsPerSecond(amountOfPoopsPerSecond + 1)
        } else {
          alert("You don't have enough poops you poop head!");
        }
      }
    };

    function addTenMorePoopsPerSecond() {
      if (isHalvePrice == true) {
        if (count >= costToBuyTenPoopsPerSecond/2) {
          setCount(count - costToBuyTenPoopsPerSecond/2)
          setCostToBuyTenPoopsPerSecond(costToBuyTenPoopsPerSecond + costToAddCostBuyTenPoopsPerSecond);
          setCostToAddCostBuyTenPoopsPerSecond(costToAddCostBuyTenPoopsPerSecond + 20); // Adjusted increment for bulk purchase
          setAmountOfPoopsPerSecond(amountOfPoopsPerSecond + 10)
        } else {
          alert("You don't have enough poops you poop head!");
        }
      } else {
        if (count >= costToBuyTenPoopsPerSecond) {
          setCount(count - costToBuyTenPoopsPerSecond);
          setCostToBuyTenPoopsPerSecond(costToBuyTenPoopsPerSecond + costToAddCostBuyTenPoopsPerSecond);
          setCostToAddCostBuyTenPoopsPerSecond(costToAddCostBuyTenPoopsPerSecond + 20); // Adjusted increment for bulk purchase
          setAmountOfPoopsPerSecond(amountOfPoopsPerSecond + 10)
        } else {
          alert("You don't have enough poops you poop head!");
        }
      }
    }

    function addTenMorePoopsPerClick() {
      if (isHalvePrice == true) {
        if (count >= costToBuyTenPoopsPerClick/2) {
          setCount(count - costToBuyTenPoopsPerClick/2)
          setCostToBuyTenPoopsPerClick(costToBuyTenPoopsPerClick + costToAddCostBuyTenPoopsPerClick);
          setCostToAddCostBuyTenPoopsPerClick(costToAddCostBuyTenPoopsPerClick + 20); // Adjusted increment for bulk purchase
          setPoopPerClick(PoopPerClick + 10)
        } else {
          alert("You don't have enough poops you poop head!");
        }
      } else {
        if (count >= costToBuyTenPoopsPerClick) {
          setCount(count - costToBuyTenPoopsPerClick);
          setCostToBuyTenPoopsPerClick(costToBuyTenPoopsPerClick + costToAddCostBuyTenPoopsPerClick);
          setCostToAddCostBuyTenPoopsPerClick(costToAddCostBuyTenPoopsPerClick + 20); // Adjusted increment for bulk purchase
          setPoopPerClick(PoopPerClick + 10)
        } else {
          alert("You don't have enough poops you poop head!");
        }
      }
    }
  
    
    // Daily Deals
    // const dayOfWeek = new Date("July 13, 1983 01:15:00").getDay();
    const dayOfWeek = new Date().getDay();

    const saveIsDoubleCount = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("isDoubleCount") || "false") : false;
    const [isDoubleCount, setIsDoubleCount] = useState(saveIsDoubleCount);

  
    // const saveIsDoubleCount = typeof window !== 'undefined' ? (localStorage.getItem("isDoubleCount") || "false") : false;
    // const [isDoubleCount, setIsDoubleCount] = useState(saveIsDoubleCount)

    const saveIsDoubleClickPerSecond = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("isDoubleClickPerSecond") || "false") : false;
    const [isDoubleClickPerSecond, setIsDoubleClickPerSecond] = useState(saveIsDoubleClickPerSecond)

    const saveIsHalvePrice = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("isHalvePrice") || "false") : false;
    const [isHalvePrice, setIsHalvePrice] = useState(saveIsHalvePrice)

    const saveDidBuyTenStocks = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("didBuyTenStocks") || "false") : false;
    const [didBuyTenStocks, setDidBuyTenStocks] = useState(saveDidBuyTenStocks)

    const saveIsHalveStockPrice = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("isHalveStockPrice") || "false") : false;
    const [isHalveStockPrice, setIsHalveStockPrice] = useState(saveIsHalveStockPrice)

    const [prankPoop, setPrankPoop] = useState(false)

    const saveIsMoreLotteryLuck = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("isMoreLotteryLuck") || "false") : false;
    const [isMoreLotteryLuck, setIsMoreLotteryLuck] = useState(saveIsMoreLotteryLuck)

    const [dailyDealOneMessage, setDailyDealOneMessage] = useState('Nothing')
    

    const [isDailyDealOneBought, setIsDailyDealOneBought] = useState(false)
    function dailyDealOne() {
      if (dayOfWeek == 1) {
        if (isDoubleCount == false) {
          if (count >= 10000) {
            setIsDailyDealOneBought(true)
            setCount(count - 10000)
            setIsDoubleCount(true)
            alert("You now have double poops per click!")
          } else {
            alert("You don't have enough poops poop head!")
          }
        } else {
          alert('You already bought this poop head!')
        }
      } if (dayOfWeek == 2) {
        if (isDoubleClickPerSecond == false) {
          if (count >= 10000) {
            setIsDailyDealOneBought(true)
            setCount(count - 10000)
            setIsDoubleClickPerSecond(true)
            alert("You now have double poops per second!")
          } else {
            alert("You don't have enough poops poop head!")
          }
        } else {
          alert('You already bought this poop head!')
        }
      } if (dayOfWeek == 3) {
        if (isHalvePrice == false) {
          if (count >= 50000) {
            setIsDailyDealOneBought(true)
            setCount(count - 50000)
            setIsHalvePrice(true)
            alert("All market prices are half price")
          } else {
            alert("You don't have enough poops poop head!")
          }
        } else {
          alert('You already bought this poop head!')
        }
      } if (dayOfWeek == 4) {
        if (didBuyTenStocks == false) {
          if (count >= 1000) {
            setIsDailyDealOneBought(true)
            setCount(count - 1000)
            setDidBuyTenStocks(true)
            setStockContained(stockContained + 10)
            alert("Got 10 Stocks!")
          } else {
            alert("You don't have enough poops poop head!")
          }
        } else {
          alert('You already bought this poop head!')
        }
      } if (dayOfWeek == 5) {
        if (isHalveStockPrice == false) {
          if (count >= 100000) {
            setIsDailyDealOneBought(true)
            setCount(count - 100000)
            setIsHalveStockPrice(true)
            alert("Stocks are now less price!")
          } else {
            alert("You don't have enough poops poop head!")
          }
        } else {
          alert('You already bought this poop head!')
        }
      } if (dayOfWeek == 6) {
          if (count >= 0) {
            setIsDailyDealOneBought(true)
            setPrankPoop(true)
            alert("I wouldn't let you die... would I?")
            alert("Check your count... hehehe")
          } else {
            alert("You gotta have a least 0 man. i aint payin 4 u")
          }
      } if (dayOfWeek == 0) {
        if (isMoreLotteryLuck == false) {
          if (count >= 10000) {
            setIsDailyDealOneBought(true)
            setCount(count - 10000)
            setIsMoreLotteryLuck(true)
            alert("You now have 50% more luck in lotteries")
          } else {
            alert("You don't have enough poops poop head!")
          }
        } else {
          alert('You already bought this poop head!')
        }
      }
    }

    useEffect(() => {
      if (dayOfWeek !== 1) {
        setIsDoubleCount(false)
      } if (dayOfWeek !== 2) {
        setIsDoubleClickPerSecond(false)
      } if (dayOfWeek !== 3) {
        setIsHalvePrice(false)
      } if (dayOfWeek !== 4) {
        setDidBuyTenStocks(false)
      } if (dayOfWeek !== 5) {
        setIsHalveStockPrice(false)
      }
    }, [dayOfWeek]);

    useEffect(() => {
      if (isDoubleCount == true) {
        setIsDailyDealOneBought(true)
      } else if (isDoubleClickPerSecond == true) {
        setIsDailyDealOneBought(true)
      } else if (isHalvePrice == true) {
        setIsDailyDealOneBought(true)
      } else if (didBuyTenStocks == true) {
        setIsDailyDealOneBought(true)
      } else if (isHalveStockPrice == true) {
        setIsDailyDealOneBought(true)
      } else if (isMoreLotteryLuck == true) {
        setIsDailyDealOneBought(true)
      } else {
        setIsDailyDealOneBought(false)
      }
    }, [dayOfWeek])

    useEffect(() => {
      if (dayOfWeek == 1) {
        setDailyDealOneMessage('Click to get double poops per click the whole day! (10,000 poops)')
      } else if (dayOfWeek == 2) {
        setDailyDealOneMessage('Click to get double poops per second the whole day! (10,000 poops)')
      } else if (dayOfWeek == 3) {
        setDailyDealOneMessage('Click to halve price of poop shop the whole day! (50,000 poops)')
      } else if (dayOfWeek == 4) {
        setDailyDealOneMessage('Click to get 10 free stocks! (1,000 poops) --- hehehe')
      } else if (dayOfWeek == 5) {
        setDailyDealOneMessage('Click to cut stock BUYING PRICE by 25% (100,000 poops)')
      } else if (dayOfWeek == 6) {
        setDailyDealOneMessage('Click to dieeeeeeeeeeee! (free)')
      } else if (dayOfWeek == 0) {
        setDailyDealOneMessage("Click to increase lottery chances by 50% (10,000 poops)")
      } 
    }, [dayOfWeek]);
    
    // WHAT HAPPENS WHEN POOP PRESSED
    
    const [poopPressed, setPoopPressed] = useState(false);
    
    function clickPoop() {
      setHowManyTimesClicked(howManyTimesClicked + 1)
      if (prankPoop) {
        setPrankPoop(false)
        alert("Jk, bro. I aint dat mean")
      }
      if (isDoubleCount) {
        setCount(count + 2 * (PoopPerClick));
        setPoopsClickedEver(poopsClickedEver + 2 * (PoopPerClick));
        setPoopBarThing(poopBarThing + 2 * (PoopPerClick));
      } else {
        setCount(count + PoopPerClick);
        setPoopsClickedEver(poopsClickedEver + PoopPerClick);
        setPoopBarThing(poopBarThing + PoopPerClick);
      }
      save();
    }

    function handlePoopPress() {
      setPoopPressed(true);
    }

    function handlePoopRelease() {
      setPoopPressed(false);
    }
    // DETECTING AUTOCLICKER

    const [howManyTimesClicked, setHowManyTimesClicked] = useState(0)
    const [isOneSecond, setIsOneSecond] = useState(0)
    
    const saveHowManyTimeAutoClicked = typeof window !== 'undefined' ? parseInt(localStorage.getItem("howManyTimeAutoClicked") || "0") : 0;
    const [howManyTimeAutoClicked, setHowManyTimeAutoClicked] = useState(saveHowManyTimeAutoClicked)

    const saveIsAutoClickerAllowed = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("isAutoClickerAllowed") || "false") : false;
    const [isAutoClickerAllowed, setIsAutoClickerAllowed] = useState(saveIsAutoClickerAllowed);

    function allowAutoclicker() {
      if (isAutoClickerAllowed == false) {
        if (count >= 999999999) {
          alert("Yay! Auto clicker is allowed!")
          setIsAutoClickerAllowed(true)
        } else {
          alert("You don't have enough poops yet!")
        }
      } else {
        alert("You already got this poop head!")
      }
    }
    
    useEffect(() => {
      const interval = setInterval(() => {
        if (!isAutoClickerAllowed) {
          setIsOneSecond((prev) => prev + 1); 
          
          // Check if the clicks exceed the threshold within the time window
          if (howManyTimesClicked >= 70) {
            setHowManyTimeAutoClicked(howManyTimeAutoClicked + 1);
            
            // Alert based on how many times auto-clicking was detected
            if (howManyTimeAutoClicked === 1) {
              alert('Autoclicker detected! Avoid or buy the autoclicker permission.');
            } else if (howManyTimeAutoClicked === 2) {
              alert('Second detection: Losing 10,000 poops as a penalty.');
              setCount((prevCount) => Math.max(0, prevCount - 10000));
            } else if (howManyTimeAutoClicked >= 3) {
              alert('Third detection: Resetting all poops.');
              setCount(0);
            }
            
            // Reset tracking values after detection
            setIsOneSecond(0);
            setHowManyTimesClicked(0);
          }
    
          // Reset counter if one second (or 10 intervals at 100ms) has passed
          if (isOneSecond >= 10) {
            setIsOneSecond(0);
            setHowManyTimesClicked(0);
          }
        }
      }, 100); // Run every 100ms
    
      return () => clearInterval(interval); // Cleanup on unmount
    }, [howManyTimesClicked, isOneSecond, howManyTimeAutoClicked, isAutoClickerAllowed]);
    
    

    // BACKROUND STUFF
    useEffect(() => {
      const interval = setInterval(() => {
        console.log(amountOfPoopsPerSecond)
        if (isDoubleClickPerSecond) {
          setCount((prev) => prev + amountOfPoopsPerSecond*2)
          setPoopBarThing((prev) => prev + amountOfPoopsPerSecond*2)
          setPoopsClickedEver(((prev) => prev + amountOfPoopsPerSecond*2))
        } else {
          setCount((prev) => prev + amountOfPoopsPerSecond)
          setPoopBarThing((prev) => prev + amountOfPoopsPerSecond)
          setPoopsClickedEver(((prev) => prev + amountOfPoopsPerSecond))
        }
      }, 1000); 
    
      return () => clearInterval(interval); // Cleanup on unmount
    }, [amountOfPoopsPerSecond, count]); // Dependencies for the effect


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
      <link href="https://fonts.cdnfonts.com/css/faith-hope" rel="stylesheet"/>
      <link href="https://fonts.cdnfonts.com/css/earwig-factory" rel="stylesheet"/>
      {/* <style>@import url('https://fonts.cdnfonts.com/css/faith-hope');</style> */}


      {/* Updates */}
      <div className={styles.updateScreen} style={{ opacity: showUpdate ? 1 : 0, pointerEvents: showUpdate ? 'all' : 'none'}}>
        <div className={styles.updateX} onClick={hideUpdate}>&#10008;</div>
        <div className={styles.updateTitle}>Updates</div>
        <div className={styles.updateStuff}>1. Now you can see updates!</div>
        <div className={styles.updateStuff}>2. Settings to change language</div>
      </div>
      {/* BACKGROUND IMAGE */}
      <img className={styles.backround} src="toiletPaperBackround.png" alt="" />

      <div className={styles.flagDiv} style={{ opacity: didChooseLanguage ? 0 : 0.9, pointerEvents: didChooseLanguage ? 'none' : 'all'}}></div>
      <div className={styles.flagBox} style={{ opacity: didChooseLanguage ? 0 : 1, pointerEvents: didChooseLanguage ? 'none' : 'all'}}>
        <img src="americanFlag.png" alt="americanFlag" className={styles.flags} onClick={choseAmerica}/>
        <img src="japaneseFlag.png" alt="japaneseFlag" className={styles.flags} onClick={choseJapanese}/>
      </div>

      {/* TOP BAR */}

      <div className={styles.topBar}>
        <img 
          className={styles.settingsButton} 
            src="settingsButton.png" 
            alt="settingsButton" 
            onClick={toggleIsSettings}/>
        <input
          className={styles.gameName}
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          maxLength={15}
        />
      </div>
    <div
      className={styles.settingsScreen}
      style={{
        opacity: isSettingsOpen ? 0.9 : 0,
        pointerEvents: isSettingsOpen ? 'all' : 'none'
      }}
    >
      <div className={styles.stuffXExit} onClick={toggleIsSettings}>
        &#10008;
      </div>
      <div className={styles.settingsTitle}>Settings</div>
      <form className={styles.settingsLanguage}>
        <label htmlFor="browser">Language: </label>
        <input onChange={(e) => setLanguage(e.target.value)} list="browsers" name="browser" id="browser" />
          <datalist id="browsers">
            <option value="English" />
            <option value="Japanese" />
          </datalist>
      </form>
    </div>


      {/* LEFT MENU (SHOP) */}
      <span className={styles.leftMenu}>
        <p className={styles.poopMarket}>Poop Market</p> <br />

        <button className={styles.morePoopClicker} onClick={morePoopPerClick}>
          Click to add more poop per click ({ isHalvePrice ? costToBuyPoopClick/2 : costToBuyPoopClick} Poops)
        </button> <br /> <br />

        <button onClick={addMorePoopsPerSecond} className={styles.addMorePoopsPerSecond}>
          Click to add more poop per second ({ isHalvePrice ? costToBuyPoopsPerSecond/2 : costToBuyPoopsPerSecond} Poops)
        </button> <br /> <br />

        <button onClick={addTenMorePoopsPerClick} className={styles.addTenPoopsPerClick}>
          Click to add 10 more poop per click ({ isHalvePrice ? costToBuyTenPoopsPerClick/2 : costToBuyTenPoopsPerClick} Poops)
        </button> <br /><br />

        <button onClick={addTenMorePoopsPerSecond} className={styles.addTenPoopsPerSecond}>
          Click to add 10 more poop per second ({ isHalvePrice ? costToBuyTenPoopsPerSecond : costToBuyTenPoopsPerSecond} Poops)
        </button> <br /><br />

        <div className={styles.poopMarket}>Daily Deals</div> <br />

        <button onClick={dailyDealOne} className={styles.doublePoop}>
          {dailyDealOneMessage} { isDailyDealOneBought ? '✅' : ''}
        </button> <br /><br />

        <div className={styles.poopMarket}>Da stuff you shall need</div> <br />
        <button onClick={allowAutoclicker} className={styles.doublePoop}>
          Allow Autoclicker { isAutoClickerAllowed ? '✅' : '(999,999,999 poops)'}
        </button> <br /><br />

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
        <div className={styles.statsPoop}>Poops clicked: { prankPoop ? 0 : count}</div> <br />
        <div className={styles.statsPoop}>Poops clicked ever: {poopsClickedEver}</div> <br />
        <div className={styles.statsShop}>Poops per click: {PoopPerClick}{isDoubleCount ? '=>(2x)' : ''}</div> <br />
        <div className={styles.statsShop}>Poops per second: {amountOfPoopsPerSecond}{isDoubleClickPerSecond ? '=>(2x)' : ''}</div><br />

        <div className={styles.stats}>Achievements</div>
        <div className={styles.achievmentsSection}>
            <img src = {isCentiPoop ? "centiPoop.png" : "hideCentiPoop.png"} alt="centiPoop" className={styles.achievmentIcons}/>
            <img src={isPoopFactory ? "pooperFactory.png" : "hidePooperFactory.png"} alt="pooperFactory" className={styles.achievmentIcons}/>
            <img src={didWinOmnioptentPoop ? "luckyPoop.png" : "hideLuckyPoop.png"} alt="luckyPoop" className={styles.achievmentIcons}/>
        </div>
        
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
        onTouchStart={handlePoopPress}  // Handle touch press
        // onTouchEnd={handlePoopRelease}  // Handle touch release
        draggable="false"
      />

      {/* STUFF SECTION */}

    <div className={styles.body}>
      {/* Other components, background image, etc. */}

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
        <br />

        {/* STOCK MARKET */}
        <div className={styles.stuffPicGroup} onClick={toggleStockMarket}>
          <img className={styles.stockMarketPic} src={isStockMarketAvailable ? "stockMarketPic.png" : "stockMarketPicHide.png"} alt="stockMarketPic" />
          <span className={styles.stuffPicLabel}><strong>Stock Market</strong></span>
        </div>
        <br />

        {/* FROG FECES FACTORY */}
        <div className={styles.stuffPicGroup} onClick={toggleIsFrogTurdOpen}>
          <img className={styles.stockMarketPic} src={isFrogTurdAvailable ? "frogTurdPic.png" : "frogTurdPicHide.png"} alt="frogTurdPic" />
          <span className={styles.stuffPicLabel}><strong>Frog Feces Factory</strong></span>
        </div>
      </div>

      {/* Lottery Screen (with no confirmations inside) */}
      <div
        className={styles.stuffyScreen}
        style={{
          opacity: isLottery ? 1 : 0,
          pointerEvents: isLottery ? 'all' : 'none',
          zIndex: 1000,
        }}
      >
        <div className={styles.stuffyTitle}>Lottery {isMoreLotteryLuck ? '=>2x Luck' : ''}</div>
        <button className={styles.stuffXExit} onClick={toggleIsLottery}>
          &#10008;
        </button>
        <div className={styles.lotteryTickets}>
          <img onClick={toggleIsPooperManSure} className={styles.pooperManLottery} src="pooperManLottery.png" alt="PooperManLottery" />
          <img onClick={toggleIsDogTurdSure} className={styles.pooperManLottery} src="dogTurdLottery.png" alt="DogTurdLottery" />
          <img onClick={toggleIsOmnipotentPoopSure} className={styles.omnipotentPoopLottery} src="omnipotentPoopLottery.png" alt="OmnipotentPoopLottery" />
        </div>
      </div>

      {/* Confirmation dialogs outside of the lottery screen div */}
      <div className={styles.areYouSurePooperManBody} style={{ opacity: isPooperManAreYouSure ? 1 : 0, pointerEvents: isPooperManAreYouSure ? 'all' : 'none' }}>
        <div className={styles.areYouSurePooperManBodyTitle}>
          Are you sure you want to buy Pooper Man?
          <div onClick={pooperManLotteryGo} className={styles.yesDoPooperMan}>Yes</div>
          <div onClick={toggleIsPooperManSure} className={styles.noDoPooperMan}>No</div>
        </div>
      </div>

      <div className={styles.areYouSureDogTurdBody} style={{ opacity: isDogTurdAreYouSure ? 1 : 0, pointerEvents: isDogTurdAreYouSure ? 'all' : 'none' }}>
        <div className={styles.areYouSureDogTurdBodyTitle}>
          Are you sure you want to buy Dog Turd?
          <div onClick={dogTurdLotteryGo} className={styles.yesDoDogTurd}>Yes</div>
          <div onClick={toggleIsDogTurdSure} className={styles.noDoDogTurd}>No</div>
        </div>
      </div>

      <div className={styles.areYouSureOmnipotentPoopBody} style={{ opacity: isOmnipotentPoopAreYouSure ? 1 : 0, pointerEvents: isOmnipotentPoopAreYouSure ? 'all' : 'none' }}>
        <div className={styles.areYouSureOmnipotentPoopBodyTitle}>
          Are you sure you want to buy Omnipotent Poop?
          <div onClick={ominpotentPoopLotteryGo} className={styles.yesDoOmnipotentPoop}>Yes</div>
          <div onClick={toggleIsOmnipotentPoopSure} className={styles.noDoOmnipotentPoop}>No</div>
        </div>
      </div>

      {/* STOCK MARKET SCREEN */}
      <div
        className={styles.stuffyScreen}
        style={{
          opacity: isStockMarketOpen ? 1 : 0,
          pointerEvents: isStockMarketOpen ? 'all' : 'none',
          zIndex: 1000
        }}
      >
        <div className={styles.stuffyTitle}>Stock Market</div>
        <button onClick={buyStock} className={styles.buyStock}>Buy</button>
        <button onClick={sellStock} className={styles.sellStock}>Sell</button>
        <button className={styles.stuffXExit} onClick={toggleStockMarket}>&#10008;</button>
        <div className={styles.stockMarketGraphContainer}>
          <div className={styles.stockMarketGraph}>
            <Line data={stockMarketData} options={stockMarketOptions} />
          </div>
        </div>
      </div>

      {/* FROG FECES FACTORY SCREEN */}
      <div
        className={styles.stuffyScreen}
        style={{
          opacity: isFrogTurdOpen ? 1 : 0,
          pointerEvents: isFrogTurdOpen ? 'all' : 'none',
          zIndex: 1000
        }}
      >
        <div className={styles.stuffyTitle}>Frog Feces Factory</div>
        <img className={styles.theFrogToilet} src="theFrogToilet.png" alt="TheFrogToilet" />
        <div className={styles.frogTurdStats}>
          stats
          <button onClick={addPoopPerFrog} className={styles.buyMorePoopPerFrog}>Buy more poop per frog ({costToBuyPoopPerFrog})</button>
          <button onClick={addFrogsPerSecond} className={styles.buyMoreFrogsPerSecond}>Buy more frogs per second ({costToBuyFrogsPerSecond})</button>
          <div className={styles.frogStatWords}>Poop Per Frog: {poopPerFrog}</div> 
          <div className={styles.frogStatWords}>Frogs Per Second: {frogsPerSecond}</div>
        </div>
        <button className={styles.stuffXExit} onClick={toggleIsFrogTurdOpen}>&#10008;</button>
      </div>
    </div>

    </div>
  );
}