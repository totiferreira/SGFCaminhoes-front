import React, { Component } from 'react'
import { Button, Modal, Row, Col, Input, Switch, Icon, Tooltip } from 'antd'
import Form from '../../components/uielements/form'

import moment from 'moment';
//import 'moment/locale/pt_BR';
import { DatePicker } from 'antd';

//moment.locale('pt_BR')
const { RangePicker } = DatePicker;

const FormItem = Form.Item

class editDriver extends Component {
    
    render() {
        
        const { getFieldDecorator } = this.props.form;
        //const d = new Date(this.props.driversInfo.admission_date);
        //const y = d.toLocaleDateString()
        const t = moment(new Date(this.props.driversInfo.admission_date)).format('YYYY-MM-DD')
        return (
            <Modal
            title='Editar Motorista'
            visible={this.props.open}
            onOk={this.props.editDriver}
            confirmLoading={this.props.confirmLoading}
            onClose={this.props.close}
            onCancel={this.props.close}
            destroyOnClose={true}
            width={700}
            centered
            footer={ [
                <Button key='back' onClick={this.props.close}> Cancelar </Button>,
                <Button key='submit' type='primary' loading={this.props.confirmLoading} 
                        onClick={this.props.editDriver}> Editar 
                 </Button>
            ]}
            >
            <Form>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={12}>
                      <FormItem label='Nome' hasFeedback>
                        {getFieldDecorator('name', {
                            initialValue: this.props.driversInfo.name,
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
                              name='name'
                              onChange={e => this.props.onChangeAddDriverInfo('name', e.target.value)} 
                            />
                        )}
                      </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                        <FormItem label='CPF' hasFeedback>
                            {getFieldDecorator('cpf_number', {
                                initialValue: this.props.driversInfo.cpf_number,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Campo obrigatório',
                                       
                                    }
                                ]
                            })(
                                <Input 
                                    type='text'
                                    maxLength={11}
                                    placeholder='CPF'
                                    name='cpf_number'
                                    onChange={e => this.props.onChangeAddDriverInfo('cpf_number', e.target.value)}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={3}>
                        <FormItem label={( <span>
                            CNH&nbsp;
                            <Tooltip title="Exemplos: ABCD">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span> )} hasFeedback>
                            {getFieldDecorator('drivers_license', {
                                initialValue: this.props.driversInfo.drivers_license,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Campo obrigatório'
                                    }
                                ]
                              
                            })(
                             
                                <Input 
                                    type='text'
                                    placeholder='CNH'
                                    name='drivers_license'
                                    onChange={e => this.props.onChangeAddDriverInfo('drivers_license', e.target.value)}
                                />
                                
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={6}>
                            <FormItem label='Telefone' hasFeedback>
                                {getFieldDecorator('phone_1', {
                                    initialValue: this.props.driversInfo.phone_1,
                                    rules: [
                                        /*{
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }*/
                                    ]
                                })(
                                    <Input 
                                        type='text'
                                        placeholder='Telefone'
                                        name='phone_1'
                                        onChange={e => this.props.onChangeAddDriverInfo('phone_1', e.target.value)}
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={6}>
                            <FormItem label='Telefone Opcional' hasFeedback>
                                {getFieldDecorator('phone_2', {
                                    initialValue: this.props.driversInfo.phone_2,
                                    rules: [
                                        /*{
                                            required: true,
                                            message: 'Campo obrigatório'
                                        }*/
                                    ]
                                })(
                                    <Input 
                                        type='text'
                                        placeholder='Telefone Opcional'
                                        name='phone_2'
                                        onChange={e => this.props.onChangeAddDriverInfo('phone_2', e.target.value)}
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={4}>
                        <FormItem label='Salário' hasFeedback>
                                {getFieldDecorator('salary', {
                                    initialValue: this.props.driversInfo.salary,
                                    rules: [
                                       
                                    ]
                                })(
                                    <Input 
                                        type='number'
                                        placeholder='Salário'
                                        name='salary'
                                        onChange={e => this.props.onChangeAddDriverInfo('salary', e.target.value)}
                                    />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data de admissão' hasFeedback>
                                    {getFieldDecorator('admission_date', {
                                        initialValue: moment(new Date(this.props.driversInfo.admission_date)).format('YYYY-MM-DD')
                                    })(
                                       
                                        <Input 
                                        type='date'
                                        placeholder='Data de admissão'
                                        name='admission_date'
                                        onChange={e => this.props.onChangeAddDriverInfo('admission_date', e.target.value)}
                                        onClick={console.log(t)}
                                       
                                    />
                                          
                                    )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={7}>
                            <FormItem label='Data de demissão' hasFeedback>
                                    {getFieldDecorator('resignation_date', {
                                        initialValue: moment(new Date(this.props.driversInfo.resignation_date)).format('YYYY-MM-DD'),
                                        rules: [
                                            /*{
                                                required: true,
                                                message: 'Campo obrigatório'
                                            }*/
                                        ]
                                    })(
                                        <Input 
                                            type='date'
                                            placeholder='Data de demissão'
                                            name='resignation_date'
                                            onChange={e => this.props.onChangeAddDriverInfo('resignation_date', e.target.value)}
                                        />
                                    )}
                            </FormItem>
                    </Col>
                    <Col sm={24} xs={24} md={5}>
                        <FormItem label="Status" hasFeedback>
                        
                        <Switch
                        
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren= {<Icon type="cross" />} defaultChecked
                        name='status'
                        onChange={e => this.props.onChangeAddDriverInfo('status', e)}
                        />
                        </FormItem>
                    </Col>
                </Row>
            </Form>

            </Modal>
        )
    }
};

const WrappedEditDriver = Form.create()(editDriver)
export default WrappedEditDriver