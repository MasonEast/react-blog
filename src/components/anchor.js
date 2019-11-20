import React, { } from 'react';
import { Anchor } from 'antd';

const { Link } = Anchor;

const BlogAnchor = (props) => {
    const data = props.data
    let anchorList = [], anchorArr = []
    data.replace(/<h([1-6])\s+id="(\S+)">(\S+?)</g, ($0, $1, $2, $3) => {
        anchorList.push({ title: $3, tag: $1, href: `#${$2}`, children: [] })
        return
    })
    function deepSearch (item, arr) {
        let len = arr.length
        if (len && item.tag > arr[len - 1].tag) {
            // console.log(item)
            // let childrenLen = arr[len - 1].children.length
            // if (childrenLen && item.tag > arr[len - 1].children[childrenLen - 1].tag) {
            //     console.log(arr)
            //     deepSearch(item, arr[len - 1].children)
            // }
            anchorArr[len - 1].children.push(item)
        } else {
            arr.push(item)
        }

    }

    anchorList.forEach((item, i) => {
        deepSearch(item, anchorArr)
    })

    return (
        <Anchor
            offsetTop={100}
        >
            {
                anchorArr.map((item, index) => {
                    return (
                        <Link key={item.href} href={item.href} title={item.title} >
                            {
                                item.children.length > 0 && item.children.map(v => {
                                    return (
                                        <Link key={v.href} href={v.href} title={v.title} />
                                    )
                                })
                            }
                        </Link>
                    )
                })
            }
        </Anchor>
    )
}

export default BlogAnchor