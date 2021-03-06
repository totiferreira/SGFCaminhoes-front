import React, { Component } from 'react'
import LayoutWrapper from "../../components/utility/layoutWrapper.js";
import IntlMessages from "../../components/utility/intlMessages";
import PageHeader from "../../components/utility/pageHeader";
import  { Box } from "./index.style";
import { AutoComplete, Button, Form, Row, Col, Input, Select, notification, Steps } from 'antd'
import axios from '../../helpers/axios'
import moment from 'moment-timezone';

const Option = AutoComplete.Option;
const FormItem = Form.Item
const Step = Steps.Step;



class editTravel extends Component {
    
    state = {
        novo: [],
        current: 0,
        driver: [],
        vehicle: [],
        carts: [],
        itinerary: [],
        travelInfo: {
            driver_id: '',
            vehicle_id: '',
            carts_id: [],
            itinerary_id: '',
            departureDate: '',
            arrivalDate: '',
            description: '',
            status: '',
        },
        initialStatus: '',
        driversData: [],
        vehiclesData: [],
        cartsData: [],
        itinerariesData: [],
        confirmLoading: false
    }

    componentWillMount = () => {
        axios.get(`travels/${this.props.match.params.id}`)
        .then(response => {
          this.setState({
              
            carts: response.data.carts,
            initialStatus: response.data.status,
            travelInfo: {
                driver_id: response.data.driver.id,
                vehicle_id: response.data.vehicle.id,
                itinerary_id: response.data.itinerary.id,
                departureDate:  moment.tz(response.data.departureDate, 'America/Sao_Paulo').format('YYYY-MM-DD'),
                arrivalDate: moment.tz(response.data.arrivalDate, 'America/Sao_Paulo').format('YYYY-MM-DD'),
                status: response.data.status
            },
          })
        })
        .catch(error => {
          console.log(error)
        })
       this.getAllDrivers()
       this.getAllVehicles()
       this.getAllCarts()
       this.getAllItineraries()
       
    }
    next() {
        if(this.state.travelInfo.driver_id !== '') {
            const current = this.state.current + 1;
            this.setState({ current });
        }
        else{
            notification.warning({message: 'Campos inválidos', description: 'Preencha todos os campos obrigatórios (*)'})
        }
        this.teste()
      }
    
      prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    onChangeAddTravelInfo(key, value) {
        this.setState({
          travelInfo: {
            ...this.state.travelInfo,
            [key]: value
          }
          
        });
    }

    onChangeAddCarts(value) {
        this.setState({
            carts: value,
        })
        console.log(this.state.carts)
    }

    editTravel = () => {
        const { driver_id, vehicle_id, itinerary_id, carts_id, departureDate, arrivalDate, status } = this.state.travelInfo;
        if(this.state.initialStatus === 'in_progress'){
            if (driver_id !== '' && carts_id !== '' && vehicle_id !== '' && itinerary_id !== '' && departureDate !== '' && arrivalDate !== '' && status !== '') {
                    let newTravelInfo = {
                    ...this.state.travelInfo, carts_id: this.state.carts
                };
                console.log(newTravelInfo)
                axios.put(`travels/${this.props.match.params.id}`, newTravelInfo)
                    .then(response => {
                    this.setState({
                        confirmLoading: true
                    });
                    setTimeout(() => {
                        this.setState({
                        confirmLoading: false
                        });
                        this.handleIndex()
                    }, 2000);
                    
                    notification.success({message: 'Editado com sucesso !'})
                    
                    })
                    .catch(error => {
                    notification.error({message: 'Não foi possivel editar !'})
                    console.log(error);
                    });
                } else {
                notification.warning({message: 'Campos inválidos', description: 'Preencha todos os campos obrigatórios (*)'})
                }
            }
        else{
            notification.warning({message: 'Não é possivel editar uma viagem concluída ou cancelada !'})
        }
    }

