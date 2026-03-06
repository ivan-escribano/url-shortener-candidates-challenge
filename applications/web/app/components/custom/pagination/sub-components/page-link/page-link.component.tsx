import { Button } from '~/components/ui/button';
import type { PageLinkProps } from './page-link.interface';

export function PageLink({ href, disabled, children }: PageLinkProps) {
  return (
    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" disabled={disabled} asChild={!disabled}>
      {disabled ? <span>{children}</span> : <a href={href}>{children}</a>}
    </Button>
  );
}
