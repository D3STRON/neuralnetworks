class Activation {
    constructor(act_func) {
        this.act_func = act_func
    }
    
    activate(neuron) {
        if(this.act_func == 'relU') {
            return neuron.relU()
        }
        else if (this.act_func == 'tanh') {
            return neuron.tanh()
        }
    }
}
