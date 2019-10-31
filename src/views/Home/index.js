import React, { Component } from 'react';
import { connect } from 'react-redux'



class Home extends Component {
    render () {
        console.log(this.props)
        return (
            <div>
                <p>
                    Home页
        </p>
            </div>
        );
    }
}

// export default connect(
//     ({ home, app }) => ({ home, app })
// )(Home);
export default Home