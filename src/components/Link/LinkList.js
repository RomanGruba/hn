import React, { useContext, useEffect, useState } from "react";
import LinkItem from "./LinkItem";
import FirebaseContext from "../../firebase/context";

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    firebase.db.collection("links").onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const linksFetched = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(linksFetched);
  }

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem
          key={link.id}
          showCount={true}
          link={link}
          index={index + 1}
        />
      ))}
    </div>
  );
}

export default LinkList;
