import React, { Component } from 'react';
import axios from 'axios';
import Item from './Item';

export class Items extends Component {
  state = {
    items: [],
    totalItems: 0 // Добавляем totalItems в состояние
  };

  fetchProducts = () => {
    const { skip, limit } = this.props;
    axios.get(`/product/?skip=${skip}&limit=${limit}`)
      .then(response => {
        // Предполагаем, что сервер возвращает массив с двумя элементами: [items, totalItems]
        const [items, totalItems] = response.data;
        this.setState({ items, totalItems });
        console.error('Список товаров:', items, limit, skip);

      })
      .catch(error => {
        console.error('Ошибка при получении списка товаров:', error);
      });
  }
  // Метод для обновления списка товаров после покупки
  updateAfterPurchase = () => {
    this.fetchProducts();
  }

  componentDidMount() {
    this.fetchProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.skip !== this.props.skip || prevProps.limit !== this.props.limit) {
      this.fetchProducts();
    }
  }

  render() {
    return (
      <main>
        {this.state.items.map(el => (
          <Item key={el.id} item={el} updateAfterPurchase={this.updateAfterPurchase}/>
        ))}
      </main>
    );
  }
}

export default Items;
