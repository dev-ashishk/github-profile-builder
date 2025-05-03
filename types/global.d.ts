// Add Google Analytics types to the global Window interface
interface Window {
  gtag?: (command: "config" | "event" | "js" | "set", targetId: string, config?: Record<string, any> | Date) => void
  dataLayer?: Record<string, any>[]
}
