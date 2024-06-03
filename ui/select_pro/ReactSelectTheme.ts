const ReactSelectTheme = (theme: string | "dark" | "light" | undefined) => ({
  control: (base: any) => ({
    ...base,
    height: "36px",
    minHeight: "36px",
    minWidth: "136px",
    backgroundColor: "transparent",
    borderColor: "transparent transparent #525252 transparent",
    borderRadius: "0px",
    boxShadow: null,
    flexWrap: "nowrap",
    color: "white",
    ":hover": {
      borderColor: "transparent transparent #525252 transparent",
      cursor: "pointer",
    },
    ":active": {
      ...base[":active"],
      color: "white",
    },
  }),
  valueContainer: (base: any) => ({
    ...base,
    height: "36px",
    minHeight: "36px",
    padding: "0 6px",
    flexWrap: "nowrap",
  }),
  indicatorsContainer: (base: any) => ({
    ...base,
    height: "36px",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: theme === "light" ? "#1E1E1E" : "#FFFFFF",
  }),
  option: (base: any, { isFocused }: { isFocused: boolean }) => {
    return {
      ...base,
      backgroundColor: isFocused && "#2B3A67",
      color: isFocused && "#FFFFFF",
      borderRadius: 10,
      padding: "5px 10px",
      cursor: "pointer",
      ":active": {
        ...base[":active"],
        backgroundColor: "#2B3A67",
        color: theme === "dark" ? "#FFFFFF" : "#1E1E1E",
      },
    };
  },
  menu: (base: any) => ({
    ...base,
    zIndex: 9999,

    backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
    borderRadius: 10,
    marginTop: 10,
  }),
  menuList: (base: any) => ({
    ...base,
    padding: 10,
  }),

  multiValue: (base: any) => {
    return {
      ...base,
      backgroundColor: "#2B3A67",
    };
  },
  multiValueLabel: (base: any) => ({
    color: "white",
  }),
  multiValueRemove: (base: any) => ({
    color: "white",
    ":hover": {
      backgroundColor: "red",
      color: "white",
    },
  }),
});

export default ReactSelectTheme;
