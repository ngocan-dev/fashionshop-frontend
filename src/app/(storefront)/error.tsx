'use client';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <Container className="py-20"><h2 className="text-2xl font-medium">Something went wrong</h2><p className="mt-2 text-zinc-600">Please retry the request.</p><div className="mt-6"><Button type="button" onClick={() => reset()}>Try again</Button></div></Container>;
}
