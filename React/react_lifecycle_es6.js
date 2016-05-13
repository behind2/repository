/**
 * getInitialState
 */
class Counter extends Component {
  // 如果是使用 ES6 的语法，也可以在构造函数中初始化状态
  constructor(props) {
    super(props);
    this.state = { count: props.initialCount };
  }

  render() {
    // ...
  }
}

/**
 * getDefaultProps
 */
// 如果是使用 ES6 语法，可直接定义 defaultProps 这个类属性来替代
Counter.defaultProps = { initialCount: 0 };