export const PREVIEW_WAIT_MS = 8_000;

type Callbacks<T> = {
  ready: (preview: T) => void;
  failed: () => void;
  cancelled: () => void;
};

// Imports cannot be aborted. Cancel the consumer instead so late completion
// cannot open an old card, navigate after Escape, or update an unmounted card.
export function createPreviewLoader<T>(
  load: () => Promise<T>,
  clock = { setTimeout, clearTimeout },
) {
  let loading: Promise<T> | undefined;
  let activeCancel: (() => void) | undefined;

  return {
    request(callbacks: Callbacks<T>) {
      activeCancel?.();
      let active = true;
      const finish = (callback: () => void) => {
        if (!active) return;
        active = false;
        clock.clearTimeout(timer);
        if (activeCancel === cancel) activeCancel = undefined;
        callback();
      };
      const cancel = () => finish(callbacks.cancelled);
      const timer = clock.setTimeout(() => finish(callbacks.failed), PREVIEW_WAIT_MS);
      activeCancel = cancel;
      // Share in-flight work and cache successful imports. A rejected import
      // can retry on another visit; expired consumers remain cancelled.
      loading ??= Promise.resolve().then(load).catch(error => {
        loading = undefined;
        throw error;
      });
      loading.then(
        preview => finish(() => callbacks.ready(preview)),
        () => finish(callbacks.failed),
      );
      return cancel;
    },
  };
}
