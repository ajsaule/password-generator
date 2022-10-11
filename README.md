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
  - [Continued development](#continued-development)
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

- Live Site URL: [Password Generator Live Site](https://password-generator-ajsaule.vercel.app)

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

I took some unique learnings away from this project:

Firstly that you can use `Math.random()` and multiply it by the length of an array to generate a randomly selected index. Also I learned that you can create an array with with the array constructor and map over that, passing a function reference to that map method to execute and return ad 1:1 copy of that array but with the output of the given function that was passed to the method. The relevant code is below.

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

Some other learnings from this project would be using the resets on different browser types and targeting elements of the out of the box HTML5 tags such as <input/>.

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

Another interesting insight was using the `use-debounce` package, that was a hook coming from the community that allowed me to delay a function from running again for a certain period of time, I was using this with a `useEffect` that was listening for window re-size changes, so it helped significantly. One more thing I learned here is that clean up functions in `useEffect` hooks help with reducing memory leaks and unwanted behavior of apps.

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

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
