import { useEffect, useRef, useState } from 'react';

export default function useVisibility(rootMargin = '200px') {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { root: null, rootMargin }
    );

    io.observe(el);

    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, visible } as const;
}