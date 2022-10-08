import React, { useEffect, useState } from 'react';
import {
  characterFactory,
  secondsMinutesDaysYearsFormatter,
  daysYearsFormatter,
  yearFormatter,
  hashPerSecondFormatter,
} from '../helpers/formatters';
import { memorableList } from '../helpers/memorableWordList';
import { Mellt } from '../helpers/generators';

import words from 'an-array-of-english-words';
import ReactTooltip from 'react-tooltip-rc';

import '../styles/Generator.scss';

import CopyIcon from './svgs/CopyIcon.js';

let mellt = new Mellt();

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

const Generator = () => {
  const [passwordLength, setPasswordLength] = useState(7);
  const [passwordGenerated, setPasswordGenerated] = useState(false);
  const [passwordDelimiter, setPasswordDelimiter] = useState('-');
  const [hashesPerSecond, setHashesPerSecond] = useState(1000000000);
  // Checkbox variables
  const [upperCaseChecked, setUpperCaseChecked] = useState(false);
  const [lowerCaseChecked, setLowerCaseChecked] = useState(true);
  const [numbersChecked, setNumbersChecked] = useState(false);
  const [symbolsChecked, setSymbolsChecked] = useState(false);
  const [wordsChecked, setWordsChecked] = useState(false);
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

  const characterGenerator = () => {
    const finalArray = characterFactory(
      upperCaseChecked,
      lowerCaseChecked,
      numbersChecked,
      symbolsChecked
    );
    return finalArray[Math.floor(Math.random() * finalArray.length)];
  };

  const wordGenerator = () => {
    return memorableList[Math.floor(Math.random() * memorableList.length)];
  };

  const passwordGenerator = (pwdLength) => {
    if (pwdLength >= 7) {
      let passwordString = [...Array(parseInt(pwdLength))]
        .map(characterGenerator)
        .join('');
      return passwordString;
    } else {
      let passwordString = [...Array(parseInt(pwdLength))]
        .map(wordGenerator)
        .join(passwordDelimiter);
      return passwordString;
    }
  };

  useEffect(() => {
    setPasswordGenerated(true);
  }, [passwordGenerator]);

  const handleCheckboxToggle = (type) => {
    if (type === 'uppercase' && !wordsChecked) {
      setUpperCaseChecked((prev) => !prev);
    } else if (type === 'lowercase' && !wordsChecked) {
      setLowerCaseChecked((prev) => !prev);
    } else if (type === 'numbers' && !wordsChecked) {
      setNumbersChecked((prev) => !prev);
    } else if (type === 'symbols' && !wordsChecked) {
      setSymbolsChecked((prev) => !prev);
    } else {
      setWordsChecked((prev) => !prev);
      setUpperCaseChecked(false);
      setLowerCaseChecked(false);
      setNumbersChecked(false);
      setSymbolsChecked(false);
    }
    handlePasswordStrengthCheck();
  };

  useEffect(() => {
    if (wordsChecked) {
      setPasswordLength(1);
    } else {
      setPasswordLength(7);
    }
  }, [wordsChecked]);

  const handleSliderChange = (e) => {
    setPasswordLength(e.target.value);
    handlePasswordStrengthCheck();
    passwordGenerator(passwordLength);
  };

  const password = passwordGenerator(passwordLength);
  const timeToCrack = mellt.CheckPassword(password, hashesPerSecond);
  // console.log('test12345', timeToCrack.seconds, timeToCrack.days);

  const handlePasswordStrengthCheck = () => {
    if (timeToCrack.days === 0) {
      setMeterTitle('Too-Weak');
      setBarOne('too-weak');
      setBarTwo('');
      setBarThree('');
      setBarFour('');
      setBarFive('');
    } else if (timeToCrack.days <= 100) {
      setMeterTitle('Weak');
      setBarOne('weak');
      setBarTwo('weak');
      setBarThree('');
      setBarFour('');
      setBarFive('');
    } else if (timeToCrack.days <= 1000) {
      setMeterTitle('Medium');
      setBarOne('medium');
      setBarTwo('medium');
      setBarThree('medium');
      setBarFour('');
      setBarFive('');
    } else if (timeToCrack.days <= 1000000) {
      setMeterTitle('Strong');
      setBarOne('strong');
      setBarTwo('strong');
      setBarThree('strong');
      setBarFour('strong');
      setBarFive('');
    } else if (timeToCrack.days > 1000000) {
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
  };

  // prettier-ignore
  const sliderBackgroundPercentage =
    wordsChecked && windowSize.innerWidth > 768 
      ? `${Math.round(((passwordLength - 1) / (6 - 1)) * 100)}%`
      // : wordsChecked && windowSize.innerWidth > 768 && passwordLength >= 4
      // ? `${Math.round(((passwordLength - 1) / (6 - 1)) * 100)}%`
      : wordsChecked && windowSize.innerWidth <= 768
      ? `${Math.round((((passwordLength - 1) / (6 - 1)) * 100))}%`
      : windowSize.innerWidth > 768
      ? `${Math.round(((passwordLength - 7) / (35 - 7)) * 100)}%`
      : `${Math.round(((passwordLength - 7) / (25 - 7)) * 100)}%`;

  return (
    <div className="wrapper">
      <div className="app-title">Password Generator</div>
      <div className="password">
        {!upperCaseChecked &&
        !lowerCaseChecked &&
        !symbolsChecked &&
        !numbersChecked &&
        !wordsChecked ? (
          <span className="no-option-selected">Select an option</span>
        ) : (
          <span>{password}</span>
        )}
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
              style={{
                background: `linear-gradient(to right, #a4ffaf ${sliderBackgroundPercentage}, #18171F ${sliderBackgroundPercentage}`,
              }}
              onChange={(e) => handleSliderChange(e)}
              value={passwordLength}
              type="range"
              min={wordsChecked ? 1 : 7}
              max={wordsChecked ? 6 : windowSize.innerWidth > 768 ? 35 : 25}
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
          <div
            className="checkbox-container"
            onClick={() => handleCheckboxToggle('lowercase')}
          >
            <input type="checkbox" checked={lowerCaseChecked} />
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
          <div
            onClick={() => handleCheckboxToggle('words')}
            className="checkbox-container"
          >
            <div className="checkbox-container">
              <input type="checkbox" checked={wordsChecked} />
              <span>Use Words Only</span>
            </div>
          </div>
          {wordsChecked && (
            <div>
              <span>Separator</span>
              <input
                value={passwordDelimiter}
                maxLength={1}
                type="text"
                className="delimiter-input"
                onChange={(e) => setPasswordDelimiter(e.target.value)}
              ></input>
            </div>
          )}
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
          {/* <a
            data-for="main"
            data-tip={'Calculation is done based on ' + hashPerSecondFormatter(hashesPerSecond) + ' hashes per second'}
            data-iscapture="true"
          > */}
          <div className="time-to-crack-heading">
            {timeToCrack.seconds === 0
              ? 'Your password would be cracked:'
              : 'Your password would be cracked in:'}
          </div>
          <div className="time-to-crack">
            <span className="estimated-time">
              {passwordGenerated &&
                daysYearsFormatter(timeToCrack.seconds, timeToCrack.days)}
            </span>
          </div>
          {/* </a> */}
          <div className="hash-input-container">
            <span>Hash Power</span>
            <input
              // oninput="this.value=Number(this.value).toFixed(this.step.split('.')[1].length)"
              value={hashesPerSecond}
              type="number"
              step="1000000000"
              min="0"
              className="hashes-per-second"
              onChange={(e) =>
                hashesPerSecond > 0
                  ? setHashesPerSecond(e.target.value)
                  : setHashesPerSecond(1)
              }
            ></input>
            <span>{hashPerSecondFormatter(hashesPerSecond)}</span>
          </div>
          {/* <ReactTooltip
            id="main"
            place="top"
            type="dark"
            effect="float"
            multiline={true}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Generator;
