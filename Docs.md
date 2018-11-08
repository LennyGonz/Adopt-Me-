# Introduction

- React is a library not a framework, know the difference!
- React is nearly never used by itself so it's useful to know the tools being used.
- This project is more modular and there are a lot of tools being used!
  - I started off diving head first using `create-react-app` but it's useful to know how React works by looking under the hood. So this is what pure React looks like:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="./style.css">
  <title>Adopt Me</title>
</head>

<body>
  <div id="root">not rendered</div>
  <script src="https://unpkg.com/react@16.4.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.4.1/umd/react-dom.development.js"></script>
  <script>
  const App = () => {
    return React.createElement(
      "div",
      {},
      React.createElement("h1", {}, "Adopt Me!")
  );
};
ReactDOM.render(React.createElement(App), document.getElementById("root"));
  </script>
</body>

</html>
```

We have 2 script tags:

- The first is the React library. This library is the interface of how to interact with React; all the methods will be via this library. It contains no way of rendering itself though; it's just the API
- The second library is the rendering layer. Since we're rendering to thr browser, we're using ReactDOM. There are other React libraries like React Native, React 360(VR), A-Frame React, React Blessed, and others. You need both script tags.

The last script tag is where we're going to put our code.

- You **never** do this, but it's a way of showing React for what it truly is and it's the simpliest React App you can build

- The first thing we do is make our own component, App. React is all about making components. And then taking those components and making more components out of those.
- There are two types of components, functional components and class components. This is a functional component.
- A functional component _must_ return markup (which is what `React.createElement` generates)
- These component render functions _have_ to be fast. This function is going to be called a lot. It's a hot code path.
- Inside of the render function, you cannot modify any sort of state. Put in functional terms, this function must be pure. You don't know how or when the function will be called so it can't modify any ambient state.
- `React.createElement` creates **one** instance of some component. If you pass it a stirng, it will create a DOM tag with that as the string.

We remove that simple app and modify it:

```javascript
const Pet = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Luna"),
    React.createElement("h2", {}, "Dog"),
    React.createElement("h2", {}, "Havanese")
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet),
    React.createElement(Pet),
    React.createElement(Pet)
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
```

- To make an element have multiple children, just pass it an array of elements
- We created a second **new** component, the `Pet` component. This component represents one pet. When you have distinct ideas represented as markup, that's a good idea to separate that it into a component like we did here.
- Since we have a new `Pet` component, we can use it multiple times! We _just_ use multiple calls to `React.createElement`.
- In `createElement`, the last two parameters are optional. Since Pet has no props or children (it can I just haven't done it yet) -- ignore console warnings about keys for now
- By rendering Pet 3x we should see Lunda Dog Havanese appear 3 times, because we're rednering the same hard-coded component 3 times.
- In order to have multiple pets we begin to use props!

```javascript
const Pet = props => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed)
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, {
      name: "Luna",
      animal: "Dog",
      breed: "Havanese"
    }),
    React.createElement(Pet, {
      name: "Pepper",
      animal: "Bird",
      breed: "Cockatiel"
    }),
    React.createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mix" })
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
```

- By adding props to the child component,`Pet`, it becomes more flexible and can accept props from its parent component `App`
- Props are variables that a parent `App` passes to its children (the instances of Pet). So for each instance we can pass different information, so each Pet instance is different
- This is what React does...makes multiple resuable components.

### Converting our functional components to Class components

App can be more interactive as so:

```javascript
class App extends React.Component {
  render() {
    return React.createElement("div", {}, [
      React.createElement("h1", {}, "Adopt Me!"),
      React.createElement(Pet, {
        name: "Luna",
        animal: "Dog",
        breed: "Havanese"
      }),
      React.createElement(Pet, {
        name: "Pepper",
        animal: "Bird",
        breed: "Cockatiel"
      }),
      React.createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mix" })
    ]);
  }
}
```

- When we have a dumb component(components that don't have a state or interactions) there's no need to create a Class component, it's ideal to use functional components. However, there are people who create a class component anyway. So it's users choice.
- Each class component must have a `render` function. Each render function must return the result of a `createElement` call.
- Props come down in the parameters in function components, the props are attached to `this` in classes

## npm, ESLint & Prettier

npm is necessary to download all the packages that need to be used.
To start a project run npm init -y (the -y just means say yes to all the questions)

ESlint and Prettier are optional...but theyre extremely important for maintaining high quality code. These two tools allow you to focus more on architecture and problem-solving and less on syntax and style.

[Prettier](https://prettier.io/) makes your code more readable and it very easy to configure so the styling of your code is to your specification. Normally the default should be enough but occassionally the few tweaks are needed! And for semi-colon obsessed languages, prettier adds them in the correct places (automatically) for you when you forget! Adding it to your project is so simple as well! Just create a file called .prettierrc and put `{}` in the file and thats it. Lets everyone know this is a Prettier project that uses the default configuration.

For group projects, members may not want/have prettier installed so we add it as a dependency using the command `npm install -D prettier` (the -D means it's for development only) once it's installed. You can add a script: format inside the package.json file

```json
"scripts": {
	"format": "prettier --write \"src/**/*.{js,jsx}\"",
},
```

So this allows your team members to run `yarn format` or `npm run format` and it'll use prettier to format the code.

[ESLint](https://eslint.org/) enforces some "good" habits when writing JS code. For example you should never use `with` which is valid in JS but ill advised, ESLint will remind you not to use it by flagging it as an error. So to use ESLint run `npm install -D eslint` then we create a file called .eslintrc.json to create our configurations for it. **There are dozens of preset configs** for ESLint, and the Airbnb config is very popular, and strit... I use what I feel most comfortable with:

```json
{
  "extends": ["eslint:recommended", "prettier", "prettier/react"],
  "plugins": [],
  "parserOptions": {
    "ecmaVersion": 2016,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  }
}
```

This will lint for both normal JS stuff as welll as JSX stuff. If you run `eslint script.js` or whatever you called the JS file there will be errors. If you run `eslint script.js --fix` and the some of the errors will be fixed for you. Then inside the package.json file we add a script for linting
`"lint": "eslint **/*.{js,jsx} --quiet"`

## Parcel

[Parcel](https://parceljs.org/) is a new bundler for JavaScript projects, and its an amazing tool that requires 0 configurations. It works with everything we want to do out of the box. And it was created by one of the creaters of Webpack.
_I enjoy Webpack, I think it's amazing, Parcel is just a great alternative, and it's worth exploring_
Install Parcel with `npm install -D parcel-bundler` and inside of the package.json file put:

```json
"scripts" {
  "dev": "parcel src/index.html"
}
```

Then the site should be up at [localhost](http://localhost:1234). Unlike using create-react-app the site is being run through Parcel which means we can leaverage all the features that Parcel has. Also notice we never installed React...
We give Parcel an entry point, which is index.html. It then reads that index.html file and find its dependencies, which is the 2 React scripts we imported and the one App.js file. But App.js is local and so it reads it and compiles its dependencies.

The React and ReactDOM dependencies come from unpkg and it isn't meant to serve production traffic. So we run `npm install react react-dom`, and npm will pull React and ReactDOM and put it in the node_modules directory. By doing this Parcel will include them in the main bundle.

So the index.html file should look like:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="./style.css">
  <title>Adopt Me</title>
</head>

<body>
  <div id="root">not rendered</div>
  <script src="https://unpkg.com/react@16.4.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.4.1/umd/react-dom.development.js"></script>
  <script src="App.js"></script>
</body>

</html>
```

