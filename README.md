# react-tutorial-in-rails
* React.jsにRailsで触れてみる.

# React.js...?
* facebookが開発したUI用JavaScriptライブラリ
* Componetを作成するためのライブラリ
* MVCでいうViewを担当する.

# 作業の前に...
ATOMで快適に作業するために、２つのパッケージをインストール

* atom-beautify
* react

atom-beautifyはシンタックスハイライト用で  
reactは作業効率化のためのパッケージ。

reactの使い方はjsxファイルで、alt+ctl+b！！

# componentの作成
以下のコマンドで、作成ができる  
`rails generate react:component "Component名"`  
このコマンドを打ち込むことで  
`app/assets/javascripts/components/"Componet名".js.jsx`  
というファイルが作られる。  
このファイルが、Componetを表すクラスファイルである。

# Componentの利用法
viewファイルで  
`<%= react_component"Component名" %>`  
を使用することで呼び出しが可能。
