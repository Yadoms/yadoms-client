import React from 'react';
import { IconSettings } from '@tabler/icons-react';
import classes from '../home.module.css';
import classNames from "classnames";

export interface WidgetProps {
  widgetId?: number;
  onSettingsClick?: () => void;
  children?: React.ReactNode;
  size?: 'small' | 'wide';
}

type SettingsButtonProps = {
  onClick?: () => void;
  title?: string; //TODO utile ? A traduire si oui.
  size?: number;
  className?: string;
};

/**
 * Reusable Settings Button component using Tabler icon
 */
export function SettingsButton({
  onClick,
  title = 'Paramètres',
  size = 20,
  className = '',
}: SettingsButtonProps) {
  return (
    <button
      aria-label={title}
      title={title}
      onClick={onClick}
      style={{ position: 'absolute', top: 8, right: 8, zIndex: 9999, background: 'transparent', border: 'none' }}
    >
      <IconSettings size={size} stroke={2} />
    </button>
  );
}

/**
 * Widget wrapper: provides a `relative` container so the SettingsButton
 * can be positioned top-right without affecting document flow.
 */
export function Widget({ widgetId, children, onSettingsClick, size = 'small' }: WidgetProps) {
  const sizeClass =
    size === 'wide'
      ? classes.wide
      : classes.small;

  return (
    <div className={classNames(classes.card, sizeClass)}>
      <div className="relative" style={{ position: 'relative' }}>
        <SettingsButton onClick={onSettingsClick} />
      </div>
      {children}
    </div>
  );
}
