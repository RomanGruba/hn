import React, { useContext, useEffect, useState } from "react";
import LinkItem from "./LinkItem";
import FirebaseContext from "../../firebase/context";

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const isNewPage = props.location.pathname.includes("new");

  useEffect(() => {
    let isFetching = true;
    const fetchingItems = async () => {
      if (isFetching) {
        await getLinks();
      }
    };
    fetchingItems();
    return () => (isFetching = false);
  }, []);

  function getLinks() {
    firebase.db
      .collection("links")
      .orderBy("created", "desc")
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const linksFetched = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(linksFetched);
  }

  function renderLinks() {
    if (isNewPage) {
      return links;
    }
    const topLinks = links
      .slice()
      .sort((l1, l2) => l2.votes.length - l1.votes.length);

    return topLinks;
  }

  return (
    <div>
      {renderLinks().map((link, index) => (
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
