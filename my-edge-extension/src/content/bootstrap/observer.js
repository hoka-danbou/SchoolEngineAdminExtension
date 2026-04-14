import { ROUTE_CHANGE_EVENT } from '../common/constants.js';

/**
 * SPA のURL変更を検知する監視を開始する
 * history API のパッチ + popstate/hashchange を監視
 */
export function startUrlObserver(onRouteChange) {
  if (typeof onRouteChange !== 'function') {
    throw new Error('startUrlObserver requires callback function');
  }

  let lastHref = window.location.href;

  const notify = () => {
    const nextHref = window.location.href;
    if (nextHref === lastHref) return;

    const prevHref = lastHref;
    lastHref = nextHref;

    onRouteChange({ prevHref, nextHref });
    window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, { detail: { prevHref, nextHref } }));
  };

  const wrapHistoryMethod = (methodName) => {
    const original = history[methodName];
    history[methodName] = function wrappedHistoryMethod(...args) {
      const result = original.apply(this, args);
      queueMicrotask(notify);
      return result;
    };
  };

  wrapHistoryMethod('pushState');
  wrapHistoryMethod('replaceState');

  window.addEventListener('popstate', notify);
  window.addEventListener('hashchange', notify);

  // 監視開始直後にも一度だけ同期実行し、現在URLを評価する
  onRouteChange({ prevHref: null, nextHref: lastHref });
}
