import React, { useState, useEffect, useContext } from "react";
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";

function SearchLinks() {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getInitialLinks();
  }, []);

  function getInitialLinks() {
    firebase.db
      .collection("links")
      .get()
      .then((snapshot) => {
        const links = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setLinks(links);
      });
  }

  function handleSearch(e) {
    e.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter((link) => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredLinks(matchedLinks);
    console.log(matchedLinks);
  }

  return (
    <div className="">
      <form onSubmit={handleSearch}>
        <div className="">
          Search <input onChange={(e) => setFilter(e.target.value)} />
          <button type="submit">OK</button>
        </div>
      </form>

      {filteredLinks.map((link, index) => (
        <LinkItem key={link.id} showCount={false} link={link} index={index} />
      ))}
    </div>
  );
}

export default SearchLinks;
