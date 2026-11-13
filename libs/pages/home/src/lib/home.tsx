import { DragEvent, useCallback, useEffect, useState } from 'react';
import { Button, Group, Text, UnstyledButton } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconGripVertical,
  IconPencil,
  IconPlus,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { WidgetEntity, widgetsApi } from '@yadoms/domain/widgets';
import { widgetTypes } from './widgets/widget-types';
import AddWidgetModal from './add-widget-modal';
import classes from './home.module.css';

export interface PagesHomeProps {
  pageId?: number;
}

function moveWidget(
  widgets: WidgetEntity[],
  draggedId: number,
  targetId: number
): WidgetEntity[] {
  const dragged = widgets.find((widget) => widget.id === draggedId);
  const targetIndex = widgets.findIndex((widget) => widget.id === targetId);
  if (!dragged || targetIndex < 0) return widgets;

  const reordered = widgets.filter((widget) => widget.id !== draggedId);
  reordered.splice(targetIndex, 0, dragged);
  return reordered;
}

export function Home({ pageId = 0 }: PagesHomeProps) {
  const { t } = useTranslation();
  const [widgets, setWidgets] = useState<WidgetEntity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [addWidgetOpened, setAddWidgetOpened] = useState(false);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);

  const loadWidgets = useCallback(async () => {
    try {
      setWidgets(await widgetsApi.getPageWidgets(pageId));
    } catch (err) {
      console.error('Failed to load page widgets', err);
      notifications.show({ color: 'red', message: t('home.loadError') });
    }
  }, [pageId, t]);

  useEffect(() => {
    void loadWidgets();
  }, [loadWidgets]);

  const saveOrder = async (ordered: WidgetEntity[]) => {
    const changed = ordered
      .map((widget, position) => ({ ...widget, position }))
      .filter((widget, index) => ordered[index].position !== widget.position);
    setWidgets(ordered.map((widget, position) => ({ ...widget, position })));

    try {
      await Promise.all(
        changed.map((widget) =>
          widgetsApi.updateWidgetPosition(widget.id, widget.position)
        )
      );
    } catch (err) {
      console.error('Failed to save widgets order', err);
      notifications.show({ color: 'red', message: t('home.saveOrderError') });
      await loadWidgets();
    }
  };

  const createWidget = async (type: string) => {
    await widgetsApi.createWidget({
      page: pageId,
      type,
      position:
        widgets.reduce((max, widget) => Math.max(max, widget.position), -1) + 1,
      title: '',
      configuration: widgetTypes[type].defaultConfiguration,
    });
    await loadWidgets();
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>, id: number) => {
    // Events from widget modals bubble through React portals
    if (!event.currentTarget.contains(event.target as Node)) return;
    event.dataTransfer.effectAllowed = 'move';
    // Firefox does not start dragging without data
    event.dataTransfer.setData('text/plain', String(id));
    setDraggedId(id);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>, id: number) => {
    if (draggedId === null) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragOverId(id);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, targetId: number) => {
    if (draggedId === null) return;
    event.preventDefault();
    if (draggedId !== targetId) {
      void saveOrder(moveWidget(widgets, draggedId, targetId));
    }
    handleDragEnd();
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  return (
    <div>
      <Group justify="space-between">
        <h1>Welcome to PagesHome!</h1>
        <Button
          variant={editMode ? 'filled' : 'default'}
          leftSection={
            editMode ? <IconCheck size={16} /> : <IconPencil size={16} />
          }
          aria-pressed={editMode}
          onClick={() => setEditMode((value) => !value)}
        >
          {editMode ? t('home.editDone') : t('home.edit')}
        </Button>
      </Group>
      <div className={classNames(classes.grid, editMode && classes.editing)}>
        {widgets.map((widget) => {
          const widgetType = widgetTypes[widget.type];
          if (!widgetType) return null;
          const WidgetComponent = widgetType.component;
          return (
            <div
              key={widget.id}
              className={classNames(classes.item, {
                [classes.wideItem]: widgetType.size === 'wide',
                [classes.dragging]: draggedId === widget.id,
                [classes.dropTarget]:
                  dragOverId === widget.id && draggedId !== widget.id,
              })}
              draggable={editMode}
              onDragStart={(event) => handleDragStart(event, widget.id)}
              onDragOver={(event) => handleDragOver(event, widget.id)}
              onDrop={(event) => handleDrop(event, widget.id)}
              onDragEnd={handleDragEnd}
            >
              {editMode && (
                <IconGripVertical
                  className={classes.dragHandle}
                  size={16}
                  aria-label={t('home.dragToReorder')}
                />
              )}
              <WidgetComponent
                id={widget.id}
                size={widgetType.size}
                editMode={editMode}
              />
            </div>
          );
        })}
        {editMode && (
          <UnstyledButton
            className={classes.addWidget}
            onClick={() => setAddWidgetOpened(true)}
          >
            <Group gap="xs" justify="center">
              <IconPlus size={20} />
              <Text>{t('home.addWidget')}</Text>
            </Group>
          </UnstyledButton>
        )}
      </div>
      <AddWidgetModal
        opened={addWidgetOpened}
        onClose={() => setAddWidgetOpened(false)}
        onCreate={createWidget}
      />
    </div>
  );
}

export default Home;
