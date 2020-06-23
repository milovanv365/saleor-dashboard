import {
  CollectionFilterInput,
  CollectionPublished
} from "@saleor/types/globalTypes";
import { IFilterElement } from "@saleor/components/Filter";
import { maybe, findValueInEnum } from "@saleor/misc";
import {
  CollectionListFilterOpts,
  CollectionFilterKeys
} from "@saleor/collections/components/CollectionListPage";
import {
  ModelListUrlFilters,
  ModelListUrlFiltersEnum,
  ModelListUrlQueryParams
} from "../../urls";
import {
  createFilterTabUtils,
  createFilterUtils,
  getSingleEnumValueQueryParam
} from "../../../utils/filters";

export const COLLECTION_FILTERS_KEY = "collectionFilters";

export function getFilterOpts(
  params: ModelListUrlFilters
): CollectionListFilterOpts {
  return {
    status: {
      active: maybe(() => params.status !== undefined, false),
      value: maybe(() => findValueInEnum(status, CollectionPublished))
    }
  };
}

export function getFilterVariables(
  params: ModelListUrlFilters
): CollectionFilterInput {
  return {
    published: params.status
      ? findValueInEnum(params.status, CollectionPublished)
      : undefined,
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<CollectionFilterKeys>
): ModelListUrlFilters {
  const { name } = filter;

  switch (name) {
    case CollectionFilterKeys.status:
      return getSingleEnumValueQueryParam(
        filter,
        ModelListUrlFiltersEnum.status,
        CollectionPublished
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<ModelListUrlFilters>(COLLECTION_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  ModelListUrlQueryParams,
  ModelListUrlFilters
>(ModelListUrlFiltersEnum);
