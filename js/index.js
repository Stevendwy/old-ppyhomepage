import React, {
    Component
} from 'react'
import {
    render
} from 'react-dom'
import ShowZone from './showzone'
import BrandList from './brandlist'
import Bottom from './bottom'
class Page extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="PageContainer">
				<ShowZone />
				<BrandList />
				<Bottom />

			</div>
        )
    }
}

render(<Page />, document.getElementById("root"))