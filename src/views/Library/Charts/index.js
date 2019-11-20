import React from 'react';
import './index.less'
import Chart from '@/components/chartsTemplete'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const Charts = () => {

    // const [chartsArr, setChartsArr] = React.useState([])

    const [chartsArr, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case 'Line':
                console.log(action)
                const { id, left, top } = action
                return [...state, { id, left, top }]
            default:
                return state
        }
    }, []);

    const createChart = (e) => {
        e.persist()
        switch (e.target.innerHTML) {
            case "折线图":
                dispatch({ type: 'Line', id: `Line${chartsArr.length}`, left: 20, top: 20 })
                break
            case "柱状图":
                dispatch({ type: 'Bar', left: 20, top: 20 })
                break
            case "饼图":
                dispatch({ type: 'Pie', left: 20, top: 20 })
                break
            default:
                return
        }
    }
    const SortableItem = SortableElement(({ v }) =>
        <Chart
            type={v.id.replace(/[0-9]/g, '')}
            // key={v.id}
            left={v.left}
            top={v.top}
        />);

    const SortableList = SortableContainer((chartsArr) => {
        console.log(chartsArr)
        return (
            <ul>
                {chartsArr.items.map((value, index) => (
                    <SortableItem key={`item-${value.id}`} index={index} v={value} />
                ))}
            </ul>
        );
    });

    const onSortEnd = ({ oldIndex, newIndex, collection, isKeySorting }, e) => {
        console.log(oldIndex, newIndex, collection, isKeySorting, e)
        // this.setState(({ items }) => ({
        //     items: arrayMove(items, oldIndex, newIndex),
        // }));
    };


    // const moveBox = (id, left, top) => {
    //     dispatch({ type: id.replace(/[0-9]/g, ''), id, left, top })
    // }


    return (
        <div className="charts-box">
            <div className="charts-left">
                <ul onClick={createChart}>
                    <li>折线图</li>
                    <li>柱状图</li>
                    <li>饼图</li>
                    <li>中国地图</li>
                </ul>
            </div>
            <div className="charts-right">
                <SortableList items={chartsArr} onSortEnd={onSortEnd} />
            </div>
        </div>
    )
}

export default Charts



