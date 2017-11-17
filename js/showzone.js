import React, {
	Component
} from 'react'
import LoginFloatWindow from './loginfloatwindow'

export default class ShowZone extends Component {
	constructor() {
		super()
		this.state = {
			show: "none"
		}
		this.markVin = ""
	}

	login(vin) {
		this.markVin = vin
		this.setState({
			show: "block"
		})
	}

	closeLogin() {
		this.setState({
			show: "none"
		})
	}

	render() {
		let _login = this.login.bind(this)
		let _show = this.state.show
		let _closeLogin = this.closeLogin.bind(this)
		let _markVin = this.markVin
		return (
			<div className="ShowZoneContainer">
				<div className="ShowZone">
					<ShowZoneHeader login={_login}/>
					<ShowZoneSearch login={_login}/>
				</div>
				<img className="ShowZoneBackgroudImg" src={cdnHost + '/img/bannerhomepage.png'} alt="banner" />
				<LoginFloatWindow show={_show}  closeLogin={_closeLogin} markVin={_markVin}/>
			</div>
		)
	}
}

class ShowZoneHeader extends Component {

    click(type) {
        this.props.login(type)
    }

    render() {
        let _click = this.click
        return (
            <div className="ShowZoneHeaderContainer">
                <div className="logoHeader">
                    <img className="ShowZoneHeaderLogo" src={cdnHost + '/img/p_logohomepages.png'} alt="零零汽" onClick={() => location.href="/"}/>
                    <div className="chooseHeader">
                        <div className="VINInquire" onClick={_click.bind(this, "车架号")}>VIN车架号查询</div>
                        <div className="CarInquire" onClick={_click.bind(this, "车型")}>车型查询</div>
                        <div className="PartInquire" onClick={_click.bind(this, "零件号")}>零件号查询</div>
                    </div>
                </div>
                <div className="ShowZoneHeaderButtonsContainers">
                    <div className="feedbackbutton" style={{display:"none"}}>反馈</div>
                    <div className="Register" onClick={() => location.href='/user/regiest'}>注册</div>
                    <div className="Login" onClick={_click.bind(this)}>登录</div>
                </div>
            </div>
        )
    }
}

class ShowZoneSearch extends Component {
    constructor() {
        super()
        this.state = {
            remind: "",
            length: 0,
            inputValue: ""
        }
    }

    componentDidMount() {
        $(this.refs.showzonesearchinput).focus()
    }

    change() {
        let reg = /^[A-Za-z0-9]*$/
        if(this.inputLock || !reg.test(this.refs.showzonesearchinput.value)) return

        this.refs.showzonesearchinput.value = this.refs.showzonesearchinput.value.toLocaleUpperCase()
        let _value = this.refs.showzonesearchinput.value.toLocaleUpperCase()
        let _length = _value.length
        let _search = this.search.bind(this)
        let _remind = this.state.remind
        if (_length == 1 || _length == 2 || _length == 3 || _length == 4 || _length == 9 || _length == 10 ) _search()
        else if(_length < 0) _remind = ""
        else if(_length > 17) {
//			_remind = "已满17位车架号"
            setTimeout(() => {
                this.refs.showzonesearchinput.value = _value.substr(0, 17)
            }, 20)
        }

        this.setState({
            remind: _remind,
            length: _length > 17 ? 17 : _length,
            inputValue: _value
        })
    }

    render() {
        let _remind = this.state.remind
        let _length = this.state.length
        let _change = this.change.bind(this)
        let _login = this.props.login
        let _inputValue = this.state.inputValue

        return (
            <div className="ShowZoneSearchContainer">
                <div className="ShowZoneSearchRemind">{_remind}</div>
                <input ref="showzonesearchinput" className="ShowZoneSearchInput" placeholder="输入17位VIN车架号" onChange={_change} value={_inputValue}
                       onCompositionStart={() => {
                           this.inputLock = true
                           setTimeout(() => this.inputLock = false, 50)
                       }}
                       onKeyPress={e => {
                           let _keyCode = e.which || e.keyCode
                           if (_keyCode == 13) _login(this.refs.showzonesearchinput.value)
                       }}/>
                <button className="ShowZoneSearchButton" onClick={() => {_login(this.refs.showzonesearchinput.value)}}>查询</button>
                <div className="ShowZoneSearchLength">{_length == 0 ? "" : _length}</div>
            </div>
        )
    }
}
