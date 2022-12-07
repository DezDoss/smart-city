import { Table, Input, Button} from 'antd';
import React,{ useEffect, useState }  from 'react';
import {getHistoryData} from '../util/APIUtils';
import { Select} from 'antd';
import { search } from '../util/APIUtils';


const { Option } = Select;
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
    title: 'Штрих Код',
    dataIndex: 'barCode',
    key: 'barCode'
  }
];




function HistoricalDataComponent() {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [key, setKey] = useState(null);
  const [hisData, setHisData] = useState([]);


 

  useEffect(() => {
    getData();
     }, []);
    

  const  getData = () => {
      getHistoryData()
    .then(data => {
      setHisData(data);
    });

  }

  const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
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
      setHisData(response);
    })
  }
  

  const showModal = () => {
    setModalVisible(true);
  }  

const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
};
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div style={{padding: 100}}>
        <div style={{margin: '10px 10px 10px 0', display: 'flex', justifyContent: 'center'}} >
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
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Table rowKey={record => record.id} rowSelection={rowSelection} columns={columns} pagination={false} dataSource={hisData}/>
        </div>
      </div>
    );
}

export default HistoricalDataComponent;