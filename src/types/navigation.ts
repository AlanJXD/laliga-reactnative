// Root Stack (Principal)
export type RootStackParamList = {
  Bienvenida: undefined;
  RegistroIdentidad: undefined;
  RegistroContacto: {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    estado: string;
    ciudad: string;
  };
  RegistroPassword: {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    estado: string;
    ciudad: string;
    telefono: string;
    email: string;
  };
  VerificacionCorreo: {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    estado: string;
    ciudad: string;
    telefono: string;
    email: string;
    password: string;
  };
  InicioSesion: undefined;
  MainApp: undefined;
};

// Tabs
export type RootTabParamList = {
    Inicio: undefined;
    Equipos: undefined;
    Torneos: undefined;
    Perfil: undefined;
  };
  