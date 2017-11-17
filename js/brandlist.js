import React, {
	Component
} from 'react'

export default class BrandList extends Component {
	constructor() {
		super()
		this.widths = [0] //比实际多一个，预留位置
		this.brands = ["奥迪", "宝马", "保时捷", "奔驰", "宾利", "大众", "法拉利", "丰田", "捷豹", "雷克萨斯", "兰博基尼", "劳斯莱斯", "路虎", "迈巴赫", "玛莎拉蒂", "MINI", "smart", "沃尔沃"]
		for (let i = 0, j = this.brands.length; i < j; i++) {
			this.widths.push(98)
		}

		this.state = {
			brand: "汽车品牌",
			left: 0,
			showBubble: "none"
		}
		this.canLeftCount = this.brands.length - 10
		this.canRightCount = 0

	}
	imgMoveLeft() {
		if (this.canLeftCount != 0) {
			this.canLeftCount--
			this.canRightCount++
			$(this.refs.brandlist).animate({
				left: this.canRightCount * -98 + "px"
			}, 'fast')
		}
	}
	imgMoveRight() {
		if (this.canRightCount != 0) {
			this.canLeftCount++
				this.canRightCount--
				$(this.refs.brandlist).animate({
					left: this.canRightCount * -98 + "px"
				}, 'fast')

		}

	}
	mouseEvent(index, width, e) {
		let _brandListLeft = this.refs.brandlist.getBoundingClientRect().left
		let _areaLeft = this.getLeft(index)
		let _showBubble
			//		console.log(_brandListLeft + "  " + _areaLeft)
		let _left = _brandListLeft + _areaLeft + (width - 80) / 2
		let _brand = this.brands[index]
		if (e.type == "mouseover") _showBubble = "block"
		else _showBubble = "none"
		this.setState({
			brand: _brand,
			left: _left,
			showBubble: _showBubble
		})
	}

	getLeft(index) {
		let _left = 0
		let _widths = this.widths
		for (var i = index; i >= 0; i--) {
			let _width = _widths[i]
			_left += _width
		}
		return _left
	}

	render() {
		let _widths = this.widths
		let _mouseEvent = this.mouseEvent
		let _getLeft = this.getLeft.bind(this)
		let _areas = _widths.map((item, index) => {
			let _left = _getLeft(index)
			let _coords
			let _area
			let _width = _widths[index + 1]
			if (index < _widths.length - 2) {
				_coords = `${_left}, 0, ${_left + _width}, 58`
				_area = <area key={index} shape="rect" coords={_coords} onMouseOver={_mouseEvent.bind(this, index, _width)} onMouseLeave={_mouseEvent.bind(this, index, _width)} alt="Venus" />
			} else if (index == _widths.length - 2) {
				let _fullWidth = _getLeft(index + 1)
				_coords = `${_left}, 0, ${_fullWidth}, 58`
				_area = <area key={index} shape="rect" coords={_coords} onMouseOver={_mouseEvent.bind(this, index, _width)} onMouseLeave={_mouseEvent.bind(this, index, _width)} alt="Venus" />
			} else {
				_coords = "0, 0, 0, 0"
				_area = <area key={index} shape="rect" coords={_coords} alt="Venus" />
			}
			return _area
		})

		let _brand = this.state.brand
		let _left = this.state.left
		let _showBubble = this.state.showBubble
		return (
			<div className="MiddleContentMain">
				<div className="MiddleBanners">
					<img className="pcar" src={cdnHost + '/img/p_car.png'} alt=""/>
					<img className="pwen" src={cdnHost + '/img/p_wen.png'} alt=""/>
				</div>
				<div className="MiddleBannersMiddle">
					<div className="MiddleVinTitle">
						零零汽会员
					</div>
					<div className="msgBanner">
						<img className="yearcard" onClick={()=>{location.href="/user/regiest"}} src={cdnHost + '/img/icon_yearcard.png'} alt=""/>
						<img className="appcode" onClick={()=>{window.open("https://itunes.apple.com/cn/app/%E6%B1%BD%E9%85%8D%E5%A4%A7%E5%B8%88/id1210603873?mt=8")}} src={cdnHost + '/img/p_app.png'} alt=""/>
					</div>
				</div>
				<div className="MiddleBannersBottom">
					<ShowZoneNumber/>
				</div>
				<div className="MiddleBannersBottomNew">
					<div className="BrandListTitle">
						零零汽当前覆盖品牌
					</div>
					<div className="mainCenterContainer">
						<img ref="brandlist" className="BrandList" src={cdnHost + '/img/p_brandsss.png'} alt="零零汽覆盖品牌" useMap="#planetmap" />
						<map name="planetmap" id="planetmap">
		                        {_areas}
		                </map>
		                <img className="BrandListBefore" src={cdnHost + '/img/icon_shang.png'} onClick={this.imgMoveRight.bind(this)} alt="上一页" />
						<img className="BrandListLater" src={cdnHost + '/img/icon_xia.png'} onClick={this.imgMoveLeft.bind(this)} alt="下一页" />
					</div>
					<div className="BrandListBubbleContainer" style={{left: _left + "px", display: _showBubble}}>
						<div className="BrandListBubbleTitle">
							{_brand}
						</div>
						<img className="BrandListBubbleImg" src={cdnHost + '/img/icon_pinpai.png'} alt="汽车品牌" />
					</div>
				</div>
			</div>
		)
	}
}

class ShowZoneNumber extends Component {
    constructor() {
        super()
        this.car = 17879
        this.brand = 18
        this.part = 4766574

        this.carSub = parseInt(this.car / 10)
        this.brandSub = parseInt(this.brand / 10)
        this.partSub = parseInt(this.part / 10)

        this.state = {
            car: 0,
            brand: 0,
            part: 0
        }
        this.times = 1
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let _car = this.state.car
            let _brand = this.state.brand
            let _part = this.state.part
            if (this.times < 10) {
                _car += this.carSub
                _brand += this.brandSub
                _part += this.partSub
            } else {
                clearInterval(this.interval)
                _car = this.car
                _brand = this.brand
                _part = this.part
            }
            this.setState({
                car: _car,
                brand: _brand,
                part: _part
            })
            this.times++
        }, 100)
    }

    render() {
        let _car = this.state.car
        let _brand = this.state.brand
        let _part = this.state.part
        return (
            <div className="ShowZoneNumberContainer">
                <div className="ShowZoneNumber">
                    <div className="ShowZoneNumberCarContainer">
                        <div className="ShowZoneNumberCar">
                            {_car}
                        </div>
                        <div className="ShowZoneNumberCarTitle">
                            车型数据
                        </div>
                    </div>
                    <div className="ShowZoneNumberBrandContainer">
                        <div className="ShowZoneNumberBrand">
                            {_brand}
                        </div>
                        <div className="ShowZoneNumberBrandTitle">
                            支持品牌
                        </div>
                    </div>
                    <div className="ShowZoneNumberPartContainer">
                        <div className="ShowZoneNumberPart">
                            {_part}
                        </div>
                        <div className="ShowZoneNumberPartTitle">
                            零件数据
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
