import React, {useState, useEffect} from 'react';
import {Modal, Input, Typography, notification} from 'antd';
import { Select } from 'antd';
import { API_BASE_URL} from '../constants';
import axios from 'axios';


function EditPerson(props) {

  useEffect(() => {
    setRecord(props.record)
    setFirstName(props.record.firstName)
    setSecondName(props.record.secondName)
    setIin(props.record.iin)
    setPhoneNumber(props.record.phoneNumber)
    setCategoryId(props.record.cardId)
    setCategory(props.record.cardType)
    // setImage(props.record.image)
    setPrice(props.record.price)
}, [props])

  const data = props.record;
    const { Option } = Select;
    const { Title } = Typography;
    const [record, setRecord] = useState(data)
    const [category, setCategory] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [secondName, setSecondName] = useState(props.record.secondName)
    const [firstName, setFirstName] = useState(props.record.firstName)
    const [iin, setIin] = useState(props.iin)
    const [phoneNumber, setPhoneNumber] = useState(props.record.phoneNumber)
    const [price, setPrice] = useState(props.record.price)

    const handleOk = () => {
     axios.get(API_BASE_URL + "/person/editPerson?id=" + props.record.id + "&firstName=" + firstName + "&secondName=" + secondName 
     + "&iin=" + iin + "&phoneNumber=" + phoneNumber/* + "&category=" + category + "&categoryId=" + categoryId + "&price=" + price*/)
     .then(response => {
       console.log(response)
       notification.success({
         
         message: 'Smart Qala',
         description: response.data.message,
       });
       props.getData()
     })
     .catch( response => {
       notification.error({
         message: 'Smart Qala',
         description: response.data.message,
       })
       props.getData
     });

    }

    
    const handleSecondNameChange = e => {
      const {name, value} = e.target;
      setSecondName(value)
  }
  const handleFirstNameChange = e => {
    const {name, value} = e.target;
    setFirstName(value)
}
const handleIinChange = e => {
  const {name, value} = e.target;
  setIin(value)
}
const handlePhoneNumberChange = e => {
  const {name, value} = e.target;
  setPhoneNumber(value)
}

    const onCategoryChange = (value) => {
      let prices = 0;
      if(value.key >= 1 && value.key <5) {
        prices = 500;
      } else {
        prices = 0;
      }
      setCategory(value.label);
      setCategoryId(value.key)
      setPrice(prices)
    };

    // const fileSelectHandler = (event) => {
    //   setImage(event.target.files[0])
        
      // };


    return (
        <div>
        <Modal visible={props.isModalVisible} onCancel={props.handleCancel} 
        onOk={() => {props.handleOk(); handleOk() }}
        title="Изменить">
        <br />
        <br />    
        <Input 
        placeholder="Фамилия"
        name="secondName"
        value={secondName}
        onChange={(e) => handleSecondNameChange(e)}/>
        <br />
        <br />
        <Input 
        placeholder="Имя"
        name="firstName"
        value={firstName}
        onChange={handleFirstNameChange}/>
        <br />
        <br />
        <Input 
        placeholder="ИИН"
        name="iin"
        value={iin}
        min={12}
        max={12}
        onChange={handleIinChange}/>
        <br />
        <br />
        <Input 
        placeholder="Номер телефона"
        name="phoneNumber"
        type="number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}/>
        <br />
        <br />
{/*         
        <Select
        name="category"
    labelInValue
    defaultValue={{ label: 'Выбрать', value: 0 }}
    value={{label: category, value: categoryId}}
    style={{ width: 120 }}
    onChange={onCategoryChange}
  >
   <Option value='1'>Школьник</Option>
    <Option value='3'>Студент</Option>
    <Option value='2'>Многодетные</Option>
    <Option value='4'>Пенсионер</Option>
    <Option value='5'>Инвалид 1 гр</Option>
    <Option value='9'>Инвалид 2 гр</Option>
    <Option value='8'>Инвалид 3 гр</Option>
    <Option value='6'>Опекун</Option>
    <Option value='7'>Ветеран</Option>
  </Select>
  <Title level={4}>Цена: {price}</Title>} */}
        {/* <Typography level={3} >Загрузить фото</Typography> */}
        {/* <input type="file" name="image" onChange={(e) => fileSelectHandler(e)} /> */}
        </Modal>
        </div>
    );
  }

export default EditPerson;