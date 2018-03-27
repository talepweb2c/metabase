/* @flow */

import React from "react";
import { jt } from "c-3po";
import StructuredQuery from "metabase-lib/lib/queries/StructuredQuery";

import type {
  ClickAction,
  ClickActionProps,
} from "metabase/meta/types/Visualization";

export default ({ question }: ClickActionProps): ClickAction[] => {
  const query = question.query();
  if (!(query instanceof StructuredQuery)) {
    return [];
  }

  const activeMetrics = query.table().metrics.filter(m => m.isActive());
  return activeMetrics.slice(0, 5).map(metric => {
    const metricName = <strong>{metric.name}</strong>;

    return ({
      name: "common-metric",
      title: <span>{jt`View ${ metricName }`}</span>,
      question: () => question.summarize(["METRIC", metric.id]),
    })
  });
};
