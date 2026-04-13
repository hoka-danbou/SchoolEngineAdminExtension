import { ROUTE_KEYS } from './common/constants.js';

/**
 * pathname から画面種別を判定する
 * - /dashboard -> dashboard
 * - /items/:id -> detail
 * - /items/:id/edit -> edit
 */
export function resolveRoute(pathname = window.location.pathname) {
  const normalized = normalizePath(pathname);

  if (normalized === '/dashboard') {
    return { route: ROUTE_KEYS.DASHBOARD, params: {} };
  }

  const editMatch = normalized.match(/^\/items\/([^/]+)\/edit$/);
  if (editMatch) {
    return {
      route: ROUTE_KEYS.EDIT,
      params: { id: decodeURIComponent(editMatch[1]) }
    };
  }

  const detailMatch = normalized.match(/^\/items\/([^/]+)$/);
  if (detailMatch) {
    return {
      route: ROUTE_KEYS.DETAIL,
      params: { id: decodeURIComponent(detailMatch[1]) }
    };
  }

  return { route: ROUTE_KEYS.UNKNOWN, params: {} };
}

function normalizePath(pathname) {
  if (!pathname) return '/';

  // 末尾スラッシュを揃える（ルートのみ例外）
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}
