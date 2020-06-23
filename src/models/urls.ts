import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  TabActionDialog,
  Sort
} from "../types";

const modelSectionUrl = "/models/";

export const modelListPath = modelSectionUrl;
export enum ModelListUrlFiltersEnum {
  status = "status",
  query = "query"
}
export type ModelListUrlFilters = Filters<ModelListUrlFiltersEnum>;
export type ModelListUrlDialog =
  | "publish"
  | "unpublish"
  | "remove"
  | TabActionDialog;
export enum ModelListUrlSortField {
  name = "name",
  available = "available",
  productCount = "products"
}
export type ModelListUrlSort = Sort<ModelListUrlSortField>;
export type ModelListUrlQueryParams = ActiveTab &
  BulkAction &
  ModelListUrlFilters &
  ModelListUrlSort &
  Dialog<ModelListUrlDialog> &
  Pagination;
export const modelListUrl = (params?: ModelListUrlQueryParams) =>
  modelSectionUrl + "?" + stringifyQs(params);

export const modelPath = (id: string) => urlJoin(modelSectionUrl, id);
export type ModelUrlDialog =
  | "remove"
  | "removeImage"
  | "assign"
  | "unassign";
export type ModelUrlQueryParams = BulkAction &
  Pagination &
  Dialog<ModelUrlDialog>;
export const modelUrl = (id: string, params?: ModelUrlQueryParams) =>
  modelPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const modelAddPath = urlJoin(modelSectionUrl, "add");
export const modelAddUrl = modelAddPath;
