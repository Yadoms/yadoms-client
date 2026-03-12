import React from 'react';
import { IconSettings } from '@tabler/icons-react';

export interface WidgetProps {
  widgetId?: number;
  onSettingsClick?: () => void;
  children?: React.ReactNode;
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
export function Widget({ widgetId, children, onSettingsClick }: WidgetProps) {
  return (
    <div className="relative" style={{ position: 'relative' }}>
      <SettingsButton onClick={onSettingsClick} />
      {children}
    </div>
  );
}
