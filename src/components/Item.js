import React, { Component } from 'react';
import axios from 'axios';

export class Item extends Component {
  state = {
    errorMessage: null,
  };

  handleBuy = () => {
    const { id } = this.props.item;
    const data = {
      count: 1
    };

    axios.put(`/product/buy/${id}`, data)
      .then(response => {
        // Обработка успешной покупки
        console.log('Покупка успешна:', response.data);
        this.props.updateAfterPurchase();
      })
      .catch(error => {
        // Обработка ошибок при покупке
        if (error.response && error.response.status === 401) {
          // Ошибка авторизации
          this.setState({ errorMessage: 'Вы не авторизованы. Пожалуйста, войдите в систему для совершения покупок.' });
        } else {
          console.error('Ошибка при покупке:', error);
        }
      });
  }

  render() {
    const { images, title, description, count, price } = this.props.item;
    const { errorMessage } = this.state;

    return (
      <div className='item'>
        <img src={"./img/"+ images[0]['name']} alt={title}/>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Осталось: {count} шт.</p>
        <b>{price} руб.</b>
        <button className='buy-item' onClick={this.handleBuy}>Купить</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    )
  }
}

export default Item;
