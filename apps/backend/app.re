let globalStyles = {js|
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }

  * {
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
|js};

module Page = {
  [@react.component]
  let make = (~children, ~scripts=[]) => {
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title> {React.string("Rin.rocks")} </title>
        <link
          rel="shortcut icon"
          href="https://reasonml.github.io/img/icon_50.png"
        />
        <style
          type_="text/css"
          dangerouslySetInnerHTML={"__html": globalStyles}
        />
        <script src="https://cdn.tailwindcss.com" />
      </head>
      <body>
        <div id="root"> children </div>
        {scripts |> List.map(src => <script src />) |> React.list}
      </body>
    </html>;
  };
};

module Link = {
  [@react.component]
  let make = (~href, ~children) => {
    let (useState, setState) = React.useState(() => false);

    React.useEffect0(() => {
      setState(_prev => !useState);

      None;
    });

    <a
      onClick={_e => print_endline("clicked")}
      className="font-medium text-blue-600 hover:underline flex items-center"
      href>
      {React.string(children)}
      <svg
        className="w-3 h-3 ms-2 rtl:rotate-180"
        ariaHidden=true
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>;
  };
};

module Home = {
  [@react.component]
  let make = (~renderMode="renderToString") => {

    <div className="p-8">
      <h1 className="font-bold text-2xl">
        {React.string("Trying Server Reason React 🐫 - render mode: " ++ renderMode)}
      </h1>
      <br />
      <p>
        {React.string("FINALLY, We can FullStack with React Real World. 🐫")}
      </p>
    </div>;
  };
};

module Todo = {
  type todo = {
    id: int,
    title: string
  };

  [@react.component]
  let make = () => {
    let (state, _setState) = React.useState(() => [
      {title: "hello", id: 1},
      {title: "hello", id: 1},
      {title: "hello", id: 1},
      {title: "hello", id: 1},
      {title: "hello", id: 1},
      {title: "hello", id: 1}
  ]);

    <div>
      <input type_="text" placeholder="Add a todo..." />
      <ul>
      {
        state
        |>List.map(todo => <li key={todo.id|>string_of_int}>{todo.title|>React.string}</li>)
        |>React.list
      }
      </ul>
    </div>
  }
}

let home = <Page> <Home/> </Page>;

let stream = <Page> <Home renderMode="stream" /> </Page>;

let todo = <Page> <Todo/> </Page>;
