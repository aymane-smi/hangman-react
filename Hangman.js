import React, {Component} from 'react';
import './Hangman.css';
import { randomWord } from './words';
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
 export default class Hangman extends Component{
   static defaultProps = {
     maxWrong: 6,
     images: [img0, img1, img2, img3, img4, img5, img6]
   }
   constructor(props){
     super(props);
     this.state = {
       nWrong: 0,
       guessed: new Set(),
       answer: randomWord()
     };
     this.handleGuess = this.handleGuess.bind(this);
     this. reset = this.reset.bind(this);
   }
   reset(){
     this.setState({
       nWrong: 0,
       guessed: new Set(),
       answer: randomWord()
     });
   }
   guessedWord(){
     return this.state.answer
     .split("")
     .map( alpha => (this.state.guessed.has(alpha) ? alpha: '_')); 
   }
   handleGuess(event){
    let alpha = event.target.value;
    this.setState(st =>({
      guessed: st.guessed.add(alpha),
      nWrong: st.nWrong+ (st.answer.includes(alpha)? 0: 1)
    }));
   }
   generateButtons(){
     return "abcdefghijklmnopqrstuvwxyz".split("").map(alpha =>(
       <button
        key={alpha}
        value={alpha}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(alpha)}
       >
         {alpha}
       </button>
     ));
   }
   render(){
     const gameOver = this.state.nWrong >= this.props.maxWrong;
     const isWinner = this.guessedWord().join("") === this.state.answer;
     const altText = `${this.state.nWrong}/${this.props.maxWrong}`;
     let gameState = this.generateButtons();
     if(isWinner)
      gameState = 'You Win!';
     if(gameOver)
      gameState = 'You Lose';
     return (<div className="Hangman">
       <h1>Hangman</h1>
       <img src={this.props.images[this.state.nWrong] } alt={altText} />
       <p >Guessed Wrong: {this.state.nWrong}</p>
       <p className='Hangman-word'>
         {!gameOver ? this.guessedWord() : 'apple'}
         </p>
       <p className='hangman-btns'>{gameState}</p>
       <button onClick={this.reset} id="reset">Restart?</button>
     </div>);
   }
 }