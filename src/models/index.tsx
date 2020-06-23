import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { WindowTitle } from "../components/WindowTitle";
import {
  modelAddPath,
  modelListPath,
  ModelListUrlQueryParams,
  modelPath,
  ModelUrlQueryParams,
  ModelListUrlSortField
} from "./urls";
import CollectionCreate from "./views/CollectionCreate";
import CollectionDetailsView from "./views/CollectionDetails";
import ModelListView from "./views/ModelList";

const ModelList: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: ModelListUrlQueryParams = asSortParams(
    qs,
    ModelListUrlSortField
  );
  return <ModelListView params={params} />;
};

interface CollectionDetailsRouteProps {
  id: string;
}
const CollectionDetails: React.FC<RouteComponentProps<
  CollectionDetailsRouteProps
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: ModelUrlQueryParams = qs;
  return (
    <CollectionDetailsView
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

const Component = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.collections)} />
      <Switch>
        <Route exact path={modelListPath} component={ModelList} />
        <Route exact path={modelAddPath} component={CollectionCreate} />
        <Route path={modelPath(":id")} component={CollectionDetails} />
      </Switch>
    </>
  );
};
export default Component;
