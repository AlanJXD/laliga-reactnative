// Tabs
export type RootTabParamList = {
    Partidos: undefined;
    Ligas: undefined;
    Perfil: undefined;
  };
  
  // Stacks
  export type PartidosStackParamList = {
    PartidosMain: undefined;
    DetallePartido: { id: string };
  };
  
  export type LigasStackParamList = {
    LigasMain: undefined;
    DetalleLiga: { id: string };
  };
  