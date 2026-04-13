// 拡張機能の共通定数
export const EXTENSION_NAMESPACE = '__APP_EXAMPLE_EDGE_EXTENSION__';

// 対象アプリのURLパターン定義
export const ROUTE_KEYS = {
  DASHBOARD: 'dashboard',
  DETAIL: 'detail',
  EDIT: 'edit',
  UNKNOWN: 'unknown'
};

// ルーター再評価時に利用するイベント名
export const ROUTE_CHANGE_EVENT = 'app-example-extension:route-change';
