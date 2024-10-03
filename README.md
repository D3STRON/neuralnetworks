# Neural Network Library in JavaScript

### Overview
Developed a neural network library from the ground up in JavaScript, implementing core machine learning concepts like feedforward and backpropagation. The library supports customizable architectures and offers two versions: one with manual gradient calculation and another with automatic differentiation, providing flexibility and efficiency for diverse machine learning tasks. Both versions leverage stochastic gradient descent (SGD) to optimize the model's parameters, enabling efficient training.

### Features
- **Customizable Neural Networks**:
  - Flexible design allows for defining the number of layers and neurons per layer.
  - Support for various activation functions.
- **Training Algorithms**:
  - Efficient training using stochastic gradient descent (SGD).
- **Manual Gradient Calculation Version**:
  - Provided in the MatrixBasedNetwork Folder
  - Implements matrix-based manual gradient calculation at each layer after the forward pass for backpropagation.
- **PyTorch-like Automatic Differentiation Version**:
  - Provided in the AutoGradient folder
  - Automatically builds computation graphs and propagates gradients backward using a `backward()` function, mimicking PyTorch’s behavior.
- **Architecture Experimentation**:
  - Easily experiment with different neural network architectures.
- **Dataset Flexibility**:
  - Supports training models on diverse datasets and use cases.
- **Insight into Neural Network Internals**:
  - Offers detailed insights into the internal workings of neural networks, useful for learning and debugging.

### Use Cases
This library is ideal for:
- **Learning and Understanding Neural Networks**:
  - Perfect for those who want to dive deep into the mechanics of neural networks, especially in a JavaScript environment.
- **Experimentation**:
  - Allows building, training, and experimenting with different neural network architectures.
- **Real-World Machine Learning**:
  - Suitable for practical machine learning implementations and research projects.

### Versions
1. **Matrix-Based Version**:
   - Manually computes gradients at each layer after the forward pass and propagates them backward for learning.
   
2. **Automatic Differentiation Version**:
   - Builds computation graphs dynamically during the forward pass, and gradients are automatically calculated and propagated using the `backward()` function, similar to PyTorch.

### Getting Started
Clone the repository and start experimenting with your custom neural network!

```bash
git clone <repository-url>
cd <repository-folder>


