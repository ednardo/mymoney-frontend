import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { init } from './billingCycleActions'
import labelAndInput from '../common/form/labelAndInput'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {

    calculateSummary() {
        const sum = (t, v) => t + v
        const { credits, debts } = this.props
        if (!credits || !debts || credits.length === 0 || debts.length === 0)
            return {}
        return {
            sumOfCredits: credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebts: debts.map(d => +d.value || 0).reduce(sum)
        }
    }

    render() {
        const { handleSubmit, readOnly, credits, debts } = this.props
        const { sumOfCredits, sumOfDebts } = this.calculateSummary()
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' label='Nome' cols='12 4' readOnly={readOnly}
                        placeholder='Informe o nome' component={labelAndInput}/>
                    <Field name='month' label='Mês' cols='12 4' readOnly={readOnly} 
                        placeholder='Informe o mês' component={labelAndInput}/>
                    <Field name='year' label='Ano' cols='12 4' readOnly={readOnly} 
                        placeholder='Informe o ano' component={labelAndInput}/>
                    <Summary credit={sumOfCredits} debt={sumOfDebts} />
                    <ItemList cols='12 6' list={credits} readOnly={readOnly}
                        field='credits' legend='Créditos'/>
                    <ItemList cols='12 6' list={debts} readOnly={readOnly}
                        field='debts' legend='Débitos' showStatus={true}/>
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
const selector = formValueSelector('billingCycleForm')
const mapStateToProps = state => ({
    debts: selector(state, 'debts'),
    credits: selector(state, 'credits')
})
const mapDispatchtoProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchtoProps)(BillingCycleForm)