    getAllDrivers() {
        axios.get('drivers?status=1')
        .then(response => {
          this.setState({
            driversData:  response.data
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
    getAllVehicles() {
        axios.get('vehicles?status=1')
        .then(response => {
            this.setState({
                vehiclesData: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    getAllCarts() {
        axios.get('carts?status=1')
        .then(response => {
            this.setState({
                cartsData: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    getAllItineraries() {
        axios.get('itineraries?status=1')
        .then(response => {
            this.setState({
                itinerariesData: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
       
    }
    teste = () => {
        const cartsIds = []
        
        if(this.state.carts.length !== 0){
            if(this.state.carts[0].id !== undefined) {
                for (let i = 0; i < this.state.carts.length; i++){
                cartsIds.push(this.state.carts[i].id) 
                }
                this.setState({
                    carts: cartsIds
                }) 
            }
        }
        
    }
        

    handleSearch = (value) => {
        fetch(value, data => this.setState({ data }));
    }
    handleIndex() {
        this.props.history.push("/dashboard/travels");
    }
   

    render() {

        const driversOptions = []
        const cartsOptions = []
        const vehicleOptions = []
        const itirariesOptions = []
        //const cartsIds = []
       
           
       
        for (let i = 0; i < this.state.driversData.length; i++) {
            driversOptions.push(<Option key={this.state.driversData[i].id} value={this.state.driversData[i].id}>
            { this.state.driversData[i].name+' '} 
            | CPF: {this.state.driversData[i].cpf_number}
            </Option>);
        }
 
        for (let i = 0; i < this.state.vehiclesData.length; i++) {
            vehicleOptions.push(<Option key={this.state.vehiclesData[i].id} value={this.state.vehiclesData[i].id}>
             {this.state.vehiclesData[i].brand+' '} 
            | Modelo: {this.state.vehiclesData[i].model+' '}
            | Placa: {this.state.vehiclesData[i].plate+' '}
            </Option>);
        }

        for (let i = 0; i < this.state.cartsData.length; i++) {
            cartsOptions.push(<Option key={this.state.cartsData[i].id} value={this.state.cartsData[i].id}>
             {this.state.cartsData[i].brand+' '} 
            | Modelo: {this.state.cartsData[i].model+' '}
            | Tipo: {this.state.cartsData[i].type+' '}
            | Placa: {this.state.cartsData[i].plate+' '}
            </Option>);
        }

        for (let i = 0; i < this.state.itinerariesData.length; i++) {
            itirariesOptions.push(<Option key={this.state.itinerariesData[i].id} value={this.state.itinerariesData[i].id}>
             {this.state.itinerariesData[i].route_name+' '} 
            |  {this.state.itinerariesData[i].initial_point+' '}
            |  {this.state.itinerariesData[i].end_point+' '}
            </Option>);
        }

     
        const { current } = this.state;
        const { getFieldDecorator } = this.props.form;
        const steps = [{
            title: 'Escolha o Motorista',
            content: 
           
                <Form>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={12}>
                    <FormItem label='Motorista' hasFeedback>
                        
                    {getFieldDecorator('driver', {
                            initialValue: this.state.travelInfo.driver_id,
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório'
                                }
                            ]
                        })(

                        <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder={'Escolha o motorista'}
                        onChange={e => this.onChangeAddTravelInfo('driver_id', e)}
                        >
                       
                       {driversOptions}
                        
                        </Select> 
                         )}   
                      
                      
                    </FormItem>
                    </Col>
                    </Row>
                </Form>
            
          }, {
            title: 'Escolha o Veículo',
            content:
            <Form>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={12}>
                    <FormItem label='Veículo' hasFeedback>
                        {getFieldDecorator('vehicle', {
                            initialValue: this.state.travelInfo.vehicle_id,
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório'
                                }
                            ]
                        })(

                        <Select
                        placeholder={'Escolha o veículo'}
                        showSearch
                        optionFilterProp="children"
                        onChange={e => this.onChangeAddTravelInfo('vehicle_id', e) }
                        >
                        {vehicleOptions}
                        </Select>    
                        )}
                    </FormItem>
                    </Col>
                    </Row>  
                </Form>      
          }, 
          {
            title: 'Escolha as Carretas',
            content: 
           
            <Form>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={12}>
                    <FormItem label='Carretas' hasFeedback>
                        {getFieldDecorator('carts', {
                            //initialValue:cartsIds
                            initialValue:this.state.carts
                           
                        })(
                        <Select
                        
                        showSearch
                        optionFilterProp="children"
                        placeholder={'Escolha a carreta'}
                        mode='multiple'
                        onChange={e => this.onChangeAddCarts(e) }
                        >
                        {cartsOptions}

                        </Select> 
                        )} 
                    
                      
                    </FormItem>
                    </Col>
                    </Row>
                </Form>

          
          },
          {
            title: 'Escolha o Itinerário',
            content: 
            
            <Form>
            <Row gutter={12}>
                <Col sm={24} xs={24} md={12}>
                <FormItem label='Itinerário' hasFeedback>
                    {getFieldDecorator('itinerary', {
                        initialValue: this.state.travelInfo.itinerary_id,
                        rules: [
                            {
                                required: true,
                                message: 'Campo obrigatório'
                            }
                        ]
                    })(

                    <Select
                    placeholder={'Escolha a rota'}
                    showSearch
                    optionFilterProp="children"
                    onChange={e => this.onChangeAddTravelInfo('itinerary_id', e)}
                    >
                   
                    {itirariesOptions}
                          
                    </Select> 
                        
                    )}
                </FormItem>
                </Col>
                </Row>
            </Form> 
       
          },
          {
            title: 'Informações complementares',
            content: 
            
            <Form>
            <Row gutter={12}>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data de partida' hasFeedback>
                                    {getFieldDecorator('departureDate', {
                                         initialValue: this.state.travelInfo.departureDate,
                                         rules: [
                                            {
                                                required: true,
                                                message: 'Campo obrigatório'
                                            }
                                        ]
                                    })(
                                    
                                        <Input 
                                        type='date'
                                        placeholder='Data de partida'
                                        name='departureDate'
                                        onChange={e => this.onChangeAddTravelInfo('departureDate', e.target.value)}
                                    />
                                        
                                    )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data de chegada' hasFeedback>
                                    {getFieldDecorator('arrivalDate', {
                                         initialValue: this.state.travelInfo.arrivalDate,
                                         rules: [
                                            {
                                                required: true,
                                                message: 'Campo obrigatório'
                                            }
                                        ]
                                    })(
                                    
                                        <Input 
                                        type='date'
                                        placeholder='Data de chegada'
                                        name='departureDate'
                                        onChange={e => this.onChangeAddTravelInfo('arrivalDate', e.target.value)}
                                    />
                                        
                                    )}
                            </FormItem>
                    </Col>
           
                <Col sm={24} xs={24} md={7}>
                <FormItem label='Status' hasFeedback>
                    {getFieldDecorator('status', {
                         initialValue: this.state.travelInfo.status,
                         
                        rules: [
                            {
                                required: true,
                                message: 'Campo obrigatório'
                            }
                        ]
                    })(
                   
                    <Select
                    placeholder={'Status'}
                    showSearch
                    optionFilterProp="children"
                    onChange={e => this.onChangeAddTravelInfo('status', e) }
                    >
                    <Option value='in_progress'>Em andamento </Option>
                    <Option value='finished'>Concluída </Option>
                    <Option value='canceled'>Cancelada </Option>
                    </Select> 
                        
                    )}
                </FormItem>
                </Col>
                </Row>
            </Form>  
       
          }
          
        ]
        return(
            <LayoutWrapper>
            <PageHeader>
              <IntlMessages id='header.edit_travel'/>
            </PageHeader>
            <Box>
            <div>
        <Steps current={current} >
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Próximo</Button>
          }
          {
            current === steps.length - 1
            &&  <Button key='submit' type='primary' loading={this.state.confirmLoading} 
                onClick={ this.editTravel }> Salvar
                </Button>
                /*
                 <Link to ="travels">
                <Button key='submit' type='default'> 
                    Cancelar
                
                 </Button>
                </Link>
                */
          }
         
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Voltar
            </Button>
            )
          }
        </div>
      </div>
                
                      
                    </Box>
            </LayoutWrapper>
        )
    }
};
const WrappedEditTravel = Form.create()(editTravel)
export default WrappedEditTravel
