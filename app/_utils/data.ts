interface NavItem {
  subtitle: string;
  url: string;
}

export interface NavGroup {
  title?: string;
  subtitle?: string;
  url?: string;
  items: NavItem[];
}

export interface DataProps {
  navMain: NavGroup[];
}

export const data: DataProps = {
  navMain: [
    {
      items: [
        {
          subtitle: "Inicio",
          url: "/",
        },
        {
          subtitle: "Explorar",
          url: "/explorer",
        },
        {
          subtitle: "Bibliotecas",
          url: "#",
        },
      ],
    },
    {
      title: "Suas atividades",
      items: [
        {
          subtitle: "Curtidas",
          url: "#",
        },
        {
          subtitle: "Comentários",
          url: "#",
        },
      ],
    },
    {
      title: "Playlist",
      url: "#",
      items: [
        {
          subtitle: "Components",
          url: "#",
        },
        {
          subtitle: "File Conventions",
          url: "#",
        },
        {
          subtitle: "Functions",
          url: "#",
        },
        {
          subtitle: "next.config.js Options",
          url: "#",
        },
        {
          subtitle: "CLI",
          url: "#",
        },
        {
          subtitle: "Edge Runtime",
          url: "#",
        },
      ],
    },
  ],
};
