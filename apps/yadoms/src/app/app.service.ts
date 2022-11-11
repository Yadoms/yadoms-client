import { Injectable } from '@angular/core';

/**
 * Interface for internal state
 */
export interface InternalStateType {
  [key: string]: any;
}

/**
 * The appState service
 */
@Injectable()
export class AppState {
  /**
   * The current state
   */
  public _state: InternalStateType = {};

  /**
   * already return a clone of the current state
   */
  public get state() {
    return (this._state = this._clone(this._state));
  }
  /**
   * never allow mutation
   */
  public set state(value) {
    throw Error('do not mutate the `.state` directly');
  }

  /**
   * Get a property values, based on its name
   * @param prop The property name
   */
  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : null;
  }

  /**
   * Set a property value
   * @param prop The property name
   * @param value The value
   */
  public set(prop: string, value: any) {
    // internally mutate our state
    return (this._state[prop] = value);
  }
  /**
   * Clone an object
   * @param object an object
   */
  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}
