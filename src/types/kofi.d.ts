interface Window {
  kofiWidgetOverlay: {
    draw: (username: string, config: Record<string, any>) => void;
  };
}
