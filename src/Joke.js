// import React, { Component } from "react";
// import "./Joke.css";

// /** A single joke, along with vote up/down buttons. */

// class Joke extends Component {
//   render() {
//     const { id, vote, votes, text } = this.props;

//     return (
//       <div className="Joke">
//         <div className="Joke-votearea">
//           <button onClick={evt => vote(id, +1)}>
//             <i className="fas fa-thumbs-up" />
//           </button>

//           <button onClick={evt => vote(id, -1)}>
//             <i className="fas fa-thumbs-down" />
//           </button>

//           {votes}
//         </div>

//         <div className="Joke-text">{text}</div>
//       </div>
//     );
//   }
// }

// export default Joke;

import React from "react";
import "./Joke.css";

function Joke({ joke, votes, upvote, downvote }) {
  return (
    <div className="Joke">
      <div className="Joke-text">{joke}</div>
      <div className="Joke-votes">
        <button onClick={upvote}>Upvote</button>
        <span>{votes}</span>
        <button onClick={downvote}>Downvote</button>
      </div>
    </div>
  );
}

export default Joke;


