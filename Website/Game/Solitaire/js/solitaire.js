let SUITS = [
  {name: 'Clubs', color: 'black'},
  {name: 'Diamonds', color: 'red'},
  {name: 'Hearts', color: 'red'},
  {name: 'Spades', color: 'black'}
];

class Deck {
  constructor(){
    this.cards = [];
  }

  draw(){
    return(this.cards.pop());
  }

  cardCount(){
    return(this.cards.length)
  }

  isEmpty(){
    return(0 == this.cardCount);
  }

  takeCardBottom(){
    return(this.cards.shift());
  }

  putCardBottom(card){
    this.cards.unshift(card);
  }

  putCardTop(card){
    this.cards.push(card);
  }

  checkCardTop(i = 0){
    return(this.cards[this.cards.length - 1 - i]);
  }

  checkCardBottom(i = 0){
    return(this.cards[i]);
  }

  shuffle(){
    for (let i = this.cards.length - 1; i > 0; --i){
      let swapPos = Math.floor(Math.random() * i);
      let temp = this.cards[swapPos];
      this.cards[swapPos] = this.cards[i];
      this.cards[i] = temp;
    }
  }
}

class StandardDeck extends Deck {
  constructor(){
    super();
    this.suits = SUITS;
    this.numbers = 13;
    for (let i = 0; i < this.suits.length; ++i){
      for (let j = 1; j <= this.numbers; ++j){
        this.putCardBottom(new Card(this.suits[i], j))
      }
    }
  }
}

class CompletePile extends Deck {
  constructor(suit){
    super();
    this.suit = suit;
  }

  isNextCard(card){
    return(
      card.suit.name == this.suit.name &&
      card.number == this.cards.length + 1
    );
  }
}

class PlayStack extends Deck {
  constructor(){
    super();
    this.faceDown = new Deck();
  }

  isNextCard(card){
    if (this.isEmpty()){
    }
    let topCard = this.checkCardTop();
    return(
      this.isEmpty() ||
      (
        card.number == topCard.number - 1 &&
        card.suit.color != topCard.suit.color
      )
    );
  }

  draw(){
    this.card = this.cards.pop();
    if (this.isEmpty && !this.faceDown.isEmpty()){
      this.putCardBottom(this.faceDown.draw());
    }
    return(card);
  }
}

class Card {
  constructor(suit, number){
    this.suit = suit;
    this.number = number;
  }
}

class Solitaire {
  constructor(){
    this.startGame();
  }

  startGame(){
    this.deck = new StandardDeck();
    this.deck.shuffle();
    this.clearSelection();
    this.discard = new Deck();
    this.stacks = [];
    for (let i = 1; i <= 7; ++i){
      let stack = new PlayStack();
      for (let j = 0; j < i - 1; ++j){
        stack.faceDown.putCardTop(this.deck.draw());
      }
      stack.putCardTop(this.deck.draw());
      this.stacks.push(stack);
    }
    this.completePiles = [];
    for (let i = 0; i < this.deck.suits.length; ++i){
      this.completePiles.push(new CompletePile(SUITS[i]));
    }
  }

  clearSelection(){
    this.selected = undefined;
  }

  selectDeck(){
    this.clearSelection();
    if (this.deck.isEmpty()){
      while(!this.discard.isEmpty()){
        this.deck.putCardBottom(this.discard.takeCardBottom());
      }
    } else {
      this.discard.putCardTop(this.deck.draw());
    }
  }

  selectDiscard(){
    this.selected = {
      type: 'discard',
      card: this.discard.checkCardTop()
    };
  }

  selectComplete(completeIndex){
    if (undefined == this.selected){
      this.selected = {
        type: 'complete',
        completeIndex: completeIndex,
        card: this.completePiles[completeIndex].checkCardTop()
      };
    } else {
      if ('discard' == this.selected.type){
        if (this.completePiles[completeIndex].isNextCard(this.selected.card)){
          this.completePiles[completeIndex].putCardTop(this.discard.draw());
        }
      } else if ('stack' == this.selected.type){
        if (this.completePiles[completeIndex].isNextCard(this.selected.card)){
          this.completePiles[completeIndex].putCardTop(
            this.stacks[this.selected.stackIndex].draw()
          );
        }
      }
      clearSelection();
    }
  }

  selectStack(stackIndex, cardIndex){
    if (undefined == this.selected){
      this.selected = {
        type: 'stack',
        stackIndex: stackIndex,
        cardIndex: cardIndex,
        card: this.stacks[stackIndex].checkCardBottom(cardIndex)
      };
    } else {
      if ('discard' == this.selected.type){
        if (this.stacks[stackIndex].isNextCard(this.selected.card)){
          this.stacks[stackIndex].putCardTop(this.discard.draw());
        }
      } else if ('completed' == this.selected.type){
        if (this.completePiles[this.selected.completeIndex].isNextCard(this.selected.card)){
          this.stacks[stackIndex].putCardTop(
            this.completePiles[this.selected.completeIndex].draw()
          );
        }
      } else if ('stack' == this.selected.type){
        if (this.stacks[stackIndex].isNextCard(this.selected.card)){
          this.stackSet[stackIndex].concat(
            this.stackSet[stackIndex],
            this.stackSet[this.selected.stackIndex].slice()
          );
        }
      }
      clearSelection();
    }
  }
}

