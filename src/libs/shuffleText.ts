interface IOptionRandom {
  offset?: number;
  timeout: number;
  iterations: number;
  characters: Array<string | number>;
  resolveString?: string | number;
  element?: Element;
  partialString?: string;
}

const options: IOptionRandom = {
  timeout: 5,
  iterations: 10,
  characters: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "K",
    "M",
    "#",
    "%",
    "&",
    "-",
    "+",
    "?",
    "/",
    "=",
  ],
};

const randomCharacter = (
  characters: Array<string | number>
): string | number => {
  return characters[getRandomInteger(0, characters.length - 1)];
};

const getRandomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const doRandomiserEffect = (options: IOptionRandom, callback: Function) => {
  const characters = options.characters;
  const timeout = options.timeout;
  const element = options.element;
  const partialString = options.partialString;

  let iterations = options.iterations;

  setTimeout(() => {
    if (iterations >= 0) {
      const nextOptions = Object.assign({}, options, {
        iterations: iterations - 1,
      });

      // Ensures partialString without the random character as the final state.
      if (iterations === 0) {
        element.textContent = partialString;
      } else {
        // Replaces the last character of partialString with a random character
        element.textContent =
          partialString.substring(0, partialString.length - 1) +
          randomCharacter(characters);
      }

      doRandomiserEffect(nextOptions, callback);
    } else if (typeof callback === "function") {
      callback();
    }
  }, timeout);
};

const doResolverEffect = (options: IOptionRandom) => {
  const resolveString = String(options.resolveString);
  //const characters = options.characters;
  const offset = options.offset;
  const partialString = resolveString.substring(0, offset);
  const combinedOptions = Object.assign({}, options, {
    partialString: partialString,
  });

  doRandomiserEffect(combinedOptions, () => {
    const nextOptions = Object.assign({}, options, { offset: offset + 1 });

    if (offset <= resolveString.length) {
      doResolverEffect(nextOptions);
    }
  });
};

export const shuffle = (data: string, id: string) => {
  const element = document.getElementById(id);

  if (!element) return;

  const opt = Object.assign({}, options, {
    element,
    resolveString: data,
    offset: 1,
  });

  doResolverEffect(opt);
};
