export const useBackgroundClass = (colorKey?: string): string => {
    const key = colorKey?.toLowerCase();
  
    switch (key) {
      case "dark-navy":
        return "bg-dark-navy";
      case "darker navy":
        return "bg-darker-navy";
      case "steel":
        return "bg-steel";
      case "violet":
        return "bg-violet";
      default:
        return "bg-dark-navy";
    }
  };
  