import styles from './domain-widgets.module.css';

/* eslint-disable-next-line */
export interface DomainWidgetsProps {}

export function DomainWidgets(props: DomainWidgetsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DomainWidgets!</h1>
    </div>
  );
}

export default DomainWidgets;
