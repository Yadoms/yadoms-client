import {
  RouteReuseStrategy,
  DetachedRouteHandle,
  ActivatedRouteSnapshot,
} from '@angular/router';
/**
 * Class which implements route reuse strategy.
 *
 * The aim is to control when a component shoudl be recreated or reused.
 */
export class CustomReuseStrategy implements RouteReuseStrategy {
  /**
   * Handlers
   */
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  /**
   * Calc a key for a route
   * @param route The route
   */
  public calcKey(route: ActivatedRouteSnapshot) {
    const url = route.pathFromRoot
      .map((x) => x.url.map((u) => u.path).join('/'))
      .join(';');
    if (!url.length) {
      return undefined;
    }
    return url;
  }

  /**
   * Determines if this route (and its subtree) should be detached to be reused later
   * @param route The route to check
   */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (route.url.length === 0) {
      return false;
    }
    if (!route.routeConfig) {
      return false;
    }
    if (route.routeConfig.loadChildren) {
      return false;
    }
    return true;
  }

  /**
   * Stores the detached route.
   *
   * Storing a `null` value should erase the previously stored value.
   */
  public store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle
  ): void {
    if (!route.routeConfig) {
      return;
    }
    if (route.routeConfig.loadChildren) {
      return;
    }
    const key = this.calcKey(route);
    if (key) {
      this.handlers[key] = handle;
    }
  }

  /**
   * Determines if this route (and its subtree) should be reattached
   */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (!route.routeConfig) {
      return false;
    }
    if (route.routeConfig.loadChildren) {
      return false;
    }

    if (route.data != null) {
      if (route.data.clear === true) {
        this.handlers = {};
      }
    }

    const url = route.pathFromRoot
      .map((x) => x.url.map((u) => u.path).join('/'))
      .join(';');

    const key = this.calcKey(route);
    if (key) {
      return !!this.handlers[key];
    }
    return false;
  }

  /**
   * Retrieves the previously stored route
   */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }
    if (route.routeConfig.loadChildren) {
      return null;
    }
    const key = this.calcKey(route);
    if (key) {
      return this.handlers[key] || null;
    }
    return null;
  }

  /**
   * Determines if a route should be reused
   */
  public shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
