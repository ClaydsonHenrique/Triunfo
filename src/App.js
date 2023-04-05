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
    } = this.state;
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
          cardName={ card.nome }
          cardDescription={ card.description }
          cardAttr1={ card.attr1 }
          cardAttr2={ card.attr2 }
          cardAttr3={ card.attr3 }
          cardImage={ card.image }
          cardRare={ card.rare }
          cardTrunfo={ card.cardTrunfo }
        />
      </div>
    );
  }
}

export default App;
