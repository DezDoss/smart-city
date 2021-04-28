import { Table} from 'antd';
import React,{Component}  from 'react';
import {getHistoryData} from '../util/APIUtils';


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




class HistoricalDataComponent extends Component{
  state = {
    selectedRowKeys: [],
    loading: false,
    isModalVisible: false,
    hisData: [],
  };

  start = () => {
    this.sendToCreateFile();
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  componentDidMount() {
    this.getData();
    };

    getData() {
      getHistoryData()
    .then(data => {
      this.setState({
        hisData: data
              })
    });

  }



  onSelectChange = selectedRowKeys => {
    
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

showModal = () => {
  this.setState({
    isModalVisible: true
});
}

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div style={{padding: 100, display: 'flex', justifyContent: 'center'}}>
        
        <Table rowKey={record => record.id} rowSelection={rowSelection} columns={columns} dataSource={this.state.hisData} pagination={false}/>
      </div>
    );
  }
}

export default HistoricalDataComponent;