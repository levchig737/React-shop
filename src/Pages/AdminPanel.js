import React, { Component } from 'react';
import { Admin, Resource, List, Datagrid, TextField } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('http://localhost:8000');

const ImageList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="product_id" />
        </Datagrid>
    </List>
);

export class AdminPanel extends Component {
  render() {
    return (
      <div>
        <Admin dataProvider={dataProvider}>
        <Resource name="images" list={ImageList} />
    </Admin>       
      </div>
    )
  }
}

export default AdminPanel