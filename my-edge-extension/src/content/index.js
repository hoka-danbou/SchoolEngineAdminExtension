// content script entry (classic script)
// Edge 環境差異で static import が失敗するケースに備え、dynamic import で本体を起動する
(async () => {
  try {
    const moduleUrl = chrome.runtime.getURL('src/content/main.js');
    const mainModule = await import(moduleUrl);

    if (typeof mainModule.bootstrap === 'function') {
      await mainModule.bootstrap();
      return;
    }

    console.error('[EdgeExt] bootstrap function is missing in main module');
  } catch (error) {
    console.error('[EdgeExt] failed to load content main module:', error);
  }
})();
