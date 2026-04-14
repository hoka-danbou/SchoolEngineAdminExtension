// 拡張機能の service worker 起動確認ログ
console.log('[EdgeExt] background service worker started');

chrome.runtime.onInstalled.addListener((details) => {
  console.log('[EdgeExt] extension installed/updated:', details.reason);
});
