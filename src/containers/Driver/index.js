import React, { Component } from 'react';


import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import TableWrapper from "../Tables/antTables/antTable.style";
import CardWrapper, { Box } from "./index.style";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import Scrollbars from "../../components/utility/customScrollBar";
import { Button, Input, Icon, notification, Dropdown, Menu } from 'antd';
import axios from '../../helpers/axios'
import moment from 'moment'

import AddDriver from './addDriver'
import EditDriver from './editDriver'
import ViewDriver from './viewDriver'
import OpenFilters from './openFilters'

export default class index extends Component {

  state = {
    selected: [],
    visibleCalendar: false,
    visible: false,
    visibleEdit: false,
    visibleView: false,
    confirmLoading: false,
    list: [],
    info: {
      key: 0,
      driver: '',
    },
    initialState: {
        name: '',
        cpf_number: '',
        drivers_license: '',
        admission_date: '',
        resignation_date: null,
        driversLicense_validate: '',
        phone_1: '',
        phone_2: '',
        status: true
    },
    driversInfo: {
        uuid: '',
        name: '',
        cpf_number: '',
        drivers_license: '',
        admission_date: '',
        resignation_date: null,
        driversLicense_validate: '',
        phone_1: '',
        phone_2: '',
        status: true
    }
  }
  componentWillMount = () => {
    axios.get('drivers')
    .then(response => {
      this.setState({
        list: response.data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  addDriver = () => {
    const { name, cpf_number, drivers_license, driversLicense_validate, admission_date } = this.state.driversInfo;
    if (name !== '' && cpf_number !== '' && drivers_license !== '' && driversLicense_validate !== '' && admission_date !== '') {
      let newDriverInfo = {
        ...this.state.driversInfo
      };
      axios.post("drivers", newDriverInfo)
        .then(response => {
          this.setState({
            confirmLoading: true
          });
          setTimeout(() => {
            this.setState({
              confirmLoading: false
            });
            this.handleAddClose();
            this.componentWillMount()
          }, 2000);
          notification.success({message: 'Cadastrado com sucesso !'})
          
        })
        .catch(error => {
          notification.error({message: 'Não foi possivel cadastrar !'})
          console.log(error);
        });
    } else {
      notification.warning({message: 'Campos inválidos', description: 'Preencha todos os campos obrigatórios (*)'})
    }
  }
  editDriver = () => {
    const {name, cpf_number, drivers_license, driversLicense_validate, admission_date } = this.state.driversInfo
    if(name !== '' && cpf_number !== '' && drivers_license !== '' && driversLicense_validate !== '' && admission_date !== ''){
      let newDriverInfo = {
        ...this.state.driversInfo
      }
      axios.put(`drivers/${this.state.uuid}`, newDriverInfo)
      .then(response => {
        notification.success({message: 'Editado com sucesso'})
        this.handleEditClose()
        this.componentWillMount()
      })
      .catch(error => {
        console.log(error)
        notification.error({message:'Não foi possivel editar !'})
      })
    } else {
      notification.warning({message: "Preencha os campos obrigatórios !"})
    }
  }
  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0]})
  }

  handleReset = clearFilters => () => {
    clearFilters()
    this.setState({searchText: ''})
  }

  handleAddClose = () => {
    this.setState({
      visible: false,
      driversInfo: {...this.state.initialState} 
    });
  }
  handleEditClose = () => {
    this.setState({
      visibleEdit: false,
      driversInfo: {...this.state.initialState} 
    });
  }
  handleViewClose = () => {
    this.setState({
      visibleView: false,
      driversInfo: {...this.state.initialState} 
    });
  }
  showAddModal = () => {
    this.setState({
      visible: true
    })
  }
  showModalEdit = () => {
    this.setState({
      visibleEdit:true
    })
  }
  showModalView = () => {
    this.setState({
      visibleView:true
    })
  }
  onChangeAddDriverInfo(key, value) {
    this.setState({
      driversInfo: {
        ...this.state.driversInfo,
        [key]: value
      }
    });
  }
  onChangeAddDateInfo(key, value) {
    this.setState({
        info: {
        ...this.state.info,
        [key]: value
      }
    });

  }
  
  handleCalendarOpen = () => {
    this.setState({
      visibleCalendar: true,
      info: {
        key: 1,
        driver: '',
      }
    })
    
  }
  handleCalendarClose = () => {
    this.setState({
      visibleCalendar: false,
      info: {
        key: 0,
        driver: '',
      }
    })
    
  }

  columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: "30%",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className='custom-filter-dropdown' xs={5} sm={5}>
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Nome"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}         
          /> 
          <Button type='primary' onClick={this.handleSearch(selectedKeys, confirm )}>Buscar </Button>
          <Button onClick={this.handleReset(clearFilters )}>Limpar</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="filter" style={{fontSize:18, color: filtered ? 'red' : '#aaa' }} />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text) => {
        const { searchText } = this.state
        return searchText ? (
          <span>
          {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
            fragment.toLowerCase() === searchText.toLowerCase()
              ? <span key={i} style={{ color: 'red'}} className="highlight">{fragment}</span> : fragment // eslint-disable-line
          ))}
        </span>
        ) : text
      }
    },
    {
      title: 'CPF',
      dataIndex: 'cpf_number',
      key: 'cpf_number',
      width: '30%',
      render: text => <span>{text}</span>
    },
    {
      title: "Status",
      dataIndex: "status",
      key: 'status',
      width: "20%",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.status -b.status,
      render: (text, status) => {
        let userStatus;
        if (status.status !== 0 ) {
           userStatus =  <Icon type="check-circle"  style={{ fontSize: 20, color: '#52c41a'}}/>
        } else{
          userStatus = <Icon type="close-circle"  style={{ fontSize: 20, color: '#f5222d'}}/>
        }
        return userStatus
      }
    },
    {
      title: "Ações",
      dataIndex: "view",
      key: "view",
      width: "20%",
      render: (text, driversInfo) => (
        <div className="isoInvoiceBtnView">
          <Icon 
          type="search"  
          style={{ fontSize: 25, color: '#1890ff' }} 
          onClick={() => {
            this.showModalView()
            this.setState({ uuid: driversInfo.uuid, driversInfo:{
              name: driversInfo.name,
              cpf_number: driversInfo.cpf_number,
              drivers_license: driversInfo.drivers_license,
              admission_date:  moment(new Date(driversInfo.admission_date)).format('YYYY-MM-DD'),
              resignation_date:  moment(new Date(driversInfo.resignation_date)).format('YYYY-MM-DD'),
              driversLicense_validate:  moment(new Date(driversInfo.driversLicense_validate)).format('YYYY-MM-DD'),
              phone_1: driversInfo.phone_1,
              phone_2: driversInfo.phone_2,
              status: driversInfo.status,
              }
             
            })
          }}
          />
          <Icon 
          type="form"  
          style={{ fontSize: 25, color: '#faad14' , marginLeft: 20}}
          onClick={() => {
            this.showModalEdit()
            this.setState({ uuid: driversInfo.uuid, driversInfo:{
              name: driversInfo.name,
              cpf_number: driversInfo.cpf_number,
              drivers_license: driversInfo.drivers_license,
              admission_date:  moment(new Date(driversInfo.admission_date)).format('YYYY-MM-DD'),
              resignation_date:  moment(new Date(driversInfo.resignation_date)).format('YYYY-MM-DD'),
              driversLicense_validate:  moment(new Date(driversInfo.driversLicense_validate)).format('YYYY-MM-DD'),
              phone_1: driversInfo.phone_1,
              phone_2: driversInfo.phone_2,
              status: driversInfo.status,
              }
             
            })
          }}
          />
        </div>
      )
    }
  ]
  
  render() {
    const menu = (
      <Menu >
        <Menu.Item key="1" onClick={ this.handleCalendarOpen}>Status</Menu.Item>
       
      </Menu>
      
    
    )
    const { list } = this.state
    const rowSelection = {};
    return (
      <LayoutWrapper>
        <PageHeader>
          <IntlMessages id='header.drivers'/>
        </PageHeader>
        <Box>
        <div>
        <Dropdown overlay={menu}>
          <Button style={{ marginLeft: 8 }}>
            Relatórios <Icon type="down" />
          </Button>
        </Dropdown>
        </div>
          <div className='BtnAdd' align='right'>
            <Button
             onClick={this.showAddModal}
             style={{ top: -10 }}
             >
            <Icon type="plus-circle"  style={{ fontSize: 20, color: '#52c41a'}}/>
             Adicionar
            
             </Button>
          </div>
        <CardWrapper title='Veículos'>
          <div className='isoInvoiceTable'>
            <Scrollbars style={{ width: '100%'}}>
              <TableWrapper rowKey='id'
                rowSelection={rowSelection}
                dataSource={list}
                columns={this.columns}
                pagination={true}
                className='invoiceListTable'
                />
            </Scrollbars>
          </div>
        </CardWrapper>
        <AddDriver 
        openAddModal={this.state.visible}
        driversInfo={this.state.driversInfo}
        close={this.handleAddClose}
        addDriver={this.addDriver}
        onChangeAddDriverInfo={this.onChangeAddDriverInfo.bind(this)}
        confirmLoading={this.state.confirmLoading}
        />
        <EditDriver 
        driversInfo={this.state.driversInfo}
        open={this.state.visibleEdit}
        close={this.handleEditClose}
        editDriver={this.editDriver}
        onChangeAddDriverInfo={this.onChangeAddDriverInfo.bind(this)}
        confirmLoading={this.state.confirmLoading}
        />
        <ViewDriver
        uuid={this.state.uuid}
        driversInfo={this.state.driversInfo}
        open={this.state.visibleView}
        close={this.handleViewClose}
        confirmLoading={this.state.confirmLoading} 
        />
         <OpenFilters
        open={this.state.visibleCalendar}
        info={this.state.info}
        close={this.handleCalendarClose}
        confirmLoading={this.state.confirmLoading}
        onChangeAddDateInfo={this.onChangeAddDateInfo.bind(this)}
        />

        </Box>
      </LayoutWrapper>
    );
  }
}
