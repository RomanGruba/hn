import React from "react";
import LinkList from "./LinkList";
import { Link } from "react-router-dom";

function LinkItem({ link, index, showCount }) {
  return (
    <div className="flex items-start mt-2">
      <div className="flex items-center ">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button">&#9650;</div>
      </div>
      <div className="ml1">
        <div className="">
          {link.description} <span className="link">({link.url})</span>
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes by {link.postedBy.name} {link.created}
          {" | "}
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0
              ? `${link.comments.length} comments`
              : "dicuss"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LinkItem;
