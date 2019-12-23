let str = React.string;
module Styles = {
  open Css;

  let wrapper = style([display(`flex), marginBottom(px(16))]);
  let img =
    style([
      width(px(64)),
      height(px(64)),
      borderRadius(px(32)),
      marginRight(px(12)),
    ]);

  let bioText = style([display(`flex), alignItems(`center)]);
};

[@react.component]
let make = () =>
  <div className=Styles.wrapper>
    <img src="/images/me.png" alt="ri7nz" className=Styles.img />
    <p className=Styles.bioText>
      {"Written by ri7nz <ri7nz.labs@gmail.com>" |> str}
      <a href="https://twitter.com/ri7nz">
        {"You should follow him on Twitter" |> str}
      </a>
    </p>
  </div>;

let default = make;
