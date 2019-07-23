import {connect} from 'react-redux'

import Counter from "../components/counter"
import {increment, decrement, incrementAsync} from '../redux/actions'
//
export default connect(
    state => ({count: state}),
    {increment, decrement, incrementAsync} // 编码是很简洁的, 但不太好理解
  )(Counter)