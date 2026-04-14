const statusEl = document.getElementById('status');
const urlEl = document.getElementById('url');

async function initPopup() {
  statusEl.textContent = '状態: 拡張機能が有効です';

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentUrl = tab?.url ?? '不明';
  urlEl.textContent = `現在URL: ${currentUrl}`;
}

initPopup().catch((error) => {
  statusEl.textContent = '状態: エラー';
  urlEl.textContent = `詳細: ${error.message}`;
});
