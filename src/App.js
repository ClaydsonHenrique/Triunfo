import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      cards: [],
      filterName: '',
      filterRare: 'todas',
      filterCheckbox: false,
    };
  }

  validateInputs = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardImage,
    } = this.state;
    const validate = (
      cardRare.length > 0
        && cardName.length > 0
        && cardDescription > 0
        && this.validateAttr(cardAttr1)
        && this.validateAttr(cardAttr2)
        && this.validateAttr(cardAttr3)
        && this.validateSoma(cardAttr1, cardAttr2, cardAttr3)
        && cardImage.length > 0);
    if (validate) {
      this.setState(
        { isSaveButtonDisabled: false },
      );
    } else {
      this.setState(
        { isSaveButtonDisabled: true },
      );
    }
    return validate;
  };

  validateSoma = (attr1, attr2, attr3) => {
    const valorLimite = 210;
    const a1 = Number(attr1);
    const a2 = Number(attr2);
    const a3 = Number(attr3);
    const soma = a1 + a2 + a3;
    if (soma <= valorLimite) {
      return soma;
    }
    return false;
  };

  validateAttr = (attr) => {
    if (attr.length < 1 || attr < 0) {
      return false;
    }
    const number = Number(attr);
    const maxValue = 90;
    return number >= 0 && number <= maxValue;
  };

  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.validateInputs);
  };

  onSaveButtonClick = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardImage,
      cards,
      hasTrunfo,
      cardTrunfo,
    } = this.state;

    const card = {
      nome: cardName,
      description: cardDescription,
      image: cardImage,
      rare: cardRare,
      attr1: cardAttr1,
      attr2: cardAttr2,
      attr3: cardAttr3,
      cardTrunfo,
    };
    cards.push(card);
    this.setState({
      cards,
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardRare: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      hasTrunfo: hasTrunfo || cardTrunfo,
      cardTrunfo: false,
    });
  };

  deleteCard = (card) => {
    const { cards, hasTrunfo } = this.state;
    card.splice(card, 1);
    this.setState({
      cards,
      hasTrunfo: card.cardTrunfo ? false : hasTrunfo,
    });
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      cards,
      filterName,
      filterRare,
      filterCheckbox,
    } = this.state;

    const filteredCards = cards.filter((card) => card.rare === filterRare);

    if (filterRare !== 'todas') {
      filteredCards = filrerdCards.filter((card) => card.rare === filterRare);
    }

    if (filterCheckbox) {
      filteredCards = filteredCards.filter((card) => card.cardTrunfo);
    }
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <input
          disabled={ filterCheckbox }
          name="filterName"
          type="text"
          data-testid="name-filter"
          onChange={ this.onInputChange }
        />

      </div>
    );
  }
}

export default App;
