import { Table, Button, Modal, notification } from 'antd';
import React,{Component, useState}  from 'react';
import {getDataInQueue, update} from '../util/APIUtils';
import { API_BASE_URL, ACCESS_TOKEN} from '../constants';
import axios from 'axios';

class AdminComponent extends Component{
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    isModalVisible: false,
    hisData: [],
  };

  start = () => {
    this.sendToCreateFile();
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: []
        // loading: false,
      });
    }, 1000);
  };

  componentDidMount() {
    this.getData();
    };

    getData() {
    getDataInQueue()
    .then(data => {
      this.setState({
        hisData: data
              })
    });

  }

   sendToEdit(record) {
    update(record.id)
    .then(response => {
      notification.success({
        description: "Smart Qala",
        message: response.message
      });
      this.getData();
    })
  }

  sendToCreateFile = async () => {
      axios(API_BASE_URL + '/person/generatePdf', {
        method: "POST",
        responseType: "blob"
        //Force to receive data in a Blob Format
      })
        .then(response => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], {
            type: "application/zip"
          });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          // window.open(fileURL);
          let a = document.createElement("a"); 
            a.href = fileURL;
            a.download = "result.zip";
            document.body.appendChild(a);
            a.click();
            this.getData();
            this.setState({
              loading: false
            });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            loading: false
          });
        });
  };
 
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

showModal = () => {
  this.setState({
    isModalVisible: true
});
}

  render() {
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
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status'
      }
      ,
          {
            title: 'Действие',
            key: 'action',
            render: (text, record) => (
              <div>
                <Button style={{backgroundColor:'green', color: 'white'}} 
                onClick={() => {this.sendToEdit(record)}}>Отправить в редактирование</Button>
              </div>
            ),
          },
    ];
    


    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = this.state.hisData.length >= 10;
    return (
      <div style={{padding: 100}}>
      <Button type="primary" style={{fontSize: '20px'}} onClick={this.start} disabled={!hasSelected} loading={loading}>
      Выгрузить
    </Button>
    {/* <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span> */}
      <div style={{padding: 10, display: 'flex', justifyContent: 'center'}}>
        <div style={{ marginBottom: 16 }}>
         
        </div>
        <Table /*rowKey={record => record.id} rowSelection={rowSelection}*/ bordered columns={columns} dataSource={this.state.hisData} 
        pagination={false}/>
      </div>
      </div>
    );
  }
}

export default AdminComponent;