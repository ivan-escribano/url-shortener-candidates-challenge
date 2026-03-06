import { useSearchParams } from 'react-router';

import { Button } from '~/components/ui/button';
import { PageLink } from './sub-components/page-link/page-link.component';

import type { PaginationProps } from './pagination.interface';

export function Pagination({ total, page, totalPages, perPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  const [searchParams] = useSearchParams();

  const getPageUrl = (targetPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(targetPage));

    return `?${params.toString()}`;
  };

  return (
    <div className="border-border flex items-center justify-between border-t px-4 py-3">
      <p className="text-muted-foreground text-xs tracking-wide uppercase">
        Showing {perPage} of {total} links
      </p>

      <div className="flex items-center gap-1">
        <PageLink href={getPageUrl(page - 1)} disabled={page <= 1}>
          Previous
        </PageLink>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Button key={num} variant={num === page ? 'default' : 'ghost'} size="icon-xs" className="text-xs" asChild={num !== page}>
            {num === page ? <span>{num}</span> : <a href={getPageUrl(num)}>{num}</a>}
          </Button>
        ))}

        <PageLink href={getPageUrl(page + 1)} disabled={page >= totalPages}>
          Next
        </PageLink>
      </div>
    </div>
  );
}
