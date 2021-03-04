import '../style/App.css';
import codemojis from '../data/tools.json';
import { useState, useEffect } from 'react';
import { Contributors } from '../components'
import { countBy } from 'lodash';

const Home = () => {

  const emojis = ["😎", "🤣", "🥱", "🤭", "😳", "😒", "🥳", "😀", "😊", "😋", "😝", "😅", "😆", "😘", "😱", "😨"];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  // makes a list of just the categories of the tools
  const allCategories = codemojis.map( tool => tool.code )

  const countCategories = countBy(allCategories)
  const [currCategory, setCurrCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleEmojis, setVisibleEmojis] = useState(codemojis)
  
  

  // if searchQuery or currCategory changes, then update visibleTools
  useEffect(() => {
    setVisibleEmojis(
      filteredEmojis()
    )
  }, [searchQuery, currCategory])

  // returns an object of tools
  const filteredEmojis = () => {
    const emojisByCategory = currCategory === "All"
      ? codemojis // if all
      : codemojis.filter(emoji => emoji.code === currCategory) // otherwise apply category

    // query name and description
    const emojisBySearch = emojisByCategory
      .filter(emoji => ((emoji.code + emoji.desc).toLowerCase()).includes(searchQuery.toLowerCase()))
    return emojisBySearch;
  }

  const changeSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div>
     
      <br/><br/><br/><br/>
      
      <header>
        <div className="header-content">
          <h1>codem<span className="random-emoji">{randomEmoji}</span>ji</h1>

          <p className="header-subtitle">emoji shortcode's for commit messages or, for anything text/markdown related!</p>
          <div className="search-wrapper">
            <input
              className="search" autoFocus type="text" autoComplete="off" spellCheck="false" placeholder={`Search codemojis (ie. rocket)`}
              value={searchQuery}
              onChange={changeSearch}
            />

<div className="contribute-wrapper">
            <span className="contribute">contribute to codemoji on <a href="https://github.com/heybereket/codemoji" target="_blank">github</a>, follow the creator on <a href="https://twitter.com/heybereket" target="_blank">twitter</a>. </span>
</div>
          </div>
        </div>
      </header>


      { (visibleEmojis.length === 0) && (
          <center><span className="no-results">😥 Sorry! No codemojis found for <strong>{searchQuery}</strong>.</span></center>

      )}

      <div className="emojis">
        
        {
          visibleEmojis
          .map( emoji => (
         
            <div className="emoji">
              
              
              <span onClick={function(e){
           
              // creating textarea of html
              
              var input = document.createElement("textarea");
              input.value = emoji.emoji;
              document.body.appendChild(input);
              input.select();
              document.execCommand("Copy");
              // removing textarea after copy
              input.remove();
              alert(`👍🏻 Successfully Copied: ${input.value}`);
              }} 
        
              className="display" style={{backgroundColor: ` ${emoji.bgColor}`}}>{emoji.emoji}</span>
               
               { (emoji.popular === true) && (
               <div className="popular"><strong>🔥 popular</strong></div>
               )}

              <div className="info-wrapper">
                <p className="code">{emoji.code}</p>
                <small>{emoji.desc}</small>
              </div>  

            </div>
        ))}
      </div>

      <Contributors />

    </div>
  );
}

export default Home;
