import React, { Component } from 'react';
import axios from 'axios';
import Items from '../components/Items';
import Pagination from '../components/Pagination';

export class Main extends Component {
  state = {
    skip: 0,
    limit: 3,
    totalItems: 0,
    currentPage: 1,
    countItemsOnPage: 3
  };

  componentDidMount() {
    // Вызовите эндпоинт при загрузке компонента
    axios.get('/product/count/1')
      .then(response => {
        // Предполагается, что ответ содержит общее количество элементов в свойстве data
        this.setTotalItems(response.data);
      })
      .catch(error => {
        console.error('Ошибка при запросе к эндпоинту /product/count/1:', error);
      });
  }

  handlePageChange = (pageNumber) => {
    const { limit, currentPage, countItemsOnPage } = this.state;
    let newSkip = (pageNumber - 1) * countItemsOnPage;
    let newLimit = limit;

    if (pageNumber < currentPage) {
      newLimit = limit - countItemsOnPage;
    }
    else if (pageNumber > currentPage){
      // newSkip--;
      newLimit = limit + countItemsOnPage;
    }

    this.setState({ 
        skip: newSkip, 
        currentPage: pageNumber,
        limit: newLimit
    });  
}

  setTotalItems = (total) => {
    this.setState({ totalItems: total });
  }

  render() {
    const { skip, limit, totalItems, currentPage } = this.state;
    const totalPages = Math.ceil(totalItems / limit)+1;
  
    return (
      <div>
        <div className='presentation'></div>
        <Items skip={skip} limit={limit} totalItems={totalItems} />
        {/* <div>
          <button onClick={() => this.handlePageChange(currentPage - 1)}>Предыдущая</button>
          <button onClick={() => this.handlePageChange(currentPage + 1)}>Следующая</button>
        </div> */}
         <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Main;
