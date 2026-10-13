"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";

interface Props {
  username: string;
}

export function GitHubCalendarBlock({ username }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-36 w-full animate-pulse rounded-lg border bg-muted/30" />
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-card p-4 shadow-xs">
      <div className="w-full overflow-x-auto flex justify-center py-2">
        <GitHubCalendar
          username={username}
          colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
          fontSize={12}
          blockSize={11}
          blockMargin={4}
          labels={{
            totalCount: "{{count}} contribuições no último ano",
          }}
        />
      </div>
    </div>
  );
}
