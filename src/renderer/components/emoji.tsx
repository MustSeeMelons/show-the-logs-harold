import React from "react";

interface IEmojiProps {
  symbol: string;
  label?: string;
}

const Emoji: React.FC<IEmojiProps> = (props) => {
  return (
    <span
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  );
};

export { Emoji };
