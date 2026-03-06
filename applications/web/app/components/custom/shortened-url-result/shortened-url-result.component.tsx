import { CheckCircle2, Copy } from 'lucide-react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';

import type { ShortenedUrlResultProps } from './shortened-url-result.interface';

const getShortUrl = (shortCode: string) => (typeof window !== 'undefined' ? `${window.location.origin}/s/${shortCode}` : `/s/${shortCode}`);

export function ShortenedUrlResult({ shortCode }: ShortenedUrlResultProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const shortUrl = getShortUrl(shortCode);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-border bg-card rounded-xl border p-6">
      <p className="text-primary mb-3 text-xs font-semibold tracking-wide uppercase">Your short link is ready</p>

      <div className="border-border bg-background flex items-center justify-between gap-3 rounded-lg border px-4 py-3">
        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-success truncate font-mono text-sm hover:underline">
          {shortUrl}
        </a>

        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-muted-foreground hover:text-foreground shrink-0">
          {copied ? (
            <>
              <CheckCircle2 className="size-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
