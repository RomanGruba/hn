import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";

function LinkDetail(props) {
  const { firebase, user } = useContext(FirebaseContext);
  const [link, setLink] = useState(null);
  const [commentText, setCommentText] = useState("");
  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection("links").doc(linkId);

  useEffect(() => {
    getLink();
  }, []);

  function getLink() {
    linkRef.get().then((doc) => {
      setLink({ ...doc.data(), id: doc.id });
    });
  }

  function handleAddComment() {
    if (!user) {
      props.history.push("/login");
    } else {
      linkRef.get().then((doc) => {
        if (doc.exists) {
          const previousComments = doc.data().comments;
          const comment = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            comment: commentText,
          };
          const updatedComments = [...previousComments, comment];
          linkRef.update({ comments: updatedComments });
          setLink((prevState) => ({
            ...prevState,
            comments: updatedComments,
          }));
        }
      });
    }
  }

  return !link ? (
    <div className="">Loading....</div>
  ) : (
    <div className="">
      <LinkItem showCount={false} link={link} />
      <textarea
        onChange={(e) => setCommentText(e.target.value)}
        value={commentText}
        cols="60"
        rows="6"
      />
      <div className="">
        <button className="button" onClick={handleAddComment}>
          Add comment
        </button>
      </div>
      {link.comments.map((comment, index) => (
        <div className="" key={index}>
          <p className="comment-author">Name | Cereated</p>
          <p>Comment text</p>
        </div>
      ))}
    </div>
  );
}

export default LinkDetail;
