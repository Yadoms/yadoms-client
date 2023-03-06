import { PluginsInstancesEntity } from '../redux/plugins-instances.slice';

export interface Paging {
  currentPage: number;
  totalPage: number;
  pageSize: number;
}
export interface PluginsInstancesResponse {
  instances: PluginsInstancesEntity[];
  paging: Paging;
}
