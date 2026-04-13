import { startUrlObserver } from './bootstrap/observer.js';
import { ROUTE_KEYS, EXTENSION_NAMESPACE } from './common/constants.js';
import { getFromStorage, setToStorage } from './common/storage.js';
import { resolveRoute } from './router.js';
import { initDashboardPage } from './pages/dashboard/index.js';
import { initDetailPage } from './pages/detail/index.js';
import { initEditPage } from './pages/edit/index.js';

// 重複初期化ガード
if (window[EXTENSION_NAMESPACE]?.initialized) {
  console.log('[EdgeExt] already initialized. skip bootstrap.');
} else {
  window[EXTENSION_NAMESPACE] = {
    initialized: true,
    lastRouteKey: null,
    lastPathname: null
  };

  bootstrap().catch((error) => {
    console.error('[EdgeExt] bootstrap failed:', error);
  });
}

async function bootstrap() {
  console.log('[EdgeExt] content script bootstrap start');

  const state = window[EXTENSION_NAMESPACE];

  // 参考: 保存済み値があれば読み込めることを示す（最小ラッパー使用例）
  const { enabled = true } = await getFromStorage({ enabled: true });
  if (!enabled) {
    console.log('[EdgeExt] extension disabled by storage flag');
    return;
  }

  startUrlObserver(async ({ prevHref, nextHref }) => {
    const { route, params } = resolveRoute(window.location.pathname);

    // 同一URLでの重複実行を避ける
    if (state.lastRouteKey === route && state.lastPathname === window.location.pathname) {
      return;
    }

    state.lastRouteKey = route;
    state.lastPathname = window.location.pathname;

    const context = {
      route,
      params,
      prevHref,
      nextHref,
      pathname: window.location.pathname
    };

    // 直近のルート情報を保存
    await setToStorage({
      lastRoute: route,
      lastPathname: window.location.pathname,
      lastVisitedAt: new Date().toISOString()
    });

    switch (route) {
      case ROUTE_KEYS.DASHBOARD:
        initDashboardPage(context);
        return;
      case ROUTE_KEYS.DETAIL:
        initDetailPage(context);
        return;
      case ROUTE_KEYS.EDIT:
        initEditPage(context);
        return;
      default:
        console.log('[EdgeExt] unknown route. no operation.', context);
    }
  });
}
