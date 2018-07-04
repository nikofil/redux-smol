export const createStore=red => ({
    subs: {}, sc: 0, red,
    getState() {
        return this.state
    },
    dispatch(msg) {
        this.state=this.red(this.state, msg)
        Object.values(this.subs).forEach(x => x())
    },
    subscribe(f) {
        this.subs[++this.sc]=f
        let sc = this.sc
        return () => {delete this.subs[sc]}
    },
}), combineReducers = reds => (st,msg) => Object.assign({},
    ...Object.keys(reds).map(
        k => ({
            [k]: reds[k]((st||{})[k], msg)
        })
    ))