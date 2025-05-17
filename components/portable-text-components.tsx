import { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-lg">{children}</p>,
    cta: ({ children }) => <p className="mb-4 text-xl text-white">{children}</p>,
  },
};
