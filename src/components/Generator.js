import React, { useEffect, useRef, useState } from 'react';
import { characterFactory, yearFormatter } from '../helpers/formatters';
import { Mellt } from '../helpers/generators';
import words from 'an-array-of-english-words';
import '../styles/Generator.scss';

import CopyIcon from './svgs/CopyIcon.js';

let mellt = new Mellt();

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

const Generator = () => {
  const sliderRef = useRef();
  const [passwordLength, setPasswordLength] = useState(7);
  const [passwordGenerated, setPasswordGenerated] = useState(false);
  // Checkbox variables
  const [upperCaseChecked, setUpperCaseChecked] = useState(false);
  const [lowerCaseChecked, setLowerCaseChecked] = useState(true);
  const [numbersChecked, setNumbersChecked] = useState(false);
  const [symbolsChecked, setSymbolsChecked] = useState(false);
  // Strength meter bar variables
  const [meterTitle, setMeterTitle] = useState('Too-weak');
  const [barOne, setBarOne] = useState('');
  const [barTwo, setBarTwo] = useState('');
  const [barThree, setBarThree] = useState('');
  const [barFour, setBarFour] = useState('');
  const [barFive, setBarFive] = useState('');
  // Window resize listener
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize.innerWidth > 767 && windowSize.innerWidth < 800) {
      setPasswordLength(7);
      handlePasswordStrengthCheck();
    }
  }, [windowSize]);

  // console.log('test123', words);

  const passwordGenerator = (pwdLength) => {
    let passwordString = [...Array(parseInt(pwdLength))]
      .map(characterGenerator)
      .join('');
    return passwordString;
  };

  useEffect(() => {
    setPasswordGenerated(true);
  }, [passwordGenerator]);

  const characterGenerator = () => {
    const finalArray = characterFactory(
      upperCaseChecked,
      lowerCaseChecked,
      numbersChecked,
      symbolsChecked
    );
    return finalArray[Math.floor(Math.random() * finalArray.length)];
  };

  const password = passwordGenerator(passwordLength);

  const handleCheckboxToggle = (type) => {
    if (type === 'uppercase') {
      setUpperCaseChecked((prev) => !prev);
    } else if (type === 'lowercase') {
      setLowerCaseChecked((prev) => !prev);
    } else if (type === 'numbers') {
      setNumbersChecked((prev) => !prev);
    } else {
      setSymbolsChecked((prev) => !prev);
    }
    handlePasswordStrengthCheck();
  };

  const handleSliderChange = (e) => {
    setPasswordLength(e.target.value);
    handlePasswordStrengthCheck();
    passwordGenerator(passwordLength);
  };

  const handlePasswordStrengthCheck = () => {
    if (passwordLength <= 9) {
      setMeterTitle('Too-Weak');
      setBarOne('too-weak');
      setBarTwo('');
      setBarThree('');
      setBarFour('');
      setBarFive('');
    } else if (passwordLength <= 12) {
      setMeterTitle('Weak');
      setBarOne('weak');
      setBarTwo('weak');
      setBarThree('');
      setBarFour('');
      setBarFive('');
    } else if (passwordLength <= 18) {
      setMeterTitle('Medium');
      setBarOne('medium');
      setBarTwo('medium');
      setBarThree('medium');
      setBarFour('');
      setBarFive('');
    } else if (passwordLength <= 20) {
      setMeterTitle('Strong');
      setBarOne('strong');
      setBarTwo('strong');
      setBarThree('strong');
      setBarFour('strong');
      setBarFive('');
    } else if (passwordLength > 20) {
      setMeterTitle('Elite');
      setBarOne('elite');
      setBarTwo('elite');
      setBarThree('elite');
      setBarFour('elite');
      setBarFive('elite');
    }
  };

  useEffect(() => {
    handlePasswordStrengthCheck();
  }, [handlePasswordStrengthCheck]);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    console.log('test1234', sliderRef);
  };

  if (passwordGenerated) {
    sliderRef.current.style.background = `linear-gradient(90deg, rgb(164, 255, 175), ${
      windowSize.innerWidth > 768
        ? `${(passwordLength / 35) * 100}%`
        : `${(passwordLength / 22) * 100}%`
    }, rgb(164, 255, 175), ${
      windowSize.innerWidth > 768
        ? `${(passwordLength / 35) * 100}%)`
        : `${(passwordLength / 22) * 100}%)`
    }`;
    console.log('ran1234');
  }

  return (
    <div className="wrapper">
      <div className="app-title">Password Generator</div>
      <div className="password">
        <span>{password}</span>
        <CopyIcon onClick={handleCopyPassword} className="copy-icon" />
      </div>
      <div className="generator-container">
        <div>
          <div className="length-container">
            <span className="length-title">Character Length</span>
            <span className="chars">{passwordLength}</span>
          </div>
          <div className="slider">
            <input
              ref={sliderRef}
              onChange={(e) => handleSliderChange(e)}
              value={passwordLength}
              type="range"
              min="7"
              max={windowSize.innerWidth > 768 ? '35' : '22'}
              steps="1"
            ></input>
          </div>
        </div>
        <div className="options-container">
          <div
            onClick={() => handleCheckboxToggle('uppercase')}
            className="checkbox-container"
          >
            <input type="checkbox" checked={upperCaseChecked} />
            <span>Include Uppercase Letters</span>
          </div>
          <div className="checkbox-container disabled">
            <input type="checkbox" checked={true} disabled={true} />
            <span>Include Lowercase Letters</span>
          </div>
          <div
            onClick={() => handleCheckboxToggle('numbers')}
            className="checkbox-container"
          >
            <input type="checkbox" checked={numbersChecked} />
            <span>Include Numbers</span>
          </div>
          <div
            onClick={() => handleCheckboxToggle('symbols')}
            className="checkbox-container"
          >
            <input type="checkbox" checked={symbolsChecked} />
            <span>Include Symbols</span>
          </div>
        </div>
        <div className="strength-container">
          <span className="strength-title">Strength</span>
          <div className="meter-container">
            <span className="meter-title">{meterTitle}</span>
            <div className="strength-meter">
              <div className={`bar ${barOne}`}></div>
              <div className={`bar ${barTwo}`}></div>
              <div className={`bar ${barThree}`}></div>
              <div className={`bar ${barFour}`}></div>
              <div className={`bar ${barFive}`}></div>
            </div>
          </div>
        </div>
        <div>
          <div className="time-to-crack-heading">
            Your password would be cracked in:
          </div>
          <div className="time-to-crack">
            <span className="estimated-time">
              {passwordGenerated &&
                yearFormatter(mellt.CheckPassword(password))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
