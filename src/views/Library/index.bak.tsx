import React from 'react'
import axios from 'axios'
import styled from './styled'
import Loading from './loading'
import initCanvas from './Canvas'

async function fetchApi() {
    const res = await axios('https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js')
    return res.data
}

interface data {
    name: string,
    age?: number
}
type dataArr = data[]

const Library = () => {
    const [data, setData] = React.useState<dataArr>([])
    const [value, setValue] = React.useState(function () {
        console.log(1111)
        return 2
    })

    React.useEffect(() => {
        axios('https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js').then(res => {
            setData(res.data.hero)
        })
    }, [])

    return (

        <div >
            <Loading spinning={true} tip={"拼命加载中..."} />
            {data && data.map(item => {
                return <PageContent style={{ color: '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6) }} key={item.name}>{item.name}</PageContent>
            })}
        </div>


    )
}

export default Library

const PageContent = styled('article')`
  max-width: 500;
  margin: 0 auto;
  line-height: 1.6;

  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 0.5rem;
    line-height: 1.25;
  }
`