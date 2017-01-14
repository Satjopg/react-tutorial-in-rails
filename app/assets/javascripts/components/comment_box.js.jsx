// コメントボックスが親クラスで他は小クラス
// viewの中でヘルパーを使って変数を呼び出せば使用することができる。
var CommentBox = React.createClass({
  handleCommentSubmit: function(comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: this.state.data.concat([data])});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      success: function(result) {
        this.setState({data: result.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  // state:外部から渡された値をcomponent内部で管理するときに利用(このcomponentではdataのこと！)
  // prop:外部から渡された値(stateとは違いcomponent内部で変化させてはいけない。このcomponentではurlのこと！)
  // data属性のstateの初期値決め
  getInitialState: function() {
    return {data: []}
  },
  componentDidMount: function() {
    $.ajax({
      // urlは外部からなのでprops
      url: this.props.url,
      dataType: "json",
      success: function(result) {
        // stateの値を変える時はsetState!!(これによって再描画される)
        this.setState({data: result.data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
// レンダリング(ここでは生成とかそんな意味)してくれる関数を定義
    render: function() {
      // 呼び出し元に返すのは生成するもの
        return (
          // 小クラスのものをこのように呼び出すことが可能
            <div className="commentbox">
              <h1>Comments</h1>
              <CommentList data={this.state.data}/>
              <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        )
    }
});
// 子コンポーネントの利用
// 構造が、authorとchildrenである。
// この関数では、data属性のcommentを引数として受け取っている。
// その引数の値をそのまま、子に渡している
var CommentList = React.createClass({
    render: function() {
      var commentNodes = this.props.data.map(function (comment) {
        return (
          <Comment author={comment.author}>
            {comment.text}
          </Comment>
        );
      });
      return (
        <div className="commentlist">
          {commentNodes}
        </div>
      );
    }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  render:function() {
    return (
      <form className="commentform">
        <input type="text" placeholder="Your Name" />
        <input type="text" placeholder="Write Something" />
        <input type="submit" value="Post" />
      </form>
    )
  }
});
// {}の中身がcomponent間での値のやり取りを行う部分。
// 下記の{this.props.author}は親コンポーネントのauthorの値を受け取っている。
var Comment = React.createClass({
  render:function() {
    // コメントをマークダウンで書ける！！
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    )
  }
});
