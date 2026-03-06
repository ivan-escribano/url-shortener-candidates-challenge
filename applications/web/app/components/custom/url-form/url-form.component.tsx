import { ArrowRight, Link2, Loader2 } from 'lucide-react';
import { Form } from 'react-router';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import type { UrlFormProps } from './url-form.interface';

export function UrlForm({ isSubmitting, error }: UrlFormProps) {
  return (
    <div className="border-border bg-card rounded-xl border p-6">
      <Form method="post" className="flex flex-col gap-4">
        <input type="hidden" name="intent" value="shorten" />

        <label htmlFor="url" className="text-foreground text-sm font-medium">
          Destination URL
        </label>

        <div className="relative">
          <Link2 className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            id="url"
            type="text"
            name="url"
            placeholder="https://example.com/very-long-link"
            required
            disabled={isSubmitting}
            className="bg-card h-11 pl-10"
          />
        </div>

        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Shortening...
            </>
          ) : (
            <>
              Shorten Link
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </Form>

      {error && (
        <p role="alert" className="text-destructive mt-3 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
