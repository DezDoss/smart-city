import React from 'react';
import {Modal, Input, Typography} from 'antd';
import { Select } from 'antd';








function AddPerson(props) {
    const { Option } = Select;
    const { Title } = Typography;
    return (
        <div>
        <Modal visible={props.isModalVisible} onCancel={props.handleCancel} onOk={props.handleOk} title="Добавить">
        <br />
        <br />
        <h2>
          Фамилия
        </h2>   
        <Input 
        placeholder="Фамилия"
        name="secondName"
        value={props.state.secondName}
        onChange={e => props.onInputChange(e)}/>
        <br />
        <br />
        <h2>
          Имя
        </h2>
        <Input 
        placeholder="Имя"
        name="firstName"
        value={props.state.firstName}
        onChange={e => props.onInputChange(e)}/>
        <br />
        <br />
        <h2>
          ИИН
        </h2>
        <Input 
        placeholder="ИИН"
        name="iin"
        value={props.state.iin}
        min={12}
        max={12}
        onChange={e => props.onInputChange(e)}/>
        <br />
        <br />
        <h2>
          Номер Телефона
        </h2>
        <Input 
        placeholder="Номер телефона"
        type="number"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: "Please input the title of collection!"
          }
        ]}
        value={props.state.phoneNumber}
        onChange={props.onInputChange}/>
        <br />
        <br />
        <h2>
          Категория
        </h2>
        <Select
        name="category"
    labelInValue
    defaultValue={{ label: 'Выбрать', value: 0 }}
    style={{ width: 200 }}
    onChange={e => props.onCategoryChange(e)}
  >
    <Option value='1'>Школьник</Option>
    <Option value='3'>Студент</Option>
    <Option value='2'>Многодетные</Option>
    <Option value='5'>Пенсионер</Option>
    <Option value='4'>Инвалид</Option>
  </Select>
  <Title level={4}>Цена: {props.state.price}</Title>
        <Typography level={3} >Загрузить фото</Typography>
        <input type="file" name="image" onChange={props.fileSelectHandler} />
        </Modal>
        </div>
    );
  }

export default AddPerson;