App.js should look like:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import Pet from "./Pet";

class App extends React.Component {
  render() {
    return React.createElement("div", {}, [
      React.createElement("h1", {}, "Adopt Me!"),
      React.createElement(Pet, {
        name: "Luna",
        animal: "Dog",
        breed: "Havanese"
      }),
      React.createElement(Pet, {
        name: "Pepper",
        animal: "Bird",
        breed: "Cockatiel"
      }),
      React.createElement(Pet, { name: "Doink", animal: "Cat", breed: "Mix" })
    ]);
  }
}
```

And finally Pet.js should look like:

```javascript
import React from "react";

const Pet = props => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed)
  ]);
};

export default Pet;
```

**Again Alternatives to Parcel are Webpack and Browserify**

## JSX

We've created components without using JSX which is practically unheard of... so its time to start!

This is what the Pet component looks like with no JSX:

```javascript
import React from "react";

const Pet = props => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed)
  ]);
};

export default Pet;
```

And this is what is looks like with JSX:

```javascript
import React from "react";

const Pet = props => {
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.animal}</h2>
      <h2>{props.breed}</h2>
    </div>
  );
};

export default Pet;
```

JSX is basically translating the HTML tags into React.createElement calls. That's it. JSX does nothing else. And notice the syntax when inserting props: `{props.name}` -- this is how you output JavaScript expressions in JSX. An expression is anything that can be the right side of an assignment operator in JavaScript e.g `const x = <anything that can go here>`. If you take away the curly braces it will literally output props.name to the DOM. **If** you installed ESLint then it will catch it for you.

Having Pet.js in JSX the same will be done to App.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import Pet from "./Pet";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Adopt Me!</h1>
        <Pet name="Luna" animal="dog" breed="Havanese" />
        <Pet name="Pepper" animal="bird" breed="Cockatiel" />
        <Pet name="Doink" animal="cat" breed="Mix" />
      </div>
    );
  }
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
```

