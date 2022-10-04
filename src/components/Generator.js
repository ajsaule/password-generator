import React, { useEffect, useRef, useState } from 'react';
import { characterFactory } from '../helpers/formatters';
import '../styles/Generator.scss';

import CopyIcon from './svgs/CopyIcon.js';

const Generator = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(2);
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

  useEffect(() => {
    handlePasswordStrengthCheck();
  }, []);

  const characterGenerator = () => {
    const finalArray = characterFactory(
      upperCaseChecked,
      lowerCaseChecked,
      numbersChecked,
      symbolsChecked
    );
    return finalArray[Math.floor(Math.random() * finalArray.length)];
  };

  const passwordGenerator = (pwdLength) => {
    let passwordString = [...Array(parseInt(pwdLength))]
      .map(characterGenerator)
      .join('');
    setPassword(passwordString);
    return passwordString;
  };

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
    if (
      !upperCaseChecked &&
      !lowerCaseChecked &&
      !numbersChecked &&
      !symbolsChecked
    ) {
      setMeterTitle('Too-Weak');
      setBarOne('too-weak');
      setBarTwo('');
      setBarThree('');
      setBarFour('');
      setBarFive('');
    } else if (passwordLength == 8 || passwordLength == 9) {
      setMeterTitle('Too-Weak');
      setBarOne('too-weak');
      setBarTwo('');
      setBarThree('');
      setBarFour('');
      setBarFive('');
    } else if (passwordLength < 12) {
      setMeterTitle('Weak');
      setBarOne('weak');
      setBarTwo('weak');
      setBarThree('');
      setBarFour('');
      setBarFive('');
    } else if (passwordLength < 18) {
      setMeterTitle('Medium');
      setBarOne('medium');
      setBarTwo('medium');
      setBarThree('medium');
      setBarFour('');
      setBarFive('');
    } else if (passwordLength < 20) {
      setMeterTitle('Strong');
      setBarOne('strong');
      setBarTwo('strong');
      setBarThree('strong');
      setBarFour('strong');
      setBarFive('');
    } else if (passwordLength < 23) {
      setMeterTitle('Elite');
      setBarOne('elite');
      setBarTwo('elite');
      setBarThree('elite');
      setBarFour('elite');
      setBarFive('elite');
    } else {
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

  return (
    <div className="wrapper">
      <div className="app-title">Password Generator</div>
      <div className="password">
        {!upperCaseChecked &&
        !lowerCaseChecked &&
        !numbersChecked &&
        !symbolsChecked ? (
          <span className="no-option-selected">Select an option</span>
        ) : passwordLength > 0 ? (
          <span>{password}</span>
        ) : (
          <span className="password-no-length">P4$5W0rD!</span>
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
              onChange={(e) => handleSliderChange(e)}
              value={passwordLength}
              type="range"
              min="8"
              max="22"
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
            onClick={() => handleCheckboxToggle('lowercase')}
            className="checkbox-container"
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
      </div>
    </div>
  );
};

export default Generator;
