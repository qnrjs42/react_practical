const Likebutton = () => {
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소' : '좋아요';

  return React.createElement(
    'button',
    { onClick: () => setLiked(!liked)},
    text,
  );
}

const domContainer = document.getElementById("root");
ReactDOM.render(
  React.createElement(
    "div",
    null,
    React.createElement(Likebutton),
    React.createElement(Likebutton),
    React.createElement(Likebutton)
  ),
  domContainer
);