Notice that the Pet component has its own HTML-like tags that is how you render components in React. It needs to be captial P, or React will try to have `pet` as a web component and not a React component.
And we cann pass props down as we add attributes to an HTML tag

### ESLint + React

ESLint doesn't recognize React out of the box, so in order to configure the settings to recognize React we run:

1. `npm install -D babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react`

And update the .eslintrc.json to:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "prettier/react"
  ],
  "rules": {
    "react/prop-types": 0
  },
  "plugins": ["react", "import", "jsx-a11y"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  }
}
```

Personally these are the configurations I found are ideal and perfect for React projects, however I also used [Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) linting configurations
Linting is a very opinionated subjet, so feel free to explore what you like.
This particular configuration has a lot of rules to help you quickly catch common bugs but otherwise leaves you to code how you want:

- The import plugin helps ESLint catch common bugs around imports and exports and modules in general
- JSX-a11y catches many bugs around accessibility that can accidently arise during React, like not having an `alt` attribute on an `img` tag.
- React is mostly common React thhings, like making sure you import React anywhere you use React.
- babel-lint allows ESLint to use the same transpiling library, Babel, that Parcel uses under the hood. Withoutit, ESLint can't undersatand JSX.

## Handling Events and Async UIs with React

- We need to handle asynchronous loading of data, we can't just show the user nothing until everything loads; we need to let them know we're doing work to get their UI ready.

In Details.js we replace the simple component with:

```javascript
import React from "react";
import pf from "petfinder-client";
import Carousel from "./Carousel";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }
  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        let breed;
        if (Array.isArray(data.petfinder.pet.breeds.breed)) {
          breed = data.petfinder.pet.breeds.breed.join(", ");
        } else {
          breed = data.petfinder.pet.breeds.breed;
        }
        this.setState({
          name: data.petfinder.pet.name,
          animal: data.petfinder.pet.animal,
          location: `${data.petfinder.pet.contact.city}, ${
            data.petfinder.pet.contact.state
          }`,
          description: data.petfinder.pet.description,
          media: data.petfinder.pet.media,
          breed,
          loading: false
        });
      })
      .catch(err => this.setState({ error: err }));
  }
  render() {
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }

    const { animal, breed, location, description } = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
```

Notice we no longer use the Constructor, the new syntax is called **class properties**, it is a lot nice and easier to ready. Class properties are an upcoming part of JS so we tell Parcel to include that code transformation when it transpiles our code. We do that by making a Babel config file.

In order to make a Babel config file we need to install the following:
`npm install -D babel-eslint babel-core babel-preset-env babel-plugin-transform-class-properties`
Now we make a file called .babelrc and insert the following:

```
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "browsers": ["last 2 versions"]
        }
      }
    ]
  ],
  "plugins": ["transform-class-properties"]
}
```

And add the following to your .eslintrc.json: `"parser": "babel-eslint"`
Now with these configurations we can modify Details to be as so:
`state = { loading: true }`

When clicking on one of the animals you should notice that for a second it says "Loading..."
This is a good idea while you're waiting for data to load.

### Carousel

In a new file, Carousel.js, add the following:

```javascript
import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo.value}
              src={photo.value}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
```

Then in details add the Carousel component inside the Render-return
`<Carousel media={media} />

- **getDerivedStateFromPops** does exactly what it sounds like: it allows you to accept data from a parent and get state that is derivied from it. In this case, we're removing thr superfluous phots and just keep the ones we want...

```javascript
import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index
    });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* eslint-disable-next-line */
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo.value}
              src={photo.value}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
```

- When you create eventHandlers in React `this` loses its scope, we the `this` in handleIndexClick to be the correct `this`. Therefore we make eventhandlers arrow functions because an arrow funciton reassures that because it will be the scope of where it was defined.
  - another alternative is doing `this.<insertEventHandlerFunctionName> = this.<insertEventHandlerFunctionName>.bind(this)` this goes inside constructor if youre still using constructors... for more options read this [article](https://medium.com/front-end-hacking/tutorial-react-two-way-data-binding-2018-b935cb200964)
- 2 way data binding is not free in react, Angular and Ember do 2-way data binding... but 2 way data binding is more of a curse than a gift. Because when something breaks finding out what the problem is ... is almost impossible.
- If we were doing keyboard handlers, you'd do an onChange or onKeyUp etc handler.
- The data attribute comes back as a string. We want it to be the number, hence the `+`

## Forms with React
