import { useEffect } from "react";

const BASE_TITLE = "دلّني | نضع عملك على خريطة النجاح";

export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — دلّني` : BASE_TITLE;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description]);
}
