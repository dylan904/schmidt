import React from 'react';
import { createRoot } from 'react-dom/client';
import { QuestionInsights } from '@listings/components/question-insights';
import { FunnelInsights } from '@listings/components/funnel-insights';
import { ChangeInsights } from '@listings/components/change-insights';

const views = {
  questions: QuestionInsights,
  funnel: FunnelInsights,
  changes: ChangeInsights,
};
const name = new URLSearchParams(window.location.search).get('view') || 'questions';
const View = views[name as keyof typeof views] || QuestionInsights;

createRoot(document.getElementById('root')!).render(
  <View days={30} />
);
