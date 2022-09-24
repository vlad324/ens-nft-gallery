const START = `
<html>
<head>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            background: slategray;
            margin: 0;
            padding: 3em 1em;
        }

        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        figure {
            margin: 0;
        }

        figcaption {
            font-style: italic;
            font-size: 0.8em;
            color: grey;
            line-height: 1.4;
        }

        .grid {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: 90%;
            grid-gap: 1em;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            padding: 2em 1em;
            background: white;
        }

        @media all and (min-width: 600px) {
            .grid {
                grid-auto-flow: initial;
                grid-template-columns: repeat(auto-fit, minmax(auto, 15em));
                justify-content: center;
            }
        }

        .grid__figure {
            display: grid;
            grid-template-rows: 15em 1fr;
            grid-gap: 1em;
        }

        .grid__figure img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

    </style>
</head>
<body>
<ul class="grid">`;

const toItem = (name: string, imageUrl: string) => {
  return `
    <li>
      <figure class="grid__figure">
          <img src="${imageUrl}" alt="${name}">
          <figcaption>${name}</figcaption>
      </figure>
    </li>
`;
};

const END = `</ul>
</body>
</html>
`;

export const createHtml = (data: { name: string, imageUrl: string }[]): string => {
  let result = START;

  data.forEach(d => {
    result += toItem(d.name, d.imageUrl);
  });

  return result + END;
}