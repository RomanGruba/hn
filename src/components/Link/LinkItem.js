import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import distanceInWordToNow from "date-fns/distance_in_words_to_now";
import FirebaseContext from "../../firebase/context";

function LinkItem({ link, index, showCount, history }) {
  const { firebase, user } = useContext(FirebaseContext);

  const handleVote = () => {
    if (!user) {
      history.push("/login");
    } else {
      const voteRef = firebase.db.collection("links").doc(link.id);
      voteRef.get().then((doc) => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, vote];
          const voteCount = updatedVotes.length;
          voteRef.update({ votes: updatedVotes, voteCount });
        }
      });
    }
  };

  const getDomain = (url) => {
    return url.replace(/^https?:\/\//i, "");
  };

  const postedByAuthUser = user && user.uid === link.postedBy.id;

  const handleDeleteLink = () => {
    const linkRef = firebase.db.collection("links").doc(link.id);
    linkRef
      .delete()
      .then(() => {
        console.log(`Document with ID ${link.id} deleted!`);
      })
      .catch((err) => {
        console.error("Error deleting document:", err);
      });
  };

  return (
    <div className="flex items-start mt-2">
      <div className="flex items-center ">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button" onClick={handleVote}>
          &#9650;
        </div>
      </div>
      <div className="ml1">
        <div className="">
          <a href={link.url} className="black no-underline">
            {link.description}
          </a>
          <span className="link">({getDomain(link.url)})</span>
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes by {link.postedBy.name}{" "}
          {distanceInWordToNow(link.created)}
          {" | "}
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0
              ? `${link.comments.length} comments`
              : "discuss"}
          </Link>
          {postedByAuthUser && (
            <>
              {" | "}
              <span className="delete-button" onClick={handleDeleteLink}>
                delete
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
