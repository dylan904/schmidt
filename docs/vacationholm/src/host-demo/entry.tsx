import React from 'react';
import { createRoot } from 'react-dom/client';
import HostDashboard from '@listings/app/host/dashboard/page';
import { Header } from '@listings/components/header';
import fixtures from './fixtures.json';

const clone = (value: unknown) => JSON.parse(JSON.stringify(value));
window.fetch = async (input, init = {}) => {
  const method = (init.method || 'GET').toUpperCase();
  if (method !== 'GET') return Response.json({ error: 'Portfolio demo is read only.' }, { status: 405 });
  const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url, window.location.origin);
  let body: unknown;
  if (url.pathname === '/api/host/listings') body = fixtures.listings;
  else if (url.pathname === '/api/host/work-queue') body = fixtures.work_queue;
  else if (url.pathname === '/api/host/insights') body = fixtures.insights;
  else if (url.pathname === '/api/host/action-center') body = fixtures.action_center;
  else if (url.pathname === '/api/messages/unread-count') body = { count: 2 };
  else if (url.pathname === '/api/pricing/nudges') body = { nudges: [] };
  else return Response.json({ error: 'Unavailable in the read-only portfolio demo.' }, { status: 404 });
  return Response.json(clone(body));
};

createRoot(document.getElementById('root')!).render(<><Header /><HostDashboard /></>);
