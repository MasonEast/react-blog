let a = {
    b: () => {
        console.log('bbb')
        return 2
    },
}

let bb = {}

for (let name of Object.keys(a)) {
    Object.defineProperty(bb, name, {
        configurable: false,
        enumerable: true,
        get: a[name]
    })
}

// console.log(bb.b)

class Mm {
    constructor(option) {
        this.option = option
    }
    as () {
        console.log(this.option)
    }
}

let ff = new Mm('ff')
console.log(ff)

ff.as()

function v () {
    console.log(this.option)
}

// v.callAsync(ff, ff)

console.log(process.cwd)