# Frontend Mentor - Password generator app solution

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development of this project](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![Password Generator Screenshot](./public/password-generator-screenshot.png)

### Links

- Live Site URL: [Password Generator](https://password-generator-ajsaule.vercel.app)

## My process

I decided to do this project because it looked like something that I could achieve from my level of experience. I first decided to break down the design with some planning using Excalidraw which I will attach some screenshots to display my planning process, I broke down into sections that allowed me to better understand what needed to be built in the end. I also took some notes on how I would plan out building the core functionalities of the app.

### Built with

- Semantic HTML5 markup
- SASS (SCSS) - Syntactically Awesome Style Sheets
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/)

### What I learned

Firstly that you can use `Math.random()` and multiply it by the length of an array to generate a randomly selected array index. Also I learned that you can create an array with with the array constructor and map over that passing a function reference to that map method to execute and return a 1:1 copy of that array but with the output of the given function that was passed to the method. The relevant code is below.

```js
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

const passwordGenerator = (pwdLength: Number): string => {
  if (pwdLength >= 7) {
    const passwordString = [...Array(parseInt(pwdLength))]
      .map(characterGenerator)
      .join('');
    return passwordString;
  } else {
    const passwordString = [...Array(parseInt(pwdLength))]
      .map(wordGenerator)
      .join(passwordDelimiter);
    return passwordString;
  }
};
```

Some other learnings from this project would be using the resets on different browsers and targeting elements of the out of the box HTML5 tags such as <input/>.

```css
input[type='range']::-moz-range-track,
input[type='range']::-ms-track,
input[type='range']::-webkit-slider-runnable-track {
  -ms-appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 0;
  height: 8px;
}
```

Another interesting insight was using the `use-debounce` package, that was a hook coming from the community that allowed me to delay a function from running again for a certain period of time, I was using this with a `useEffect` that was listening for window re-size changes, it helped significantly. One more thing I learned here is that clean up functions in `useEffect` hooks help with reducing memory leaks and unwanted behavior of apps.

```js
const handleWindowResize = useDebouncedCallback((): void => {
  setWindowSize(getWindowSize());
}, 1000);

useEffect(() => {
  window.addEventListener('resize', handleWindowResize);

  return () => {
    window.removeEventListener('resize', handleWindowResize);
  };
});
```

### Continued development of this project

Things I would like to implement on this project:

- An input field so the user can input their custom password and check how long it would take for it to be cracked
- A checkbox to select camel case, snake case, pascal case and kebab case is already implemented
- A tooltip when you hover over the time to crack field

### Useful resources

- [Reactiflux Discord](https://www.reactiflux.com/) - This discord is amazing when you get stuck and can't find much help on the internet or SO
- [Stack overflow](https://www.stackoverflow.com/) - Helped me to get unstuck at various phases.

## Author

- Website - [Andrej Saule](https://www.andrejsaule.com)
- Frontend Mentor - [@ajsaule](https://www.frontendmentor.io/profile/ajsaule)
- Twitter - [@ajsaule](https://www.twitter.com/ajsaule)

## Acknowledgments

Big thanks to the devs from Reactiflux Discord that helped me when I got stuck along the way. I learned a lot from all of you, thanks for your volunteered time and patience you had with me.
