// セレクタにマッチする最初の要素を返す
export function qs(selector, root = document) {
  return root.querySelector(selector);
}

// セレクタにマッチする全要素を配列で返す
export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}
