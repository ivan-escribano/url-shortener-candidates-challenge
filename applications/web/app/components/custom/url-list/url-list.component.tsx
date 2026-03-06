import { Table, TableBody, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Pagination } from '../pagination/pagination.component';
import { UrlRow } from './sub-components/url-row/url-row.component';

import { COLUMNS } from './url-list.config';
import type { UrlListProps } from './url-list.interface';

export function UrlList({ urls, total, page = 1, totalPages = 1 }: UrlListProps) {
  if (urls.length === 0) {
    return (
      <div className="border-border bg-card rounded-xl border p-8 text-center">
        <p className="text-muted-foreground text-sm">No URLs yet. Paste one above.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Your Links</h2>

      <div className="border-border bg-card rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.map((label) => (
                <TableHead key={label} className="text-muted-foreground text-xs tracking-wide uppercase">
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {urls.map((url) => (
              <UrlRow key={url.id} url={url} />
            ))}
          </TableBody>
        </Table>

        {total !== undefined && <Pagination total={total} page={page} totalPages={totalPages} perPage={urls.length} />}
      </div>
    </div>
  );
}
