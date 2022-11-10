import {Component, OnInit, ViewChild} from '@angular/core';
import {PluginService} from '../../../core/plugin.service';
import {PluginInstance, PluginInstanceWithState, PluginInstanceFullState, PluginInstanceState} from '../../../core/models/pluginInstances';
//import {MatSort, MatTableDataSource} from '@angular/material';

import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AvailablePlugin} from '../../../core/models/available-plugin';

@Component({
  selector: 'yd-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PluginsComponent implements OnInit {

  pluginInstances: MatTableDataSource<PluginInstanceWithState> = new MatTableDataSource<PluginInstanceWithState>();
  availablePlugins: AvailablePlugin[] = [];
  displayedColumns = ['State', 'DisplayName', 'Type'];
  expandedPluginInstance: PluginInstance = new PluginInstance;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  private pluginService: PluginService;
  startStopButtonEnabled: any = {};

  constructor(pluginService: PluginService) {
    this.pluginService = pluginService;
  }

  ngOnInit() {
    Promise.all([
      this.pluginService.getAllPluginsInstanceWithState(),
      this.pluginService.getAvailablePluginsInformation(undefined /*TODO*/) // TODO vraiment utile ?
    ])
      .then(value => {
        this.pluginInstances = new MatTableDataSource(value[0].instances);
        this.availablePlugins = value[1].plugins;

        this.startStopButtonEnabled = {};
        for (const pi of value[0].instances) {
          this.startStopButtonEnabled[pi.instance.Id] = true;
        }
        this.configureSort();
      });
  }

  private configureSort() {
    // Make sort insensitive to case
    this.pluginInstances.sortingDataAccessor = ((item: PluginInstanceWithState, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'displayName':
          return item.instance.DisplayName.toLocaleLowerCase();
        case 'type':
          return item.instance.Type.toLocaleLowerCase();
        default:
          return item.instance.Id.toString().toLocaleLowerCase();
      }
    });

    // Apply sort to data
    this.pluginInstances.sort = this.sort;

    this.pluginInstances.filterPredicate = (data: PluginInstanceWithState, filterValue: string) => {
      filterValue = filterValue.trim().toLocaleLowerCase();
      return data.instance.DisplayName.indexOf(filterValue) !== -1 ||
        data.instance.Type.indexOf(filterValue) !== -1;
    };
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    if(filterValue != null)
      this.pluginInstances.filter = filterValue;
    else
      this.pluginInstances.filter = "";
  }

  getStateIcon(piState: PluginInstanceState) {
    switch (piState) {
      case PluginInstanceState.Error:
        return 'warning';
      case PluginInstanceState.Stopped:
        return 'highlight_off';
      case PluginInstanceState.Running:
        return 'check_circle';
      case PluginInstanceState.Custom:
        return 'info_outline';
      case PluginInstanceState.WaitDebugger:
        return 'swap_horiz';
      default:
        return 'help_outline';
    }
  }

  getStateLabel(piState: PluginInstanceFullState) {
    try {
      switch (piState.state) {
        //TODO gérer i18n
        case PluginInstanceState.Error:
          return 'Erreur';
        case PluginInstanceState.Stopped:
          return 'Arrêté';
        case PluginInstanceState.Running:
          return 'Démarré';
        case PluginInstanceState.Custom:
          return piState.messageId;
        case PluginInstanceState.WaitDebugger:
          return 'En attente du debugger...';
        default:
          return 'Inconnu';
      }
    } catch (e) {
      console.error('Fail to display state label. piState = ' + piState);
      console.error(e);
      return 'Inconnu';
    }
  }

  isRunning(piState: PluginInstanceFullState) {
    switch (piState.state) {
      case PluginInstanceState.Error:
      case PluginInstanceState.Stopped:
        return false;
      default:
        return true;
    }
  }

  startStop(pi: PluginInstanceWithState) {
    this.startStopButtonEnabled[pi.instance.Id] = false;
    this.pluginService.startStop(pi.instance, !this.isRunning(pi.state))
      .then(() => {
        pi.state.state = this.isRunning(pi.state) ? PluginInstanceState.Stopped : PluginInstanceState.Running;//TODO c'est pas bon, pour test. En principe, il faut attendre la prochaine mise à jour 
        this.startStopButtonEnabled[pi.instance.Id] = true;
      })
      .catch(() => {
        console.error('Fail to start plugin instance');
        this.startStopButtonEnabled[pi.instance.Id] = true;
      });
  }

  isStartStopButtonEnabled(pi: PluginInstanceWithState) {
    try {
      return this.startStopButtonEnabled[pi.instance.Id];
    } catch (e) {
      return false;
    }
  }
}
