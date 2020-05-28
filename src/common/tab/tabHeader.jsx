import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { selectTab } from './tabActions'
import If from '../operador/if'

class TabHeader extends Component {
    render() {
        const { selectTab, target, icon, label, tab } = this.props
        const { selected, visible } = tab
        const isSelected = selected === target
        const isVisible = visible[target]
        return (
            <If test={isVisible}>
                <li className={isSelected ? 'active' : ''}>
                    <a href='javascript:;'
                        data-toggle='tab'
                        onClick={() => selectTab(target)}
                        data-target={target}>
                            <i className={`fa fa-${icon}`}></i>
                            {label}

                    </a>
                </li>
            </If>
        )
    }
}

const mapStateToProps = state => ({tab: state.tab})
const mapDispatchToProps = dispatch => bindActionCreators({selectTab}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TabHeader)