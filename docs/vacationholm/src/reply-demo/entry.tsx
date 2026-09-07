import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConversationView } from '@listings/components/conversation-view';

createRoot(document.getElementById('root')!).render(
  <ConversationView inquiryId="11111111-1111-4111-8111-111111111111" />
);
