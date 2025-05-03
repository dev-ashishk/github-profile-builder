/**
 * Tracks a custom event in Google Analytics
 *
 * @param action The action that occurred (e.g., 'copy_markdown')
 * @param category The event category (e.g., 'user_action')
 * @param label Optional label for the event
 * @param value Optional value for the event
 */
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
