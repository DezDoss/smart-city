import { Table, Button, notification, Input} from 'antd';
import { Select} from 'antd';
import React,{useEffect, useState}  from 'react';
import {getPersonData, getDataInQueue, sendToProcess, search, deleteById} from '../util/APIUtils';
import AddPerson from './AddPerson';
import { API_BASE_URL} from '../constants';
import axios from 'axios';
import EditPerson from './EditPerson';
import $ from 'jquery';
const { Option } = Select;
const personData = {
  secondName: '',
firstName: '',
phoneNumber: '87',
iin: '',
image: null,
imageList: [],
category: '',
categoryId: null,
price: 0,
};

const recordData = {
  barCode: '',
cardId: 0,
cardType: '',
createdDate: '',
firstName: '',
id: 0,
iin: '',
image: null,
phoneNumber: '',
price: 0,
secondName: '',
status: ''
}

function TableComponent2(props) {

const data = [];

const [editRecord, setEditRecord] = useState(recordData);
const [isEditModalVisible, setEditModalVisible] = useState(false);
const [isModalVisible, setModalVisible] = useState(false);
const [loading, setLoading] = useState(false);
const [mainData, setMainData] = useState(data);
const [person, setPerson] = useState(personData);
const [selectedRowKeys, setSelectedRowKeys] = useState([]);
const [category, setCategory] = useState(personData.category);
const [categoryId, setCategoryId] = useState(0);
const [key, setKey] = useState(null);
const [value, setValue] = useState(null);


const getData = () => {
  getPersonData()
  .then(data => {
    setMainData(data);
  });
}

useEffect(() => {
 getData();
  }, []);


  const onInputChange = e => {
    setPerson({...person, [e.target.name] : e.target.value})
};

const sendToNormalize = () => {
  sendToProcess(selectedRowKeys)
    .then(response => {
      notification.success({
        message: 'Smart Qala',
          description: response.data,
      });
      getData();
    })
    .catch( response => {
      notification.success({
        message: 'Smart Qala',
        description: response.error,
      })
      getData();
    });
    
}

 const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

 const start = () => {
        if(!props.isAuthenticated) {
          notification.error({
            message: 'Smart Qala',
            description: 'Не авторизован'
          });
          return;
        }
        sendToNormalize();
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
          setSelectedRowKeys([]);
          setLoading(false);
        }, 1000);
      };

const showModal = () => {
  setModalVisible(true);
}      

const handleCancel = () => {
  setModalVisible(false);
}

const handleOk = (e) => {
setModalVisible(false);
const fm = new FormData();
    console.log(person.image);
    console.log(person.secondName);
    console.log(person.firstName);
    console.log(person.phoneNumber);
    console.log(person.iin);
    console.log(category);
    console.log(categoryId);
    console.log(person.price);
    fm.append("image", person.image);
    fm.append("secondName", person.secondName);
    fm.append("firstName", person.firstName);
    fm.append("phoneNumber", person.phoneNumber);
    fm.append("iin", person.iin);
    fm.append("category", category);
    fm.append("categoryId", categoryId);
    fm.append("price", person.price);
    
    console.log(fm)
    axios.post(API_BASE_URL + "/person/addPerson", fm)
      .then(response => {
        notification.success({
          message: 'Smart Qala',
          description: response.data,
        });
        getData();
      })
      .catch( response => {
        notification.error({
          message: 'Smart Qala',
          description: response.data,
        })
      });
clearState();
}

const clearState = () => {
  console.log(category);
  setPerson(personData);
  setCategory(personData.category);
  setCategoryId(0);
  console.log(category);
  // var dropDown = document.getElementById("selectCategory");
  // dropDown.selectedIndex = 0;
  $("#fileControl").val('');
}

const showEditModal = () => {
  setEditModalVisible(true)
 }
 
 
 const handleEditOk = () => {
  setEditModalVisible(false)
  getData();
 }
 
 const handleEditCancel = () => {
   setEditModalVisible(false)
 }


