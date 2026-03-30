import { Container } from '@/components/layout/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Container>
      <div className="space-y-4 py-10">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-80 w-full" />
      </div>
    </Container>
  );
}