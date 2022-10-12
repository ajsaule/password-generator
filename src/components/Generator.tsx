import React, { useEffect, useState } from 'react';
import {
  characterFactory,
  daysYearsFormatter,
  hashPerSecondFormatter,
} from '../helpers/formatters';
import { memorableList } from '../helpers/memorableWordList';
import { checkPassword } from '../helpers/generators';

import { useDebouncedCallback } from 'use-debounce';
// import words from 'an-array-of-english-words';
// import ReactTooltip from 'react-tooltip-rc';

import '../styles/Generator.scss';

import CopyIcon from './svgs/CopyIcon';

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

const Generator = () => {
  const [ownPassword, setOwnPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState('7');
  const [passwordGenerated, setPasswordGenerated] = useState(false);
  const [passwordDelimiter, setPasswordDelimiter] = useState('-');
  const [hashesPerSecond, setHashesPerSecond] = useState(1000000000);
  // Checkbox variables
  const [upperCaseChecked, setUpperCaseChecked] = useState(false);
  const [lowerCaseChecked, setLowerCaseChecked] = useState(true);
  const [numbersChecked, setNumbersChecked] = useState(false);
  const [symbolsChecked, setSymbolsChecked] = useState(false);
  const [wordsChecked, setWordsChecked] = useState(false);
  const [ownPasswordChecked, setOwnPasswordChecked] = useState(false);
  // Strength meter bar variables
  const [meterTitle, setMeterTitle] = useState('');
  const [barOne, setBarOne] = useState('');
  const [barTwo, setBarTwo] = useState('');
  const [barThree, setBarThree] = useState('');
  const [barFour, setBarFour] = useState('');
  const [barFive, setBarFive] = useState('');
  // Window resize listener
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const handleWindowResize = useDebouncedCallback((): void => {
    setWindowSize(getWindowSize());
  }, 1000);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const characterGenerator = (): string => {
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

  const passwordGenerator = (pwdLength: string): string => {
    const pwdLengthNumber = parseInt(pwdLength);

    if (pwdLengthNumber >= 7) {
      const passwordString = [...Array(pwdLengthNumber)]
        .map(characterGenerator)
        .join('');
      return passwordString;
    } else {
      const passwordString = [...Array(pwdLengthNumber)]
        .map(wordGenerator)
        .join(passwordDelimiter);
      return passwordString;
    }
  };

  useEffect(() => {
    setPasswordGenerated(true);
  }, [passwordGenerator]);

  const handleCheckboxToggle = (type: string, e: any): void => {
    if (type === 'uppercase' && !ownPasswordChecked && !wordsChecked) {
      setUpperCaseChecked((prev) => !prev);
    } else if (type === 'lowercase' && !wordsChecked && !ownPasswordChecked) {
      setLowerCaseChecked((prev) => !prev);
    } else if (type === 'numbers' && !wordsChecked && !ownPasswordChecked) {
      setNumbersChecked((prev) => !prev);
    } else if (type === 'symbols' && !wordsChecked && !ownPasswordChecked) {
      setSymbolsChecked((prev) => !prev);
    } else if (type === 'words') {
      setWordsChecked((prev) => !prev);
      setUpperCaseChecked(false);
      setLowerCaseChecked(false);
      setNumbersChecked(false);
      setSymbolsChecked(false);
      setOwnPasswordChecked(false);
    } else if (type === 'own-password') {
      setOwnPasswordChecked((prev) => !prev);
      setWordsChecked(false);
      setUpperCaseChecked(false);
      setLowerCaseChecked(false);
      setNumbersChecked(false);
      setSymbolsChecked(false);
    } else {
      console.log('test123456');
      if (e.target.id === 'uppercase') setUpperCaseChecked(true);
      if (e.target.id === 'lowercase') setLowerCaseChecked(true);
      if (e.target.id === 'numbers') setNumbersChecked(true);
      if (e.target.id === 'symbols') setSymbolsChecked(true);
      if (wordsChecked === true) setWordsChecked(false);
      if (ownPasswordChecked === true) setOwnPasswordChecked(false);
    }
    handlePasswordStrengthCheck();
  };

  useEffect(() => {
    if (wordsChecked) {
      setPasswordLength('1');
    } else {
      setPasswordLength('7');
    }
  }, [wordsChecked]);

  const handleSliderChange = (e: any) => {
    setPasswordLength(e.target.value);
    handlePasswordStrengthCheck();
    passwordGenerator(passwordLength);
  };

  const handleOwnPasswordChange = (e: any) => {
    const removedWhitespacePassword = e.target.value.replace(/ /g, '');
    setOwnPassword(removedWhitespacePassword);
  };

  useEffect(() => {
    handlePasswordStrengthCheck();
  }, [ownPassword]);

  const password = passwordGenerator(passwordLength);
  const timeToCrack: any = ownPasswordChecked
    ? checkPassword(ownPassword, hashesPerSecond)
    : checkPassword(password, hashesPerSecond);
  // console.log('test12345', timeToCrack.seconds, timeToCrack.days, timeToCrack);

  const handlePasswordStrengthCheck = (): void => {
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
    } else {
      setMeterTitle('');
      setBarOne('');
      setBarTwo('');
      setBarThree('');
      setBarFour('');
      setBarFive('');
    }
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  // prettier-ignore
  const sliderBackgroundPercentage =
    wordsChecked && windowSize.innerWidth > 768 
      ? `${Math.round(((parseInt(passwordLength) - 1) / (6 - 1)) * 100)}%`
      : wordsChecked && windowSize.innerWidth <= 768
      ? `${Math.round((((parseInt(passwordLength) - 1) / (6 - 1)) * 100))}%`
      : windowSize.innerWidth > 768
      ? `${Math.round(((parseInt(passwordLength) - 7) / (35 - 7)) * 100)}%`
      : `${Math.round(((parseInt(passwordLength) - 7) / (25 - 7)) * 100)}%`;

  return (
    <div className="wrapper">
      <div className="app-title">Password Generator</div>
      <div className="password">
        {!upperCaseChecked &&
        !lowerCaseChecked &&
        !symbolsChecked &&
        !numbersChecked &&
        !wordsChecked &&
        !ownPasswordChecked ? (
          <span className="no-option-selected">Select an option</span>
        ) : ownPasswordChecked ? (
          <input
            type="text"
            className="own-password"
            value={ownPassword}
            onChange={(e) => handleOwnPasswordChange(e)}
          />
        ) : (
          <span>{password}</span>
        )}
        <CopyIcon onClick={handleCopyPassword} className="copy-icon" />
      </div>
      <div className="generator-container">
        <div>
          <div className="length-container">
            <span className="length-title">Character Length</span>
            {!ownPasswordChecked ? (
              <span className="chars">{passwordLength}</span>
            ) : (
              <span className="chars">{ownPassword.length}</span>
            )}
          </div>
          {!ownPasswordChecked && (
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
              ></input>
            </div>
          )}
        </div>
        <div className="options-container">
          <div
            onClick={(e) => handleCheckboxToggle('uppercase', e)}
            className="checkbox-container"
          >
            <input type="checkbox" checked={upperCaseChecked} id="uppercase" />
            <span>Include Uppercase Letters</span>
          </div>
          <div
            className="checkbox-container"
            onClick={(e) => handleCheckboxToggle('lowercase', e)}
          >
            <input type="checkbox" checked={lowerCaseChecked} id="lowercase" />
            <span>Include Lowercase Letters</span>
          </div>
          <div
            onClick={(e) => handleCheckboxToggle('numbers', e)}
            className="checkbox-container"
          >
            <input type="checkbox" checked={numbersChecked} id="numbers" />
            <span>Include Numbers</span>
          </div>
          <div
            onClick={(e) => handleCheckboxToggle('symbols', e)}
            className="checkbox-container"
          >
            <input type="checkbox" checked={symbolsChecked} id="symbols" />
            <span>Include Symbols</span>
          </div>
          <div
            onClick={(e) => handleCheckboxToggle('words', e)}
            className="checkbox-container"
          >
            <div className="checkbox-container">
              <input type="checkbox" checked={wordsChecked} />
              <span>Use Words Only</span>
            </div>
          </div>
          <div
            onClick={(e) => handleCheckboxToggle('own-password', e)}
            className="checkbox-container"
          >
            <input type="checkbox" checked={ownPasswordChecked} />
            <span>Use your own password</span>
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
                daysYearsFormatter(
                  timeToCrack.seconds,
                  timeToCrack.days,
                  timeToCrack
                )}
            </span>
          </div>
          {/* </a> */}
          <div className="hash-input-container">
            <span>Hash Rate</span>
            <input
              // oninput="this.value=Number(this.value).toFixed(this.step.split('.')[1].length)"
              value={hashesPerSecond}
              type="number"
              step="1000000000"
              min="0"
              placeholder="hashes per second"
              className="hashes-per-second"
              onChange={(e: any) =>
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
