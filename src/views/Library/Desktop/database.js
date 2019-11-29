export function reducer (state, action) {
    const { type, id, left, top } = action
    console.log(action)
    switch (type) {
        case 'move':
            return { ...state, [id]: { ...state[id], left, top } }
        case 'create':
            return { ...state, [id]: { id, left, top } }
        case 'delete':
            delete state[id]
            return { ...state }
        default:
            return state
    }
}

export const initalState = {
    'file0': {
        id: 'file0',
        left: 20,
        top: 20
    }
}