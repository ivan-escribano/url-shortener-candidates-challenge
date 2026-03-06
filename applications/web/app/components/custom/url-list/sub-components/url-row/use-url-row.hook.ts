import { useState } from 'react';
import { useFetcher } from 'react-router';

import type { UrlSummary } from '@url-shortener/core';

const getShortUrl = (shortCode: string) =>
  typeof window !== 'undefined' ? `${window.location.origin}/s/${shortCode}` : `/s/${shortCode}`;

export function useUrlRow(url: UrlSummary) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const updateFetcher = useFetcher();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getShortUrl(url.shortCode));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditValue(url.originalUrl);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditValue('');
  };

  const handleEditSave = () => {
    updateFetcher.submit(
      { intent: 'update', id: url.id, originalUrl: editValue },
      { method: 'post' },
    );
    setIsEditing(false);
    setEditValue('');
  };

  return { copied, isEditing, editValue, setEditValue, handleCopy, handleEditStart, handleEditCancel, handleEditSave };
}
