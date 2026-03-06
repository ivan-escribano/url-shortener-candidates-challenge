import { Check, CheckCircle2, Copy, Pencil, X } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { TableCell, TableRow } from '~/components/ui/table';
import { DeleteDialog } from '../delete-dialog/delete-dialog.component';

import type { UrlRowProps } from './url-row.interface';
import { useUrlRow } from './use-url-row.hook';

const getShortDisplay = (shortCode: string) =>
  typeof window !== 'undefined' ? `${window.location.host}/s/${shortCode}` : `/s/${shortCode}`;

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export function UrlRow({ url }: UrlRowProps) {
  const { copied, isEditing, editValue, setEditValue, handleCopy, handleEditStart, handleEditCancel, handleEditSave } = useUrlRow(url);

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-1.5">
          <a href={`/s/${url.shortCode}`} className="text-primary font-mono text-sm hover:underline">
            {getShortDisplay(url.shortCode)}
          </a>
          <button type="button" onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors" title="Copy link">
            {copied ? <CheckCircle2 className="size-3.5" /> : <Copy className="size-3.5" />}
          </button>
        </div>
      </TableCell>

      <TableCell className="max-w-50">
        {isEditing ? (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditSave();
              if (e.key === 'Escape') handleEditCancel();
            }}
            className="h-8 font-mono text-sm"
            autoFocus
          />
        ) : (
          <span className="text-muted-foreground block truncate font-mono text-sm">{url.originalUrl}</span>
        )}
      </TableCell>

      <TableCell className="text-center tabular-nums">{url.clicks.toLocaleString()}</TableCell>

      <TableCell className="text-muted-foreground text-sm">{formatDate(url.createdAt)}</TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          {isEditing ? (
            <>
              <Button variant="ghost" size="icon-xs" className="text-success hover:text-success" title="Save" onClick={handleEditSave}>
                <Check className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon-xs" className="text-muted-foreground hover:text-foreground" title="Cancel" onClick={handleEditCancel}>
                <X className="size-3.5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon-xs" className="text-muted-foreground hover:text-foreground" title="Edit" onClick={handleEditStart}>
                <Pencil className="size-3.5" />
              </Button>
              <DeleteDialog id={url.id} shortCode={url.shortCode} />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
