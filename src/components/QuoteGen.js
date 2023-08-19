//App Component
import React, {Component} from "react"
import "./sty.scss";

class Quote extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        color: "red"
      };
      
      //Bind handles
      this.handleChangeColor = this.handleChangeColor.bind(this);
    }
    
    handleChangeColor(color){
      this.setState({
        color: color
      });
    }
    
    render() { 
      return (
        <div id="app" className={this.state.color}>
          <QuoteBox onChangeAppColor={this.handleChangeColor}/>
        </div>
      );
    }
  }
  
  //Quote Box Component
  class QuoteBox extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        quoteText: "",
        quoteAuthor: "",
        curColor: "gray",
        tweetUrl: "https://twitter.com/intent/tweet/?text="
      }
      
      this.getNewQuote();
      
      //Bind handles
      this.handleNewQuote = this.handleNewQuote.bind(this);
      this.getNewQuote = this.getNewQuote.bind(this);
    }
    
    //Handles switching the quote
    handleNewQuote(){
      const colors = ["gray", "blue", "orange", "green", "red", "purple"];
      let color = colors[Math.floor(Math.random() * colors.length)];
      while(color === this.state.curColor){
        color = colors[Math.floor(Math.random() * colors.length)];
      }
      this.setState({
        curColor: color
      });
      this.props.onChangeAppColor(color);
      this.getNewQuote();
    }
    
    //Gets a quote and author from TypeFit API at random
    getNewQuote(){
      const app = this;
      fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        app.setState({
          quoteText: data.content,
          quoteAuthor: data.author,
          tweetUrl: "https://twitter.com/intent/tweet/?text=" + data.content.replace(/ /g, "+")
        });
      });
    }
    
    render(){
      return (
        <div>
        <main id="quote-box">
          <div id="quote-content">
          
            <div id="text"><i class="fa fa-quote-left"> </i> {this.state.quoteText}</div>
            <div id="author">{this.state.quoteAuthor}</div>
          </div>
          <button id="new-quote" onClick={this.handleNewQuote}>New Quote</button>
          <a href={this.state.tweetUrl} target="_blank" id="tweet-quote"><i className="fa fa-twitter"></i></a>
          <p className="footer">Made with ❤️ by Md Al-Mustanjid</p>
        </main>
       
         </div>
      );
    }
  }
 export default Quote;