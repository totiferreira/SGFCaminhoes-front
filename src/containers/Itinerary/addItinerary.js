import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon } from 'antd'
import Form from '../../components/uielements/form'
//import InputMask from 'react-input-mask'

import MapWithADirectionsRenderer from './map'
import Places from './places'
import PlacesTwo from './placesTwo'

const FormItem = Form.Item


class addItinerary extends Component {
    
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
            title='Adicionar Itinerário'
            visible={this.props.open}
            onOk={this.props.addItinerary}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={1000}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Cancelar </Button>,
                <Button key='submit' type='primary' loading={this.props.confirmLoading} 
                        onClick={this.props.addItinerary}> Salvar 
                 </Button>
            ]}
            >
            <Form>
                <Row gutter={12}> 
                    <Col sm={24} xs={24} md={6}>
                        <FormItem label="Origem" >
                        {getFieldDecorator('initial_point', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório'
                                }
                            ]
                        })(
                            <Places  
                            setMarkerA={this.props.setMarkerA}
                           />
                        )}
                        </FormItem>
                    </Col>
                
                    <Col sm={24} xs={24} md={6}>
                        <FormItem label="Destino">

                         {getFieldDecorator('end_point', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório'
                                }
                            ]
                        })(
                            <PlacesTwo style={{borderWidth: 50}}
                            setMarkerB={this.props.setMarkerB}
                            />
                        )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={3}>
                      <FormItem label='Distância' hasFeedback>
                       
                        {getFieldDecorator('distance', {
                            initialValue: this.props.distance.text,
                        })(
                            <Input
                              disabled
                              type='text'
                              placeholder='Distância'
                              name='distance'
                             // onChange={e => this.props.onChangeAddItinerariesInfo('route_name', e.target.value)} 
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                      <FormItem label='Tempo aprox.' hasFeedback>
                       
                        {getFieldDecorator('time', {
                            initialValue: this.props.time.text,
                        })(
                            <Input
                              disabled
                              type='text'
                              placeholder='Tempo Aprox.'
                              name='time'
                             // onChange={e => this.props.onChangeAddItinerariesInfo('route_name', e.target.value)} 
                            />
                        )}
                      </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={9}>
                      <FormItem label='Nome da rota' hasFeedback>
                        {getFieldDecorator('route_name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Campo obrigatório'
                                }
                            ]
                        })(
                            <Input
                              type='text'
                              placeholder='Nome'
                              name='route_name'
                              onChange={e => this.props.onChangeAddItinerariesInfo('route_name', e.target.value)} 
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={10}>
                      <FormItem label='Observações' hasFeedback>
                        {getFieldDecorator('observation', {
                        })(
                            <Input
                              type='text'
                              placeholder='Observações'
                              name='observation'
                              onChange={e => this.props.onChangeAddItinerariesInfo('observation', e.target.value)} 
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Ativo" hasFeedback>
                        <Switch
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren= {<Icon type="cross" />} defaultChecked
                        name='status'
                        onChange={e => this.props.onChangeAddItinerariesInfo('status', e)}
                        />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <MapWithADirectionsRenderer 
                itinerariesInfo={this.props.itinerariesInfo}
                currentLocation={this.props.currentLocation}
                setText={this.props.setText}
               
            />            
                            
            </Modal>
        )
    }
};

const WrappedAddItinerary = Form.create()(addItinerary)
export default WrappedAddItinerary
