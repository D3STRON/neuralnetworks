class Value {
    constructor(data, _children = [], _op = '', _label= '') {
      this.data = data;           // The actual value
      this._children = new Set(_children); // Set of child nodes in the computational graph
      this._backward = () => {};  // Function to propagate gradients
      this._op = _op;             // Operation used to create this value (add, mul, tanh, etc.)
      this.grad = 0;              // Gradient initialized to 0
      this._label = _label
    }
  
    // Addition operation
    add(operand) {
      if( !(operand instanceof Value)) {
          operand = new Value(operand)
      }
      // Create the output Value from the addition of two inputs
      const out = new Value(this.data + operand.data, [this, operand], '+');
      
      // Define the backward function for this addition
      out._backward = () => {
        this.grad += out.grad;    // Gradient for addition is passed equally to both operands
        operand.grad += out.grad;
      };
      
      return out;  // Return the result Value
    }
  
    // Multiplication operation
    mul(operand) {
      if( !(operand instanceof Value)) {
          operand = new Value(operand)
      }
      // Create the output Value from the multiplication of two inputs
      const out = new Value(this.data * operand.data, [this, operand], '*');
      
      // Define the backward function for this multiplication
      out._backward = () => {
        this.grad += operand.data * out.grad; // Gradient for multiplication w.r.t this
        operand.grad += this.data * out.grad; // Gradient for multiplication w.r.t operand
      };
      
      return out;  // Return the result Value
    }
  
    // Tanh activation function
      tanh() {
          const tanhData = Math.tanh(this.data);  // Compute tanh of the current value
          const out = new Value(tanhData, [this], 'tanh');
  
          // Define the backward function for tanh
          out._backward = () => {
            const tanhGrad = 1 - tanhData ** 2;  // Derivative of tanh(x) is 1 - tanh(x)^2
            this.grad += tanhGrad * out.grad;    // Chain rule: multiply by the gradient of the output
          };
  
          return out;  // Return the result Value
      }
      
      exp() {
          // Compute exponentiation
          const exp = Math.exp(this.data)
          const out = new Value(exp, [this], 'exp');
  
          // Define the backward function for this exponentiation
          out._backward = () => {
            this.grad += exp * out.grad; // Gradient w.r.t base
          };
  
          return out;  // Return the result Value
        }
      
      pow(operand) {
          // Compute exponentiation
          const out = new Value(Math.pow(this.data, operand), [this], '^');
  
          // Define the backward function for this exponentiation
          out._backward = () => {
            this.grad += operand * Math.pow(this.data, operand -1)*out.grad; // Gradient w.r.t base
          };
  
          return out;  // Return the result Value
      }
      
      sub(operand) {
          if( !(operand instanceof Value)) {
              operand = new Value(operand)
          }
          return this.add(operand.mul(-1))
      }
      
      div(operand) {
          return this.mul(operand.pow(-1))
      }
      
      backward() {
        // Topologically sort the nodes in the computational graph
        const topo = [];
        const visited = new Set();
  
        // Helper function to perform depth-first search (DFS) to order nodes
        const buildTopo = (v) => {
          if (!visited.has(v)) {
            visited.add(v);
            for (let child of v._children) {
              buildTopo(child);
            }
            topo.push(v);
          }
        };
  
        // Build the topological order starting from this node
        buildTopo(this);
  
        // Initialize the gradient of the output node (this node) to 1
        this.grad = 1;
  
        // Backpropagate through all nodes in reverse topological order
        for (let node of topo.reverse()) {
          node._backward();
        }
      }
  }
      