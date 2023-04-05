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
      isSaveButtonDisabled: true,
      cards: [],
      filterName: '',
      filterRare: 'todas',
      filterCheckbox: false,
    };
  }

  validateInputs = () => {
    const { cardName,
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
        && cardDescription.length > 0
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
    const { cardName,
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
      cardRare: 'normal',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      hasTrunfo: hasTrunfo || cardTrunfo,
      cardTrunfo: false,
    });
  };

  deleteCard = (card) => {
    const { cards, hasTrunfo } = this.state;
    cards.splice(card, 1);

    this.setState({
      cards,
      hasTrunfo: card.cardTrunfo ? false : hasTrunfo,
    });
  };

  render() {
    const { cardName,
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
      filterCheckbox } = this.state;

    let filteredCards = cards.filter((card) => card.nome.includes(filterName));

    if (filterRare !== 'todas') {
      filteredCards = filteredCards.filter((card) => card.rare === filterRare);
    }

    if (filterCheckbox) {
      filteredCards = filteredCards.filter((card) => card.cardTrunfo);
    }

    console.log(filteredCards, filterRare);
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
        <select
          disabled={ filterCheckbox }
          data-testid="rare-filter"
          onChange={ this.onInputChange }
          name="filterRare"
          defaultValue="todas"
        >
          <option value="todas">todas</option>
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito-raro</option>
        </select>

        <input
          name="filterCheckbox"
          type="checkbox"
          data-testid="trunfo-filter"
          onChange={ this.onInputChange }
        />

        {
          filteredCards.length > 0
            ? filteredCards.map((card, index) => (
              <div key={ index }>
                <Card
                  cardName={ card.nome }
                  cardDescription={ card.description }
                  cardAttr1={ card.attr1 }
                  cardAttr2={ card.attr2 }
                  cardAttr3={ card.attr3 }
                  cardImage={ card.image }
                  cardRare={ card.rare }
                  cardTrunfo={ card.cardTrunfo }
                />
                <button
                  data-testid="delete-button"
                  onClick={ () => this.deleteCard(card) }
                >
                  Excluir
                </button>
              </div>))
            : ''
        }

      </div>
    );
  }
}

export default App;
