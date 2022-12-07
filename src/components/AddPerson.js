import React, {useState} from 'react';
import {Modal, Input, Typography} from 'antd';
import { Form, Button, Icon, notification } from 'antd';
import Select from 'react-select';

function AddPerson(props) {
  const { Option } = Select;
  const { Title } = Typography;
  const FormItem = Form.Item;


  const options = [
    {value: '1', label:'Школьник'},
    {value: '3', label:'Студент'},
    {value: '2', label:'Многодетные'},
    {value: '4', label:'Пенсионер'},
    {value: '5', label:'Инвалид 1 гр'},
    {value: '9', label:'Инвалид 2 гр'},
    {value: '8', label:'Инвалид 3 гр'},
    {value: '6', label:'Опекун'},
    {value: '7', label:'Ветеран'}
  ]

  return (
      <div>
      <Modal visible={props.isModalVisible} onCancel={props.handleCancel} onOk={props.handleOk} title="Добавить">
      <br />
      <br />
      <h3>
        Фамилия
      </h3>   
      <Input 
      placeholder="Фамилия"
      name="secondName"
      value={props.state.secondName}
      onChange={e => props.onInputChange(e)}/>
      <br />
      <br />
      <h3>
        Имя
      </h3>
      <Input 
      placeholder="Имя"
      name="firstName"
      value={props.state.firstName}
      onChange={e => props.onInputChange(e)}/>
      <br />
      <br />
      <h3>
        ИИН
      </h3>
      <Input 
      placeholder="ИИН"
      name="iin"
      value={props.state.iin}
      min={12}
      max={12}
      onChange={e => props.onInputChange(e)}/>
      <br />
      <br />
      <h3>
        Номер Телефона
      </h3>
      <Input 
      placeholder="Номер телефона"
      type="number"
      name="phoneNumber"
      value={props.state.phoneNumber}
      onChange={props.onInputChange}/>
      <br />
      <br />
      <h3>
        Категория
      </h3>
<Select 
value={{value: props.categoryId, label: props.category}}
id='selectCategory'
options={options}
onChange={props.onCategoryChange}
/>
<Title level={4}>Цена: {props.state.price}</Title>
      <Typography level={3} >Загрузить фото</Typography>
      <input type="file" id = "fileControl" name="image" onChange={props.fileSelectHandler} />
      </Modal>
      </div>
  );
}

export default AddPerson;
