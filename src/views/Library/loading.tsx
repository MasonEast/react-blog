import React from 'react'
// import classNames from 'classnames'
import styled from './styled'
export interface SpinProps {
    prefixCls?: string;
    className?: string;
    spinning?: boolean;
    style?: React.CSSProperties;
    tip?: string;
    delay?: number;
    wrapperClassName?: string;
}

export interface SpinState {
    spinning?: boolean;
    notCssAnimationSupported?: boolean;
}

const Loading: React.FC<SpinProps> = (props: SpinProps) => {
    return (
        <Container spinning={props.spinning}>
            <Loader />
            {props.tip ? <span>{props.tip}</span> : null}
        </Container>
    )
}

export default Loading

const Container: any = styled('div')`
    display: ${(props: SpinProps) => props.spinning ? 'block' : 'none'};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(90deg);
    animation: container 1s infinite;
    width: 100px;
    height: 100px;
    color: #f2d4c5;
    // background-color: #ccc;
`

const Loader = styled('div')`
    position: absolute;
    top: calc(50% - 1.25em);
    left: calc(50% - 1.25em);
    width: 2.5em;
    height: 2.5em;
    transform: rotate(165deg);
    ::before, ::after{
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 0.5em;
        height: 0.5em;
        border-radius: 0.25em;
        transform: translate(-50%, -50%);
    };
    ::before{
        transform: rotate(180deg);
        background-color: green;
        animation: before 2s infinite;
    }
    ::after{
        background-color: red;
        animation: after 2s infinite;
    }
    @keyframes container
    {
        from {transform:rotate(0deg)}
        to {transform:rotate(360deg)}
    }
    @keyframes before
    {
        from {opacity: 0}
        to {opacity: 1}
    }
    @keyframes after
    {
        from {opacity: 0}
        to {opacity: 1}
    }
`