const fileSelectHandler = (event) => {
  setPerson({...person, [event.target.name]: event.target.files[0]})
    
  };

const onCategoryChange = (value) => {
  let prices = 0;
  if(value.value >= 1 && value.value <4) {
    prices = 500;
  } else {
    prices = 0;
  }
  console.log(value)
  // console.log(value.value, prices)
  setCategory(value.label);
  setCategoryId(value.value)
  setPerson({...person, price : prices});
};

const onKeyChange=(value) => {

  setKey(value.key)
};

const onValueChange = (e) => {
  setValue(e.target.value);
}

const onSearch = () => {
  search(key, value)
  .then(response => {
    setMainData(response);
  })
}

const deleteRecord = (record) => {
  deleteById(record.id)
  .then(response => {
    notification.success({
      message: 'Smart Qala',
        description: response.message
    });
    getData();
  })
  .catch(response => {
    notification.error({
      message: 'Smart Qala',
        description: response.message
    });
  });
}


    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Фамилия',
        dataIndex: 'secondName',
        key: 'secondName'
      },
      {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName',
      },
      {
        title: 'ИИН',
        dataIndex: 'iin',
        key: 'iin'
      },
      {
        title: 'Категория',
        dataIndex: 'cardType',
        key: 'cardType'
      },
      {
        title: 'Оплата',
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: 'Создано',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render: (date) => {
          // console.log(new Date(date).toLocaleString())
          return new Date(date).toLocaleString();
        }
      },
      {
        title: 'Действие',
        key: 'action',
        render: (text, record) => (
          <div>
            <Button style={{backgroundColor:'green', color: 'white'}} 
            onClick={() => {showEditModal(); setRecord(record)}}
            disabled={!props.isAuthenticated}>Изменить</Button>
            <br/>
            <br/>
            <Button style={{backgroundColor:'#FF6347', color: 'white'}} 
            onClick={() => {deleteRecord(record)}} 
            disabled={!props.isAuthenticated}>Удалить</Button>
          </div>
        ),
      },
    ];

const setRecord = (record) => {
  setEditRecord(record)
}
   

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
   
    return (
      <div style={{padding: 100}}>
         {/* <div style={{margin: '10px 10px 10px 0', display: 'flex', justifyContent: 'center'}} >
        <Select
        name="key"
    labelInValue
    defaultValue={{ label: 'Выбрать', value: 'iin' }}
    style={{ width: 120 , padding: '10'}}
    onChange={onKeyChange}
  >
    <Option value='iin'>ИИН</Option>
    <Option value='secondName'>Фамилия</Option>
    <Option value='firstName'>Имя</Option>
    <Option value='cardType'>Категория</Option>
  </Select>
        <Input placeholder="Поиск" style={{width: 180}} name="value" value={value} onChange={onValueChange}/>
        <Button type="primary" onClick={onSearch}  loading={loading}>
           Поиск
          </Button>
        </div> */}
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" style={{backgroundColor: 'green', color: 'white', fontSize: '20px'}} onClick={start} disabled={!hasSelected} loading={loading}>
            Отправить в цех
          </Button>
           <div style={{float: 'right'}}>
          <Button type="primary" style={{fontSize: '20px'}} onClick={showModal} disabled={!props.isAuthenticated} loading={loading}>
            Добавить
          </Button>
          </div>
          <AddPerson isModalVisible={isModalVisible} handleCancel={handleCancel} handleOk={handleOk}
          onInputChange={onInputChange} state={person} category={category} categoryId={categoryId} fileSelectHandler={fileSelectHandler} onCategoryChange={onCategoryChange}/>
          <EditPerson isModalVisible={isEditModalVisible} handleOk={handleEditOk} handleCancel={handleEditCancel} record={editRecord} getData={getData}/>
        <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span> 
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
        <Table 
        rowClassName="editable-row"
        rowKey={record => record.id} rowSelection={rowSelection}
        onChange={sendToNormalize} columns={columns} 
        dataSource={mainData} pagination={false}
        bordered/>
        </div>
      </div>
    );
  
}


export default TableComponent2;