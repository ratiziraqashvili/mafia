"use client";

import { AlertTriangle } from "lucide-react";

const Error = ({ error }: { error: Error }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-background/80 backdrop-blur-md p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <AlertTriangle size={20} />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Something went wrong
          </h2>
        </div>

        <p className="text-sm text-muted-foreground mb-2">
          An unexpected error occurred. Please try again.
        </p>

        {error.message && (
          <pre className="mt-3 max-h-40 overflow-auto rounded-lg bg-red-500/5 p-3 text-xs text-red-400">
            {error.message}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Error;
