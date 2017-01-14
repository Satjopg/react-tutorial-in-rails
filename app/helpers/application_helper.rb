module ApplicationHelper
  # タブに表示されるタイトル名をページ遷移ごとに変えるメソッド
  # default値は空文字
  def full_title(page_title = "")
    base_title = "React Rails"
    if page_title.empty?
      base_title
    else
      page_title + "|" + base_title
    end
  end
end
