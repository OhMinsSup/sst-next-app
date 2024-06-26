import React from 'react';

import { LexicalEditorProps } from '~/components/editor/lexical-editor';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';
import ThreadsForm from '~/components/write/threads-form';

interface ThreadsSheetProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  quotation?: Record<string, string> | undefined;
  editorState?: LexicalEditorProps['editorState'];
}

export default function ThreadsSheet({
  open,
  onClose,
  onSuccess,
  editorState,
  quotation,
}: ThreadsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-full space-y-6 px-4 py-6 lg:py-10"
      >
        <SheetHeader className="text-left">
          <SheetTitle>새로운 스레드</SheetTitle>
        </SheetHeader>
        <ThreadsForm
          isDialog
          onSuccess={onSuccess}
          editorState={editorState}
          quotation={quotation}
        />
      </SheetContent>
    </Sheet>
  );
}
